# Zentra — Multi-Category E-Commerce Storefront

Zentra is a React-based e-commerce frontend for a global marketplace selling electronics, clothing, and home & interior products. It features a full shopping flow from browsing to checkout, along with authentication pages.

---

## Tech Stack

- **React 18** — component-based UI
- **React Router v6** — client-side routing with nested routes
- **Lucide React** — icon library
- **Plain CSS** — per-component stylesheets (no CSS framework)

---

## Project Structure

```
ecommerce/
├── public/
│   └── assets/
│       ├── Image/
│       │   ├── backgrounds/   # Hero & banner images
│       │   ├── interior/      # Home & interior product images
│       │   └── tech/          # Electronics product images
│       └── Layout/
│           ├── Brand/         # Logo (logo-colored.png)
│           ├── Form/          # Input icons
│           └── Misc/          # Misc UI assets
└── src/
    ├── App.js                 # Root component — routing & global state
    ├── index.js               # Entry point
    ├── styles/
    │   └── global.css         # Global CSS variables and resets
    ├── components/
    │   ├── Header.jsx / .css  # Navigation, search, cart icon, user menu
    │   ├── Footer.jsx / .css  # Newsletter, links, social icons
    │   └── ProductCard.jsx / .css  # Reusable product card with badge & rating
    ├── data/
    │   ├── products.js        # Product arrays: techProducts, clothProducts, interiorProducts
    │   └── categories.js      # Navigation categories & mega-menu structure
    └── pages/
        ├── HomePage.jsx / .css
        ├── ProductListPage.jsx / .css
        ├── ProductDetailPage.jsx / .css
        ├── CartPage.jsx / .css
        ├── auth/
        │   ├── LoginPage.jsx
        │   ├── SignupPage.jsx
        │   └── Auth.css
        └── checkout/
            ├── CheckoutPage.jsx
            └── CheckoutPage.css
```

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Hero banner, deals, category grid, product sections |
| `/products` | `ProductListPage` | Filterable product grid with sorting |
| `/product/:id` | `ProductDetailPage` | Single product with colour/size picker, add to cart |
| `/cart` | `CartPage` | Cart items, quantity controls, order summary |
| `/checkout` | `CheckoutPage` | Shipping form, payment details, order review |
| `/login` | `LoginPage` | Email/password login form |
| `/signup` | `SignupPage` | New account registration form |

---

## Product Catalogue

Products are defined statically in `src/data/products.js` and split into three categories:

- **Tech** (9 items) — iPhones, MacBook, Apple Watch, Sony/Canon cameras, AirPods, Samsung Galaxy
- **Clothing** (6 items) — men's & women's shirts, dresses, coats, hoodies, trousers
- **Home & Interior** (9 items) — sofas, chairs, lamps, rugs, shelves, wall art

Each product has: `id`, `name`, `price`, `oldPrice`, `rating`, `reviews`, `image`, `badge` (discount %), `freeShipping`, and `category`.

---

## State Management

All state lives in `App.js` and is passed down via props:

- **`cartItems`** — array of cart entries (`id`, `qty`, `color`, `size`, `price`)
- **`user`** — currently logged-in user object (or `null`)
- **`addToCart(product)`** — merges new items or increments quantity if already in cart
- **`cartCount`** — derived total quantity shown in the header badge

There is no external state library (no Redux/Zustand).

---

## Navigation

The header (`Header.jsx`) supports:

- **Category dropdown** with hover-activated sub-menus
- **Mega-menu** under "Categories" covering 6 top-level categories (Electronics, Clothing, Home & Interior, Sports, Tools, Health & Beauty)
- **Search bar** with a category filter selector
- **Language switcher** (EN / DE / FR / US)
- **User menu** — shows login/signup links when logged out, account options when logged in
- **Mobile menu** — hamburger toggle for smaller screens

---

## Getting Started

### Prerequisites

- Node.js ≥ 16
- npm or yarn

### Install & Run

```bash
# Clone or extract the project
cd ecommerce

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

Output is placed in the `build/` directory and is ready to serve from any static host.

---

## Key Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "lucide-react": "latest"
}
```

> **Note:** A `package.json` is not included in the uploaded source. Run `npm init -y` and install the above packages if starting fresh.

---

## Extending the Project

- **Real backend** — replace the static arrays in `src/data/products.js` with API calls (e.g. `useEffect` + `fetch`).
- **Authentication** — wire `LoginPage` and `SignupPage` to a real auth service; currently `onLogin` just sets local state.
- **Persistent cart** — add `localStorage` sync inside the `addToCart` / `setCartItems` handlers in `App.js`.
- **Payment** — integrate Stripe or another gateway inside `CheckoutPage`.
- **Global state** — consider React Context or Zustand as the app grows.
