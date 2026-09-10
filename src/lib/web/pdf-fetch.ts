import { chromium, type Browser, type BrowserContext } from "playwright";
import { PDFParse } from "pdf-parse";

export type LivePdfResult = {
  ok: boolean;
  url: string;
  finalUrl: string;
  title: string;
  text: string;
  chars: number;
  status: number;
  pdfPageCount: number;
  pdfBase64: string;
  html: string;
  error?: string;
};

/**
 * Launch headless browser with container-safe options.
 */
async function launchHeadlessBrowser(): Promise<Browser> {
  return await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-zygote",
    ],
  });
}

/**
 * Creates an isolated browser context with real desktop browser headers.
 */
async function createDesktopContext(browser: Browser): Promise<BrowserContext> {
  return await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  });
}

/**
 * Fetches a single live webpage by rendering it in headless Chrome,
 * generating a high-fidelity PDF snapshot, and extracting text from that PDF.
 */
export async function fetchLivePageAsPdf(
  rawUrl: string,
  opts: {
    timeoutMs?: number;
    existingBrowser?: Browser;
    existingContext?: BrowserContext;
  } = {},
): Promise<LivePdfResult> {
  const timeoutMs = opts.timeoutMs ?? 25000;
  let ownsBrowser = false;
  let browser = opts.existingBrowser;
  let context = opts.existingContext;

  try {
    if (!browser) {
      browser = await launchHeadlessBrowser();
      ownsBrowser = true;
    }
    if (!context) {
      context = await createDesktopContext(browser);
    }

    const page = await context.newPage();
    let responseStatus = 200;

    try {
      const resp = await page.goto(rawUrl, {
        waitUntil: "domcontentloaded",
        timeout: timeoutMs,
      });
      if (resp) {
        responseStatus = resp.status();
      }
    } catch {
      // If network wait timed out, proceed with whatever DOM has loaded
    }

    // Allow dynamic client hydration & Shopify scripts to settle
    await page.waitForTimeout(1000);

    const title = (await page.title()) || "Store Policy";
    const finalUrl = page.url() || rawUrl;

    // Extract the policy content block or body HTML
    const pageData = await page.evaluate(() => {
      const selectors = [
        ".shopify-policy__container",
        ".shopify-policy__body",
        "[class*=\"shopify-policy\"]",
        "[class*=\"policy-content\"]",
        "[class*=\"policy-body\"]",
        "#MainContent",
        "main",
        "article",
        ".page-content",
        "#content",
      ];
      let el: Element | null = null;
      for (const sel of selectors) {
        el = document.querySelector(sel);
        if (el && (el as HTMLElement).innerText && (el as HTMLElement).innerText.trim().length > 100) {
          break;
        }
      }
      return {
        html: el ? el.innerHTML : document.body.innerHTML,
      };
    });

    await page.close();

    // Render the extracted policy document to an isolated printable PDF
    const printPage = await context.newPage();
    await printPage.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>
          <style>
            @page {
              size: A4;
              margin: 20mm 15mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              font-size: 13px;
              line-height: 1.6;
              color: #111111;
              background: #ffffff;
              padding: 0;
              margin: 0;
            }
            h1, h2, h3, h4 {
              color: #000000;
              margin-top: 1.4em;
              margin-bottom: 0.6em;
              font-weight: 600;
            }
            h1 { font-size: 22px; }
            h2 { font-size: 18px; }
            h3 { font-size: 15px; }
            p, ul, ol, dl, table {
              margin-bottom: 1em;
            }
            li { margin-bottom: 0.4em; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.5em 0;
            }
            th, td {
              border: 1px solid #e5e7eb;
              padding: 8px 12px;
              text-align: left;
            }
            header, nav, footer, aside, .header, .footer, .menu,
            #shopify-section-header, #shopify-section-footer,
            .announcement-bar, .newsletter, .cookie-banner {
              display: none !important;
            }
          </style>
        </head>
        <body>
          ${pageData.html}
        </body>
      </html>
    `);

    const pdfBuffer = await printPage.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await printPage.close();

    // Parse the PDF buffer using PDF engine
    const parser = new PDFParse(new Uint8Array(pdfBuffer));
    const pdfTextResult = await parser.getText();
    const extractedText = (pdfTextResult.text || "")
      .replace(/\r\n/g, "\n")
      .replace(/-- \d+ of \d+ --/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return {
      ok: true,
      url: rawUrl,
      finalUrl,
      title: title.trim(),
      text: extractedText,
      chars: extractedText.length,
      status: responseStatus,
      pdfPageCount: pdfTextResult.total || 1,
      pdfBase64: Buffer.from(pdfBuffer).toString("base64"),
      html: pageData.html,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      url: rawUrl,
      finalUrl: rawUrl,
      title: "",
      text: "",
      chars: 0,
      status: 500,
      pdfPageCount: 0,
      pdfBase64: "",
      html: "",
      error: message,
    };
  } finally {
    if (ownsBrowser && browser) {
      await browser.close().catch(() => {});
    }
  }
}

/**
 * Fetches multiple live policy URLs as PDFs using a shared browser session.
 */
export async function fetchLivePagesAsPdf(
  urls: string[],
  opts: { timeoutMs?: number; concurrency?: number } = {},
): Promise<Map<string, LivePdfResult>> {
  const results = new Map<string, LivePdfResult>();
  if (!urls.length) return results;

  let browser: Browser | null = null;
  try {
    browser = await launchHeadlessBrowser();
    const context = await createDesktopContext(browser);

    for (const url of urls) {
      const res = await fetchLivePageAsPdf(url, {
        timeoutMs: opts.timeoutMs ?? 20000,
        existingBrowser: browser,
        existingContext: context,
      });
      results.set(url, res);
    }
  } catch {
    // If launching fails, let individual fallbacks handle it
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }

  return results;
}
