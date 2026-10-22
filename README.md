# StoreForge - Product Management & Catalog Platform

StoreForge is a modern, responsive web application built with **Next.js (App Router)**, **Tailwind CSS**, and **Firebase Authentication**. The application features an interactive public product catalog with instant search and multi-parameter filtering, combined with protected administration routes that enable authenticated users to add and manage inventory.

---

## 🌟 Key Features

- **Authentication via Firebase**:
  - Email and Password registration and sign-in with inline validation.
  - One-click Google Popup Authentication.
  - Global authentication state tracking via React Context API (`AuthContext`).
  - Automatic redirect to `/` upon successful login.

- **7-Section Landing Page (`/`)**:
  - Sticky, responsive Navbar with active links and conditional login/user dropdown state.
  - Hero section with clear headline, subtitle, primary/secondary CTAs, and ambient radial glow.
  - Features overview highlighting platform performance, filtering, and security.
  - Curated "Featured Items" preview grid.
  - Customer social proof/testimonials section.
  - Full-width promotional banner with direct CTA.
  - Comprehensive Footer with navigation links, branding, and social icons.

- **Interactive Items Catalog (`/items`)**:
  - Real-time search query matching across titles, categories, and descriptions.
  - Multi-parameter filtering with at least 2 distinct parameters:
    - **Category selector** (e.g., Electronics, Audio, Wearables, Accessories).
    - **Price range filter** (Under $100, $100–$200, Above $200).
  - Responsive multi-column grid layout displaying uniform product cards.
  - Direct "View Details" navigation.

- **Dynamic Product Details Page (`/items/[id]`)**:
  - Dynamic routing using Next.js App Router parameters.
  - High-resolution product images, pricing, status badges, and full descriptions.
  - Comprehensive key specifications list.
  - Related items section calculated dynamically from matching categories.
  - Quick "Back to Items" navigation button.

- **Protected Routes & Inventory Management**:
  - **`ProtectedRoute` Wrapper**: Safeguards admin routes and redirects unauthenticated visitors to `/login`.
  - **Add Product (`/items/add`)**: Complete form with validation, price checking, and animated success feedback toasts.
  - **Manage Products (`/items/manage`)**: Responsive desktop table and mobile card view with direct item inspection and instant item deletion.
  - Persistent catalog data synchronization across sessions using browser `localStorage`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16+ (App Router, Turbopack)
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **Authentication**: Firebase Authentication v13
- **Icons**: React Icons (`react-icons/fi`, `react-icons/fc`)
- **Deployment**: Vercel

---

## 🚀 Getting Started & Installation

### 1. Clone the Repository

```bash
git clone [https://github.com/shakirhussaindev/StoreForge](https://github.com/shakirhussaindev/StoreForge)
cd storeforge
2. Install DependenciesBashnpm install
3. Setup Environment VariablesCreate a .env.local file in the root directory and insert your Firebase Web Configuration keys:Code snippetNEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Note: Ensure Email/Password and Google sign-in providers are enabled in your Firebase Console under Authentication > Sign-in method.4. Run the Development ServerBashnpm run dev
Open http://localhost:3000 in your browser to view the application.


## 🗺️ Route Summary

| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Landing page featuring all 7 sections (Navbar, Hero, Features, Featured Items, Testimonials, Promo Banner, Footer). |
| `/items` | Public | Product catalog with live search, category filter, price filter, and responsive grid. |
| `/items/[id]` | Public | Dynamic item details page with full descriptions, specifications, and related items. |
| `/about` | Public | About the company, mission statement, core pillars, and overview. |
| `/login` | Public | Account authentication with email/password, password visibility toggle, and Google sign-in. |
| `/register` | Public | Account registration form with password confirmation and Google sign-up. |
| `/items/add` | **Protected** | Accessible only when authenticated. Form to submit new products with validation and feedback toast. |
| `/items/manage` | **Protected** | Accessible only when authenticated. Table/grid view to inspect items and perform deletion. |