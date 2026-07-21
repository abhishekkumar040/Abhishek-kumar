
# 🛡️ PhishGuard - Real-Time Phishing Website Detection System

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Accuracy-96%25-success?style=for-the-badge" alt="Accuracy"/>
  <img src="https://img.shields.io/badge/Machine%20Learning-Ensemble%20Models-blueviolet?style=for-the-badge" alt="ML Models"/>
</p>

<p align="center">
  <strong>Intelligent, real-time phishing detection powered by Machine Learning with Explainable AI (XAI) transparency.</strong>
</p>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🧠 Methodology](#-methodology)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📸 Screenshots](#-screenshots)
- [📊 Model Performance](#-model-performance)
- [🔬 Feature Extraction](#-feature-extraction)
- [🎯 How It Works](#-how-it-works)
- [👥 Authors](#-authors)
- [📄 License](#-license)

---

## 🌟 Overview

**PhishGuard** is an intelligent, **Real-Time Phishing Website Detection System** developed using machine learning techniques. The system addresses the challenge of zero-day phishing attacks by employing a multi-layer feature extraction process that analyzes URL-based, domain-based, and content-based attributes.

### Problem Statement
Traditional detection methods like blacklists fail to detect newly created or "zero-day" phishing URLs, which account for a large percentage of security breaches.

### Solution
An adaptive ML-powered system using ensemble models (**Random Forest & XGBoost**) achieving **96% accuracy**, with **Explainable AI (SHAP/LIME)** for transparent predictions.

---

## ✨ Features

### 🔍 Smart URL Scanner
- **Split-screen interface** for seamless input and results viewing
- **Real-time analysis** with animated loading states (1-2 second prediction time)
- **6 pre-loaded sample URLs** for instant testing
- Input validation and URL format normalization

### 🤖 Multi-Layer ML Analysis
| Layer | Features Analyzed |
|-------|-------------------|
| **URL-Based** | Length, IP address usage, @ symbol obfuscation, SSL/HTTPS, subdomain depth, hyphens, shorteners, encoded characters, path depth |
| **Domain-Based** | Domain reputation, TLD analysis, domain length, numeric domain check, DNS records, registration age |
| **Content-Based** | Login keywords, phishing words, external redirects, credential harvesting indicators |

### 🧠 Explainable AI (XAI) Panel
- **SHAP values visualization** showing feature impact on prediction
- **Top suspicious features** ranked by severity (Critical → Low)
- **Color-coded severity** indicators for quick assessment
- Detailed explanations for each flagged feature

### 📈 Interactive Dashboard
- Live scan statistics and threat metrics
- **Model comparison**: XGBoost vs Random Forest vs Decision Tree vs SVM
- Feature importance bar chart
- Methodology overview of all extraction layers

### 📜 Scan History
- Complete history table with all scans
- Filter by status (Phishing/Safe/Legitimate)
- Summary statistics and threat rate calculations

---

## 🧠 Methodology

```
┌─────────────────────────────────────────────────────────────┐
│                    INPUT: User Enter URL                     │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Stage 1: Data Collection & Preprocessing        │
│  • URL Cleaning • HTTP Simulation • WHOIS Query              │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Stage 2: Multi-Layer Feature Extraction          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │  URL-Based   │ │ Domain-Based │ │Content-Based │         │
│  │   Features   │ │   Features   │ │  Features    │         │
│  │   (10)       │ │    (6)       │ │    (4)       │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│           Total: 20+ Numerical Features                      │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│            Stage 3: Ensemble ML Classification               │
│  ┌────────────────┐  ┌────────────────┐                     │
│  │   XGBoost      │  │ Random Forest  │                    │
│  │  (Primary)     │  │  (Secondary)   │                     │
│  │  Accuracy: 96% │  │ Accuracy: 87%  │                     │
│  └────────────────┘  └────────────────┘                     │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Stage 4: XAI Explainability Integration          │
│  • SHAP Values • LIME Explanation • Feature Attribution      │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  OUTPUT: Prediction Result                   │
│  Verdict + Confidence Score + Suspicious Features List       │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

| Technology | Usage |
|------------|-------|
| ![React](https://img.shields.io/badge/React-19-blue?logo=react) | Frontend UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) | Type-Safe Development |
| ![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite) | Build Tool & Dev Server |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-cyan?logo=tailwindcss) | Utility-first Styling |

### ML Concepts Implemented
- **Algorithms**: Random Forest, XGBoost (Gradient Boosting), Decision Tree, SVM
- **Techniques**: Ensemble Learning, Hyperparameter Tuning (Grid Search)
- **Explainability**: SHAP (SHapley Additive exPlanations), LIME

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/phishguard.git

# Navigate to the project directory
cd phishguard

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist/` folder, ready for deployment.

---

## 📸 Screenshots

### Main Scanner Interface (Split Screen)
```
┌──────────────────────────────────────────────────────────────┐
│  🔍 URL Scanner                    🛡️ Analysis Results        │
│  ┌────────────────────────┐        ┌──────────────────────┐  │
│  │ 🔗 https://...          │        │  ⚠️ PHISHING DETECTED! │  │
│  │                        │        │  Confidence: 94%      │  │
│  │  ┌──────────────────┐  │        │  ████████████████░░  │  │
│  │  │  🔍 Scan URL      │  │        │                      │  │
│  │  └──────────────────┘  │        │  📊 Metrics Grid      │  │
│  │                        │        │  Precision: 95%       │  │
│  │  📋 Sample URLs:       │        │  Recall: 94%          │  │
│  │  • Google (Safe)       │        │  F1-Score: 94%        │  │
│  │  • IP Address (🚨)     │        │                      │  │
│  │  • Shortener (⚠️)      │        │  💡 XAI SHAP Values:   │  │
│  │                        │        │  - IP Address: +25%   │  │
│  └────────────────────────┘        │  - @ Symbol: +22%    │  │
│                                    │  - DNS Invalid: +20%  │  │
│                                    │                      │  │
│                                    │  ⚠️ Suspicious Feats:  │  │
│                                    │  - No HTTPS (Critical)│  │
│                                    │  - New Domain (<7d)   │  │
│                                    └──────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Model Performance

| Metric | Our System | Random Forest | Decision Tree |
|--------|-----------|---------------|---------------|
| **Accuracy** | **96%** | 87% | 82.4% |
| **Precision** | **95%** | 85% | 80% |
| **Recall** | **94%** | 84% | 79% |
| **F1-Score** | **94%** | 84% | 80% |
| **ROC-AUC** | **94%** | 86% | 81% |
| **Prediction Time** | **1-2 sec** | <1 sec | <1 sec |

### Key Advantages Over Existing Systems

| Gap in Literature | PhishGuard Solution |
|-------------------|---------------------|
| ❌ Fails on Zero-Day attacks | ✅ Live feature extraction + real-time prediction |
| ❌ Single-feature reliance | ✅ URL + Domain + Content multi-layer approach |
| ❌ No explainability (Black box) | ✅ Full SHAP/LIME XAI integration |
| ❌ High computational cost (Deep Learning) | ✅ Efficient ensemble models for real-time use |

---

## 🔬 Feature Extraction Details

### URL-Based Features (10 features)

| Feature | Description | Risk if Suspicious |
|---------|-------------|-------------------|
| URL Length | Total character count | >75 chars = suspicious |
| IP Address Usage | IP instead of domain name | Critical indicator |
| @ Symbol Presence | Obfuscation technique | Everything before @ is ignored |
| Double Slash | Redirect attempt possible | Path manipulation |
| SSL/HTTPS Certificate | Encryption presence | Missing = insecure |
| Subdomain Depth | Number of sub-levels | >3 levels = suspicious |
| Hyphen Count | Deceptive naming | >2 hyphens = risky |
| URL Shortener | Hides destination | Cannot verify legitimacy |
| Encoded Characters | %XX encoding | Obfuscation attempt |
| Path Depth | Directory nesting | >5 = confusing structure |

### Domain-Based Features (6 features)

| Feature | Description |
|---------|-------------|
| Domain Reputation | Known legitimate vs unknown domains |
| Top-Level Domain | TLD commonly abused (.tk, .xyz, .top, etc.) |
| Domain Name Length | Typosquatting detection (>30 chars) |
| Numeric Domain | Numbers-only = highly suspicious |
| DNS Record Validity | Proper configuration check |
| Domain Registration Age | New domains (<30 days) = very suspicious |

### Content-Based Features (4 features)

| Feature | Description |
|---------|-------------|
| Login/Form Keywords | Authentication-related terms |
| Phishing Keywords | Trigger words (urgent, verify, etc.) |
| External Redirects | Hidden final destination |
| Credential Request | Password/credential harvesting indicators |

---

## 🎯 How It Works - Step by Step

1. **User Input**: Paste or type a URL into the scanner
2. **Validation**: Check URL format, normalize encoding
3. **Feature Extraction**: Extract 20+ features across 3 categories:
   ```
   Input: http://192.168.1.1/login/secure/account/update
   
   Features Detected:
   ✅ URL Contains IP Address → CRITICAL (+25% phishing probability)
   ✅ No SSL/HTTPS → HIGH RISK (+15%)
   ✅ Login Keywords Present → MEDIUM (+2%)
   ✅ New Domain (simulated) → HIGH RISK (+10%)
   ...
   ```
4. **ML Classification**: Feed features into XGBoost/Random Forest
5. **XAI Explanation**: Generate SHAP values for transparency
6. **Result Display**: Show verdict with confidence score and explanations

---

## 🔍 Sample URLs to Test

| URL | Expected Result | Why? |
|-----|-----------------|------|
| `https://www.google.com/search?q=test` | ✅ Safe | Trusted domain, proper structure |
| `https://github.com/facebook/react` | ✅ Safe | Legitimate platform |
| `https://amazon.com/dp/B08N5WRWNW` | ✅ Safe | Well-known e-commerce site |
| `http://192.168.1.1/login/secure` | 🚨 Phishing | IP address instead of domain |
| `bit.ly/3xK9mPq` | ⚠️ Suspicious | URL shortener hides destination |
| `secure-banking-login.xyz/verify` | ⚠️ Suspicious | Abused TLD + banking terms |

---

## 👥 Authors

This project is based on research conducted at:

<div align="center">

**Acharya Institute of Technology, Bengaluru**
*Department of Computer Science & Engineering*

| Role | Name |
|------|------|
| Assistant Professor | **Soniya R** |
| Assistant Professor | **Srikant SP** |
| Researcher | **Abhishek K** |
| Researcher | **Abhishek K** |
| Researcher | **Gagan M** |

</div>

### Research Paper Reference
> **"Real-Time Phishing Website Detection Using Machine Learning"**
> 
> Abstract: *Presents an intelligent system using ML techniques, addressing zero-day phishing attacks through multi-layer feature extraction and ensemble models (Random Forest & XGBoost) with 96% accuracy, integrated with Explainable AI (SHAP/LIME).*

---

## 🚀 Future Scope

- [ ] Browser extension integration for automatic background scanning
- [ ] Advanced deep learning models (Transformers, CNNs) for content analysis
- [ ] Continuous learning pipeline for auto-retraining on new threats
- [ ] Multi-vector phishing detection (emails, file attachments)
- [ ] REST API for third-party integration
- [ ] Global threat intelligence database connectivity

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues or pull requests:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 🙏 Acknowledgments

- IEEE & Elsevier research publications referenced in literature review
- Scikit-learn documentation for ML implementation guidance
- Acharya Institute of Technology for research support

---

<p align="center">
  <strong>Built with ❤️ for Cybersecurity | Stay Safe Online!</strong><br>
  <em>"Be vigilant against evolving cyber threats"</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-React_&_Tailwind-red?style=flat-square" alt="Tech"/>
  <img src="https://img.shields.io/badge/Powered_by-ML_%26_XAI-green?style=flat-square" alt="Powered"/>
</p>
