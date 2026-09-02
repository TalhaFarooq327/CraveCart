# 🍔 CraveCart — Modern Food Delivery System

A sleek, responsive, and feature-rich food delivery web application built with **React 18**, **Vite**, **Vanilla CSS**, and **React Router v6**. Inspired by modern food platforms, **CraveCart** provides an intuitive experience for browsing restaurants, discovering food items, managing a cart, and placing orders online.

![CraveCart Tech Stack](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/Styling-Custom%20CSS%20Variables-1572B6?logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features Overview

### 🏠 1. Homepage
- **Hero Banner**: Animated gradient background, search input, floating badges, and key statistics.
- **Categories Grid**: 6 food categories (*Pizza, Burgers, Fast Food, Desserts, Beverages, Healthy Meals*) with custom gradient icons.
- **Featured Restaurants**: Showcase top-rated dining spots with delivery times, ratings, and open status.
- **Popular Dishes**: Quick-order food items with instant **Add to Cart** action.
- **Promos & Discounts**: Promo cards displaying coupon codes (`WELCOME50`, `FREEDEL`, `PIZZA3`).
- **How It Works**: 4-step interactive ordering guide.

### 🏪 2. Restaurant Listings & Details
- Search restaurants by name, address, or cuisine type.
- Filter using cuisine tags (*Italian, American, Japanese, Mexican, Healthy, etc.*).
- **Dedicated Restaurant Page**: Restaurant header with specs (*Rating, Delivery Time, Delivery Fee, Location*) and filtered food menu.

### 🍽️ 3. Food Menu & Advanced Filters
- **Live Search**: Instant keyword search by dish name or ingredients.
- **Interactive Sidebar**:
  - Category selector chips.
  - Interactive **Price Range Slider** ($4 – $25).
  - Sort selector (*Popularity, Rating, Price: Low to High, Price: High to Low*).
  - One-click filter reset.

### 🛒 4. Cart Management & LocalStorage Persistence
- **Slide-in Cart Drawer**: Accessible from anywhere via the navbar.
- **Dedicated Cart Page**: Adjust quantities (`+` / `-`), remove individual items, or clear cart.
- Dynamic calculation of **Subtotal**, **Delivery Fee**, **8% Tax**, and **Total Amount**.
- **LocalStorage Sync**: Cart items persist seamlessly across page reloads.

### 📝 5. Checkout & Form Validation
- Multi-section checkout form (*Customer Details, Delivery Address, Payment Methods*).
- Real-time form validations (*Required fields, email syntax, phone format, credit card info*).
- Toggle between **Credit/Debit Card** and **Cash on Delivery**.

### 🎉 6. Order Confirmation Page
- Generated unique tracking number (e.g. `ORD-847291`).
- Complete order itemization and cost summary breakdown.
- Customer delivery details and estimated delivery time.

### 🎁 7. Bonus Features
- 🌙 **Dark/Light Mode Toggle**: Theme switcher with system preference detection and LocalStorage memory.
- 🔐 **Sign In / Sign Up Modal**: Tabbed authentication modal with interactive form validation.
- 👤 **User Profile Page**: Edit profile information, phone, default delivery address, and logout.
- ⬆️ **Auto Scroll to Top**: Smooth navigation resetting scroll offset on route changes.
- ✨ **Toast Notifications**: Feedback toasts when adding items or updating profile settings.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State Management** | React Context API (`CartContext`, `ThemeContext`, `AuthContext`, `ToastContext`) |
| **Styling** | Custom Vanilla CSS (Design Tokens, Glassmorphism, CSS Variables, Responsive Grids) |
| **Persistence** | Browser `LocalStorage` |

---

## 📂 Project Structure

```
CraveCart/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── auth/          # AuthModal (Sign In / Sign Up)
│   │   ├── cart/          # CartDrawer & Cart Items
│   │   ├── home/          # Hero, Categories, FeaturedRestaurants, PopularItems, Promos, HowItWorks
│   │   ├── layout/        # Navbar, Footer
│   │   ├── menu/          # SearchBar, FilterPanel
│   │   └── utils/         # ScrollToTop listener
│   ├── context/
│   │   ├── CartContext.jsx   # Shopping cart state & LocalStorage
│   │   ├── ThemeContext.jsx  # Dark/Light mode theme state
│   │   ├── AuthContext.jsx   # User login & profile state
│   │   └── ToastContext.jsx  # Notification toasts
│   ├── data/
│   │   ├── categories.js     # Food categories & icons
│   │   ├── restaurants.js    # Restaurant mock data
│   │   └── foods.js          # Detailed food items dataset
│   ├── hooks/
│   │   └── useScrollReveal.js # IntersectionObserver animations
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── RestaurantsPage.jsx
│   │   ├── RestaurantDetailPage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── OrderPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   └── ProfilePage.jsx
│   ├── styles/
│   │   └── index.css      # Design system & CSS custom properties
│   ├── App.jsx            # Routing & Provider hierarchy
│   └── main.jsx           # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v16 or higher) and **npm** installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TalhaFarooq327/CraveCart.git
   cd CraveCart
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/` (or the URL displayed in your terminal).

### Production Build

To build the project for production:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
