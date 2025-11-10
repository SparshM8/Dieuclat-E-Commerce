# Dieuclat E-commerce Backend API

A comprehensive backend API for the Dieuclat luxury gifting e-commerce platform, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication & Authorization** - JWT-based auth with role management
- **Product Management** - Full CRUD operations with inventory tracking
- **Shopping Cart** - Persistent cart with guest and user support
- **Order Processing** - Complete order lifecycle management
- **Security** - Helmet, CORS, rate limiting, input validation
- **Performance** - Compression, optimized queries, indexing

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dieuclat
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:8000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the server**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering/pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products/:id/reviews` - Add product review
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Shopping Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update item quantity
- `DELETE /api/cart/items/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart
- `POST /api/cart/merge` - Merge guest cart with user cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

## Data Models

### User
- Personal information (name, email, phone)
- Authentication (password, JWT tokens)
- Address and preferences
- Role-based access (user/admin)

### Product
- Basic info (name, description, price)
- Categorization (category, occasion, recipient)
- Inventory management
- Media (images, specifications)
- Reviews and ratings
- SEO optimization

### Cart
- Session-based or user-based storage
- Item management with customization
- Automatic total calculations
- Product availability checking

### Order
- Complete order lifecycle
- Payment and shipping tracking
- Gift options and customization
- Order history and status updates

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Input Validation** - Comprehensive validation with express-validator
- **Rate Limiting** - Protection against brute force attacks
- **CORS** - Configured cross-origin resource sharing
- **Helmet** - Security headers for production
- **Data Sanitization** - Prevention of NoSQL injection

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Project Structure

```
backend/
├── models/          # Mongoose models
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/          # API route handlers
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
├── middleware/      # Custom middleware
│   └── auth.js
├── server.js        # Main application file
├── package.json
├── .env.example
└── README.md
```

## API Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...] // Optional validation errors
}
```

## Error Handling

The API includes comprehensive error handling:
- Validation errors with detailed messages
- Authentication and authorization errors
- Database connection and query errors
- Server errors with proper logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please contact the development team.