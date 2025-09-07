# E-commerce Backend (Express + MongoDB)

## Env
Copy `.env.example` to `.env` and fill values.

## Run
```bash
npm i
npm run seed
npm run dev
```

## Auth
- POST `/api/auth/signup` `{ name, email, password }`
- POST `/api/auth/login` `{ email, password }`
- GET `/api/auth/me` (Bearer token)

## Items (CRUD + filters)
- GET `/api/items` query: `q, category, minPrice, maxPrice, sort=price_asc|price_desc|newest, page, limit`
- POST `/api/items` (admin only)
- PUT `/api/items/:id` (admin only)
- DELETE `/api/items/:id` (admin only)

## Cart
(Requires auth)
- GET `/api/cart`
- POST `/api/cart/add` `{ itemId, quantity }`
- PATCH `/api/cart/update` `{ itemId, quantity }`
- DELETE `/api/cart/remove/:itemId`
- POST `/api/cart/merge` `{ items: [{ itemId, quantity }] }`  (on login to merge local cart)
