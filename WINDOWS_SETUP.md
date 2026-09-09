# Running NyayaDraft Locally on Windows 11

This guide walks you through setting up and running **NyayaDraft** locally on any Windows 11 laptop or desktop.

---

## ⚡ Quick Start (1-Click Automated Setup)

We have included automated launchers for Windows 11:

### Option A: Double-Click Batch File (Easiest)
1. In Windows File Explorer, navigate to the project folder.
2. Double-click **`start-windows.bat`**.
3. It will automatically:
   - Check that Node.js is installed
   - Create your local `.env` configuration file
   - Run `npm install` (first time only)
   - Launch the local server on **`http://localhost:3000`** and open your default browser!

### Option B: PowerShell 7 / Windows Terminal
Open Windows Terminal or PowerShell in the project directory and run:
```powershell
.\start-windows.ps1
```

---

## 🛠️ Step-by-Step Manual Setup

If you prefer using the command line manually:

### 1. Prerequisites
- **Windows 11** (64-bit)
- **Node.js LTS (v20.x or v22.x)**:
  - Download and run the installer from [https://nodejs.org/](https://nodejs.org/).
  - Ensure the checkbox **"Automatically install the necessary tools"** or **"Add to PATH"** is selected during installation.
  - Verify installation in Command Prompt / PowerShell:
    ```powershell
    node -v
    npm -v
    ```
- **Git for Windows** (optional, if cloning via Git): [https://git-scm.com/](https://git-scm.com/)

---

### 2. Install Project Dependencies
Open Command Prompt, PowerShell, or Windows Terminal in the project root:

```bash
npm install
```

*(Note: NyayaDraft uses `@electric-sql/pglite`, an embedded Postgres engine compiled to WebAssembly. You do **not** need to install PostgreSQL or Docker on Windows—it runs directly in Node.js!)*

---

### 3. Configure Environment Variables
Copy the template configuration to create your local `.env` file:

**In PowerShell:**
```powershell
Copy-Item .env.example .env
```

**In Command Prompt (cmd):**
```cmd
copy .env.example .env
```

Open `.env` in Notepad:
```cmd
notepad .env
```

Add your **Google Gemini API Key** (for AI drafting, legal critique, and statutory citation retrieval):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey).)*

---

### 4. Start the Local Development Server
Run:
```bash
npm run dev
```

Or, if you want a direct Windows local command:
```bash
npm run dev:win
```

You will see:
```text
  VITE v6.x.x  ready in ... ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 📦 Building for Production on Windows

To generate an optimized production bundle:

```bash
npm run build
```
*(Or `npm run build:win`)*

To preview the production build locally:
```bash
npm run preview
```

---

## 🔍 Troubleshooting on Windows 11

### 1. PowerShell Script Execution Policy Error
If running `.\start-windows.ps1` gives an error like `cannot be loaded because running scripts is disabled on this system`:
Run this in PowerShell for the current session:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\start-windows.ps1
```
Or simply use `start-windows.bat`.

### 2. Port 3000 Already in Use
If another application on your Windows laptop is using port 3000:
- You can start on a different port:
  ```bash
  npx vite dev --port 3001
  ```
- To see what is using port 3000 in PowerShell:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
  ```

### 3. Windows Defender Firewall Prompt
When starting the dev server for the first time, Windows Defender Firewall may display an alert:
- Check **"Private networks, such as my home or work network"**
- Click **"Allow access"**

### 4. Node.js `spawn ENOENT` on Windows
The wrapper script (`scripts/with-app-env.mjs`) has been configured with `shell: true` for Windows to resolve `.cmd` binaries (like `vite.cmd` and `tsc.cmd`) from `node_modules/.bin` automatically.

---

## 🚀 Features Ready to Use Locally
- **AI Drafting Engine**: Grounded statutory contract drafting, notices under Section 138 NI Act, DPDP Act store policies, and consumer protection terms.
- **Indian Statutory RAG**: Embedded Devanagari & Latin tokenized search across the Bharatiya Nyaya Sanhita (BNS 2023), DPDP Act 2023, Consumer Protection Act, and Indian Contract Act.
- **Embedded Database**: Local zero-config PGLite database storing audit records, store legal profiles, and draft histories.
