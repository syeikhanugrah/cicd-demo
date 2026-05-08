# CI/CD Demo App
> Node.js + Express · GitHub Actions · Vercel

A demo project for CI & CD

---

## 🗂️ Project Structure

```
cicd-demo/
├── .github/
│   └── workflows/
│       └── ci-cd.yml     ← GitHub Actions workflow
├── app.js                ← Express app (logic)
├── app.test.js           ← Jest tests
├── server.js             ← Entry point
├── vercel.json           ← Vercel config
└── package.json
```

---

## 🚀 Setup & Usage

### 1. Clone & Install
```bash
git clone https://github.com/[username]/cicd-demo.git
cd cicd-demo
npm install
```

### 2. Run Locally
```bash
npm start
# → http://localhost:3000
```

### 3. Run Tests
```bash
npm test
```

---

## ⚙️ Setup GitHub Actions + Vercel

### Step 1 — Get Vercel Credentials
```bash
# Install Vercel CLI
npm i -g vercel

# Login & link project
vercel login
vercel link
```
After `vercel link`, check `.vercel/project.json` to get:
- `projectId`
- `orgId`

For the token: go to **vercel.com → Settings → Tokens → Create Token**

### Step 2 — Add GitHub Secrets
Open your GitHub repo → **Settings → Secrets and variables → Actions → New secret**

| Secret Name         | Value                                   |
|---------------------|-----------------------------------------|
| `VERCEL_TOKEN`      | Token from Vercel dashboard             |
| `VERCEL_ORG_ID`     | `orgId` from `.vercel/project.json`     |
| `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` |

### Step 3 — Push & Watch the Pipeline
```bash
git add .
git commit -m "feat: add CI/CD pipeline"
git push origin main
```
Open the **Actions** tab on GitHub — the pipeline will run automatically! 🎉

---

## 🔌 API Endpoints

| Method | Endpoint     | Description  |
|--------|--------------|--------------|
| GET    | `/`          | Health check |
| GET    | `/about`     | App info     |
| POST   | `/calculate` | Calculator   |

### Example Request
```json
POST /calculate
{
  "a": 10,
  "b": 3,
  "operator": "+"
}

→ { "result": 13 }
```

---

## 🔄 CI/CD Flow

```
Push to main
     ↓
[CI] Run Tests (Jest)
     ↓ (if PASS)
[CD] Deploy to Vercel
     ↓
Live URL: https://cicd-demo-[username].vercel.app
```
