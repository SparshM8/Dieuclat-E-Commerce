# Dieuclat E-Commerce

A full-stack e-commerce platform for discovering products, managing a cart, and completing an order journey. The repository combines a React/TypeScript storefront with an Express/MongoDB API and includes authentication, catalog, cart, order, and admin-oriented flows.

[![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-61DAFB?logo=react&logoColor=111827)](dieuclat-react/)
[![Backend](https://img.shields.io/badge/backend-Express%20%2B%20MongoDB-47A248?logo=mongodb&logoColor=white)](backend/)
[![Status](https://img.shields.io/badge/status-development-F59E0B)](#status)

## Features

- User registration, login, profile management, and JWT-based authentication.
- Product discovery with search, filtering, categories, pricing, reviews, and ratings.
- Persistent cart management with guest-cart merge support.
- Checkout and order lifecycle views with status tracking.
- Admin-oriented product and order management endpoints.
- Security foundations including password hashing, validation, rate limiting, CORS, Helmet, and data sanitization.

## Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, JWT, Mongoose |
| Database | MongoDB |
| Tooling | npm, ESLint, environment-based configuration |

## Repository layout

```text
Dieuclat-E-Commerce/
├── backend/                 # Express API, models, auth, and API docs
├── dieuclat-react/          # React + TypeScript storefront
├── backend/README.md        # Backend setup and endpoint overview
└── backend/API_DOCUMENTATION.md
```

## Local setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure MongoDB, JWT, and frontend origin values in .env
npm run dev
```

The backend README contains the environment variable details and API startup notes. The API reference is available in [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md).

### Frontend

```bash
cd dieuclat-react
npm install
npm run dev
```

Set the frontend API base URL according to the backend configuration before testing authenticated flows.

## API groups

The API is organized around the following resource groups:

```text
/api/auth
/api/products
/api/cart
/api/orders
```

Protected requests use a JWT bearer token in the `Authorization` header. See the API documentation for request bodies, response formats, pagination, and endpoint examples.

## Status

This repository is a **development-stage full-stack project**. Before production use, review payment handling, secret management, authorization boundaries, automated test coverage, error observability, and deployment configuration.

## Author

**Sparsh Mishra** — [GitHub](https://github.com/SparshM8) · [Portfolio](https://sparshm8.in/)
