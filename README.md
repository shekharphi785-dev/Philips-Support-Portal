# Philips Support Portal

Internal support portal for Philips agents — built as a static site hosted on GitHub Pages, backed by Google Apps Script for cloud sync.

---

## 🗂️ Project Structure

```
philips-portal/
├── index.html         # Main portal (all UI, logic, styles in one file)
├── README.md          # This file
└── gas/
    ├── Code.gs        # Google Apps Script — config sync (PIN + Employee IDs)
    └── DEPLOY.md      # Step-by-step GAS deployment guide
```

---

## 🚀 Hosting on GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your portal will be live at `https://<your-username>.github.io/<repo-name>/`

---

## ⚙️ Google Apps Script Setup

The portal syncs Admin PIN and authorized Employee IDs via 4 separate Google Apps Script deployments connected to Google Sheets.

See [`gas/DEPLOY.md`](gas/DEPLOY.md) for full setup instructions.

---

## 🔐 Access Control

- Employees must log in with their **Name** and **Employee ID**
- Access to **Email Productivity** and **Case Submission** panels is restricted to authorized Employee IDs managed by the Admin
- Admin panel is protected by a PIN (default: `200526`)
- All changes sync to Google Sheets in real time

---

## 📋 Forms Available

| Panel | Description |
|---|---|
| Escalation | Submit escalation cases to Google Sheet |
| Email Productivity | Log email productivity entries |
| Case Submission | Submit and track support cases |
| Websites | Quick links to internal tools |
| Admin | Manage authorized Employee IDs and PIN |
