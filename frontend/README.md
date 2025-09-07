# E-commerce Frontend (React + Vite + Tailwind)

## Setup
Create `.env` with:
```
VITE_API_URL=http://localhost:4000
```

## Run
```bash
npm i
npm run dev
```

Pages:
- `/signup`, `/login`
- `/` products list with filters
- `/cart` cart with add/remove and quantity controls

Cart persists after logout (stored locally) and merges with server cart on login.
