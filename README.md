# 🌿 Hedamo Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://hedamo-dashboard-rho.vercel.app/)

> **Live Demo:** 🔗 [https://hedamo-dashboard-rho.vercel.app/](https://hedamo-dashboard-rho.vercel.app/)
> **Github:** 🔗 [https://github.com/rojanagunoori/hedamo-dashboard.git](https://github.com/rojanagunoori/hedamo-dashboard.git)

---

## 🖼️ Screenshots

### 🏠 Dashboard Overview
![Dashboard Overview](/public/screenshots/photo-1.png)

![Dashboard Overview](/public/screenshots/photo-2.png)

![Dashboard Overview](/public/screenshots/photo-3.png)

### 👤 User Profile
![User Profile](/public/screenshots/photo-4.png)


## 📘 Project Overview

**Hedamo Dashboard** is a responsive **Product Transparency Management System** built for the **Altibbe Health Frontend Developer Assignment**.  
It visualizes AI-powered transparency scores and provides producers with tools to manage, review, and enhance their product portfolios.

This project focuses on **UI/UX excellence**, **data visualization**, and **modular Next.js architecture**.

---

## ✨ Features

- 🧭 **Responsive Dashboard Layout** — Sidebar navigation, top header, and adaptive grid system  
- 📊 **Product Management Interface** — Interactive product table with filtering, sorting, and color-coded transparency scores  
- 🧠 **AI Insights Panel** — Displays AI explanations, improvement suggestions, and risk flags  
- 🧾 **Add Product Wizard** — Multi-step form: *Basic Info → Ingredients → Certifications → Review*  
- 🌗 **Dark Mode** — Toggle between light/dark themes  
- 📅 **Calendar & Analytics Views** — Extendable mock pages for future insights  
- 👤 **User Profile Page** — Editable personal and address information  
- ⚙️ **Mock Data Integration** — Simulated backend for transparency scores and AI suggestions  
- 📈 **Smooth Animations** — Powered by Framer Motion for modern transitions  

---

## 🧩 Tech Stack

| Category | Tools |
|-----------|--------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/en-US/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | Lucide React |
| Hosting | [Vercel](https://vercel.com/) |
| Language | TypeScript |

---

## 🔄 Mock API Structure

Mock product data simulates AI transparency scoring and recommendations:

```json
{
  "productName": "Organic Herbal Tea",
  "score": 72,
  "explanation": "Moderate transparency. Missing sourcing details for 2 ingredients.",
  "suggestions": [
    "Add sourcing details for green tea leaves.",
    "Include certification ID for 'organic' claim.",
    "Clarify packaging recyclability."
  ],
  "flags": ["Incomplete sourcing", "Unverified organic claim"]
}
```
This data is dynamically rendered in product lists, detail panels, and visual charts.

## 🗂 Folder Structure
```bash
app/
  layout.tsx
  page.tsx                      # Main Dashboard
  products/
    page.tsx                    # Product List
    [id]/page.tsx               # Product Details
  add-product/
    page.tsx                    # Multi-step Form
  analytics/
    page.tsx
  calendar/
    page.tsx
  profile/
    page.tsx
    UserInfoCard.tsx
    UserMetaCard.tsx
    UserAddressCard.tsx

components/
  charts/
    ScoreGauge.tsx
  dashboard/
    ProductSummaryCard.tsx
  ui/

public/
  images/
styles/
```
## ⚙️ Installation & Local Development

### 1. Clone Repository
```bash
git clone https://github.com/rojanagunoori/hedamo-dashboard.git
cd hedamo-dashboard
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Run Dev Server

```bash
npm run dev
```
### 4. Visit http://localhost:3000

## 🚀 Deployment
This project is live on Vercel:

🔗 https://hedamo-dashboard-rho.vercel.app/

Automatic CI/CD is configured via GitHub → Vercel integration.
Every main branch push triggers a new deployment.

## 📖 Usage Guide
* Dashboard → Overview of transparency KPIs

* Products → Browse, search, and sort products by score or date

* Add Product → Use the wizard form to submit new items

* Analytics / Calendar → Placeholder modules for future expansion

* Profile → Edit personal, professional, and address details

## 🧠 Future Enhancements
* Backend API Integration (Node / Prisma / MongoDB)

* Role-based authentication

* Batch product import/export

* AI prompt inspector with interactive transparency report

* Enhanced mobile views & performance optimization

## 🤝 Contributing
Pull requests are welcome!
To contribute:

```bash
git checkout -b feature/your-feature
git commit -m "Add new feature"
git push origin feature/your-feature
```
Then submit a PR via GitHub.

---

## 📜 License
This project is licensed under the MIT License.
You’re free to use, modify, and distribute it.

## 👨‍💻 Developed by Rojan Agunoori
Live Demo: https://hedamo-dashboard-rho.vercel.app/
GitHub: https://github.com/rojanagunoori/hedamo-dashboard

---

```bash
Would you like me to also include **screenshots sections** (with markdown image placeholders) and a **short “Design Choices” explanation** section to make it fully submission-ready for the Altibbe assignment?
```