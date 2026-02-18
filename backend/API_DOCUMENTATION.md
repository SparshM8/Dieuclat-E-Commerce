# Dieuclat E-Commerce API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {"field": "email", "message": "Invalid email format"}
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "totalPages": 9,
    "hasMore": true
  }
}
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login
**POST** `/api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "user": { /* user object */ },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User
**GET** `/api/auth/me`  
**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Current user retrieved",
  "data": { /* user object */ }
}
```

### 4. Logout
**POST** `/api/auth/logout`  
**Auth:** Required

---

## Product Endpoints

### 1. Get All Products
**GET** `/api/products`

**Query Parameters:**
- `page` (int, default: 1) - Page number
- `limit` (int, default: 12) - Items per page
- `category` (string) - Filter by category
- `subcategory` (string) - Filter by subcategory
- `occasion` (string) - Filter by occasion
- `recipient` (string) - Filter by recipient
- `minPrice` (float) - Minimum price
- `maxPrice` (float) - Maximum price
- `search` (string) - Search keyword
- `sort` (string) - Sort order: `price_asc`, `price_desc`, `rating`, `newest`, `popular`
- `featured` (boolean) - Show featured products only
- `onSale` (boolean) - Show on-sale products only

**Example:**
```
GET /api/products?category=birthday&minPrice=50&maxPrice=500&sort=price_asc&page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Luxury Gift Box",
      "description": "Premium gift box",
      "price": 149.99,
      "originalPrice": 199.99,
      "category": "birthday",
      "images": [{ "url": "...", "alt": "...", "isPrimary": true }],
      "inventory": { "quantity": 50 },
      "rating": 4.5,
      "reviews": 12
    }
  ],
  "pagination": { /* pagination info */ }
}
```

### 2. Get Product by ID
**GET** `/api/products/:id`

**Response:**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": { /* complete product object */ }
}
```

### 3. Create Product
**POST** `/api/products`  
**Auth:** Required (Admin only)

**Request:**
```json
{
  "name": "Luxury Gift Box",
  "description": "Premium gift box with personalization",
  "shortDescription": "Luxury gift box",
  "price": 149.99,
  "category": "birthday",
  "subcategory": "for-her",
  "occasion": "birthday",
  "recipient": "her",
  "images": [
    { "url": "https://...", "alt": "Gift box", "isPrimary": true }
  ],
  "inventory": {
    "quantity": 100,
    "sku": "LGB-001"
  }
}
```

### 4. Update Product
**PUT** `/api/products/:id`  
**Auth:** Required (Admin only)

### 5. Delete Product
**DELETE** `/api/products/:id`  
**Auth:** Required (Admin only)

---

## Cart Endpoints

### 1. Get Cart
**GET** `/api/cart`

**Headers:**
- `x-session-id` (string, optional) - Session ID for guest users

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "items": [
      {
        "product": "507f1f77bcf86cd799439012",
        "quantity": 2,
        "price": 149.99
      }
    ],
    "subtotal": 299.98,
    "itemCount": 2
  }
}
```

### 2. Add Item to Cart
**POST** `/api/cart/items`

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 2,
  "customization": {
    "message": "Happy Birthday!",
    "giftWrap": true
  }
}
```

### 3. Update Cart Item
**PUT** `/api/cart/items/:itemId`

**Request:**
```json
{
  "quantity": 3
}
```

### 4. Remove Item from Cart
**DELETE** `/api/cart/items/:itemId`

### 5. Clear Cart
**DELETE** `/api/cart`

---

## Order Endpoints

### 1. Create Order
**POST** `/api/orders`  
**Auth:** Required

**Request:**
```json
{
  "items": [
    {
      "product": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "payment": {
    "method": "card"
  },
  "couponCode": "SAVE20" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "orderNumber": "ORD-2026-001",
    "items": [ /* order items */ ],
    "subtotal": 299.98,
    "tax": 30.00,
    "shipping": 10.00,
    "discount": 0,
    "total": 339.98,
    "status": "pending",
    "payment": {
      "method": "card",
      "status": "pending"
    }
  }
}
```

### 2. Get My Orders
**GET** `/api/orders/my-orders`  
**Auth:** Required

**Query Parameters:**
- `page` (int, default: 1)
- `limit` (int, default: 10)
- `status` (string) - Filter by status

**Response:**
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [ /* array of orders */ ],
  "pagination": { /* pagination info */ }
}
```

### 3. Get Order by ID
**GET** `/api/orders/:id`  
**Auth:** Required

### 4. Update Order Status
**PUT** `/api/orders/:id/status`  
**Auth:** Required (Admin only)

**Request:**
```json
{
  "status": "processing"
}
```

### 5. Cancel Order
**POST** `/api/orders/:id/cancel`  
**Auth:** Required

---

## User Endpoints

### 1. Update Profile
**PUT** `/api/auth/profile`  
**Auth:** Required

**Request:**
```json
{
  "name": "John Doe",
  "avatar": "https://...",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### 2. Change Password
**POST** `/api/auth/change-password`  
**Auth:** Required

**Request:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

### 3. Delete Account
**DELETE** `/api/auth/account`  
**Auth:** Required

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request (Validation Error) |
| 401  | Unauthorized (Auth Required) |
| 403  | Forbidden (Permission Denied) |
| 404  | Not Found |
| 409  | Conflict (Duplicate Request) |
| 500  | Server Error |

---

## Rate Limiting

- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Header**: `X-RateLimit-Remaining` shows remaining requests

---

## Caching

GET requests are automatically cached:
- **Products**: 10 minutes
- **Users**: 5 minutes
- **General**: 5 minutes (customizable)

Add `?cache=false` to bypass cache if needed.

---

## Best Practices

1. **Always include Auth token in headers:**
   ```
   Authorization: Bearer <token>
   ```

2. **Handle pagination:**
   ```javascript
   // Check if more pages exist
   if (response.pagination.hasMore) {
     // Fetch next page
   }
   ```

3. **Implement error handling:**
   ```javascript
   if (!response.success) {
     // Show error message
     console.error(response.errors);
   }
   ```

4. **Use appropriate HTTP methods:**
   - GET: Fetch data
   - POST: Create data
   - PUT: Update data
   - DELETE: Remove data

5. **Validate inputs client-side before sending:**
   - Email format
   - Password strength
   - Required fields

---

## Testing Endpoints

### Health Check
**GET** `/api/health`
```json
{
  "status": "OK",
  "timestamp": "2026-02-18T10:30:00.000Z"
}
```

### Test Authentication
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token>"
```

---

## Changelog

### Version 1.0.0 (2026-02-18)
- Initial API release
- Authentication endpoints
- Product catalog
- Shopping cart
- Order management
- User management
