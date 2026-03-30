# Google Apps Script — Deployment Guide

The portal uses **5 Google Apps Script deployments** — one for each Google Sheet endpoint.

---

## 📊 Sheets Overview

| Variable in HTML | Purpose | Sheet Columns |
|---|---|---|
| `CONFIG_SHEET` | Admin PIN + Authorized Employee IDs | B1 = PIN, B2 = Employee IDs (comma separated) |
| `ESC_SHEET` | Escalation form submissions | Auto-appended rows |
| `PROD_SHEET` | Email Productivity submissions | Auto-appended rows |
| `CASE_SHEET` | Case submissions | Auto-appended rows |

---

## 🛠️ Setting Up CONFIG_SHEET (most important)

This is the only sheet that needs the JSONP-enabled code from `Code.gs`.

### Step 1 — Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new sheet
2. In cell **B1** enter your admin PIN (default: `200526`)
3. In cell **B2** enter authorized Employee IDs comma-separated (e.g. `RM7028777,RM7029195`)

### Step 2 — Open Apps Script
1. In the sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Paste the entire contents of `Code.gs`
4. Press **Ctrl+S** to save

### Step 3 — Test locally first
1. Select `testGet` from the function dropdown
2. Click **Run**
3. Go to **View → Logs**
4. You should see: `test({"pin":"200526","emps":"RM7028777,RM7029195"})`
5. ✅ If you see this, the code is correct

### Step 4 — Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the **gear icon ⚙️** → Select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Copy the `/exec` URL (not `/dev`)

### Step 5 — Verify deployment
Paste this in your browser (replace URL with yours):
```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?callback=test
```
You should see:
```
test({"pin":"200526","emps":"RM7028777,RM7029195"})
```

### Step 6 — Update index.html
In `index.html`, find `CONFIG_SHEET` and update the URL:
```js
var CONFIG_SHEET = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

---

## ⚠️ Important — Redeployment Rules

- **Never edit an existing deployment** — it caches the old version
- Always use **Deploy → New deployment** after code changes
- After a new deployment you'll get a new URL — update `index.html` accordingly

---

## 🔁 Updating CONFIG_SHEET code in the future

1. Edit the code in Apps Script editor
2. Press **Ctrl+S**
3. Run `testGet` to verify locally
4. **Deploy → New deployment** (not Manage deployments)
5. Copy new `/exec` URL → update `CONFIG_SHEET` in `index.html`
6. Push updated `index.html` to GitHub
