#  E-Commerce SPA Assignment

A **Single Page Application (SPA)** for an e-commerce website with basic features:
- JWT-based Authentication
- Item CRUD APIs (with filters)
- Add-to-Cart APIs
- Persistent Cart (works even after logout)

This project is split into **Backend (Node/Express + MongoDB)** and **Frontend (React + Vite + Tailwind)**.

---

##  Features

### Backend
- **Authentication APIs** using JWT:
  - `POST /api/auth/signup` → User registration
  - `POST /api/auth/login` → User login (returns JWT)
  - `GET /api/auth/me` → Get current logged-in user
- **Items CRUD APIs (with filters)**:
  - `GET /api/items` → Supports search, category, price range, sorting, pagination
  - `POST /api/items` → Create new item (Admin only)
  - `PUT /api/items/:id` → Update item (Admin only)
  - `DELETE /api/items/:id` → Delete item (Admin only)
- **Cart APIs**:
  - `GET /api/cart` → Get user cart
  - `POST /api/cart/add` → Add item to cart
  - `PATCH /api/cart/update` → Update item quantity
  - `DELETE /api/cart/remove/:itemId` → Remove item from cart
  - `POST /api/cart/merge` → Merge local cart with server cart (on login)

### Frontend
- **Signup & Login pages**
- **Product Listing page** with filters (search, category, price range, sort)
- **Cart page** with add, remove, and update quantity
- **Cart persistence**:
  - Cart saved in `localStorage` when logged out
  - Cart synced with server when logged in
  - On login → local cart is merged with server cart

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express, MongoDB, JWT, bcrypt
- **Frontend**: React (Vite), Tailwind CSS, Axios, React Router DOM
- **Database**: MongoDB Atlas (or local MongoDB)

---

## ⚙️ Setup Instructions

### 1. Clone repo
```bash
git clone <repo-url>
cd ecom-spa-assignment
