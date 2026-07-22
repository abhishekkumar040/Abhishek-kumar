
# Real-Time Phishing Website Detection

A real-time phishing website detector powered by ensemble machine learning (Random Forest / XGBoost) with explainable AI. Paste any URL for an instant, transparent verdict backed by SHAP/LIME-style feature explanations.

## Live Demo

* **GitHub Pages**: [https://abhishekkumar040.github.io/Abhishek-kumar/](https://abhishekkumar040.github.io/Abhishek-kumar/)


---

## Tech Stack & Dependencies

* **Framework & Build Tool**: React, Vite


* **Styling**: Tailwind CSS


* **Plugins**: `vite-plugin-singlefile` for self-contained single-file HTML builds


* **Language**: TypeScript



---

## Local Development

To run this repository locally:

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev

# Build for production (emits a single self-contained dist/index.html)
npm run build

```

You can open `dist/index.html` directly in a browser to test the production build locally.

---

## Deployment & Hosting

### Option 1: GitHub Pages (Configured Pipeline)

This repository includes a pre-configured GitHub Actions pipeline located at `.github/workflows/pages.yml` that automatically builds and deploys the app to GitHub Pages on every push to `main`.

**One-Time Manual Step:**

1. Open your repository on GitHub.


2. Navigate to **Settings** → **Pages** (in the left sidebar).


3. Under **Build and deployment → Source**, change the dropdown from *Deploy from a branch* to **GitHub Actions**.


4. Click **Save**.



### Option 2: Vercel Troubleshooting

If deploying to Vercel, ensure that:

* Your project root layout matches the standard Vite setup (no accidental `node_modules/` or nested wrapper folders committed via drag-and-drop).


* The Node.js Version in Vercel settings (**Settings → General → Node.js Version**) is set to **22.x** to satisfy Vite's requirements.
