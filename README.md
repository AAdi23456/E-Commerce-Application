
# E-Commerce Application

This is a simple e-commerce application with user authentication, built using Node.js, Express.js, and PostgreSQL. It allows users to sign up as either sellers or buyers, and provides functionality for sellers to manage products and buyers to search for products and manage their cart.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Logging**: Winston
- **Input Validation**: express-validator

## Features

### User Authentication

- **Sign-Up**: Users can sign up as either a seller or a buyer.
- **Login**: Users can log in to their account.

### Seller Functionality

- **Add Products**: Sellers can add new products with details such as name, category, description, price, and discount.
- **Edit Products**: Sellers can edit their existing products.
- **Delete Products**: Sellers can delete their products.

### Buyer Functionality

- **Search Products**: Buyers can search for products by name or category.
- **Add to Cart**: Buyers can add products to their cart.
- **Remove from Cart**: Buyers can remove products from their cart.

## Prerequisites

- Node.js
- PostgreSQL

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/AAdi23456/E-Commerce-Application
cd ecommerce-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=postgres://your_db_username:your_db_password@localhost:5432/your_db_name
JWT_SECRET=your_jwt_secret
```

Replace `your_db_username`, `your_db_password`, `your_db_name`, and `your_jwt_secret` with your actual database credentials and JWT secret.

### 4. Set Up PostgreSQL

Ensure PostgreSQL is installed and running on your machine. Create a database for the application.

### 5. Set Up Prisma

Generate the Prisma client:

```sh
npx prisma generate
```

Run the migrations to set up the database schema:

```sh
npx prisma migrate dev --name init
```

### 6. Start the Application

```sh
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

#### Sign-Up

- **Endpoint**: `POST https://e-commerce-application-g88v.onrender.com/auth/signup`
- **Description**: Users can sign up as either a seller or a buyer.

**Sample Input**:
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "SELLER" // or "BUYER"
}
```

**Sample Output**:
```json
{
  "message": "User registered successfully"
}
```

#### Login

- **Endpoint**: `POST https://e-commerce-application-g88v.onrender.com/auth/login`
- **Description**: Users can log in to their account.

**Sample Input**:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Sample Output**:
```json
{
  "token": "jwt_token_here"
}
```

### Seller Routes

#### Add Product

- **Endpoint**: `POST https://e-commerce-application-g88v.onrender.com/seller/products` (Authenticated)
- **Description**: Sellers can add new products.

**Sample Input**:
```json
{
  "name": "Product Name",
  "category": "Category",
  "description": "Product Description",
  "price": 99.99,
  "discount": 10
}
```

**Sample Output**:
```json
{
  "message": "Product created successfully"
}
```

#### Edit Product

- **Endpoint**: `PUT https://e-commerce-application-g88v.onrender.com/seller/products/:id` (Authenticated)
- **Description**: Sellers can edit their existing products.

**Sample Input**:
```json
{
  "name": "Updated Product Name",
  "category": "Updated Category",
  "description": "Updated Product Description",
  "price": 89.99,
  "discount": 15
}
```

**Sample Output**:
```json
{
  "message": "Product updated successfully"
}
```

#### Delete Product

- **Endpoint**: `DELETE https://e-commerce-application-g88v.onrender.com/seller/products/:id` (Authenticated)
- **Description**: Sellers can delete their products.

**Sample Output**:
```json
{
  "message": "Product deleted successfully"
}
```

### Buyer Routes

#### Search Products

- **Endpoint**: `GET https://e-commerce-application-g88v.onrender.com/buyer/products`
- **Description**: Buyers can search for products by name or category.

**Sample Input**:
```json
{
  https://e-commerce-application-g88v.onrender.com/buyer/products?name=T-shirt
}
```

**Sample Output**:
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "category": "Category",
    "description": "Product Description",
    "price": 99.99,
    "discount": 10
  },
  {
    "id": 2,
    "name": "Another Product",
    "category": "Category",
    "description": "Another Product Description",
    "price": 79.99,
    "discount": 5
  }
]
```

#### Add to Cart

- **Endpoint**: `POST https://e-commerce-application-g88v.onrender.com/buyer/cart` (Authenticated)
- **Description**: Buyers can add products to their cart.

**Sample Input**:
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Sample Output**:
```json
{
  "message": "Product added to cart"
}
```

#### Remove from Cart

- **Endpoint**: `DELETE https://e-commerce-application-g88v.onrender.com/buyer/cart/:id` (Authenticated)
- **Description**: Buyers can remove products from their cart.

**Sample Output**:
```json
{
  "message": "Product removed from cart"
}
```

#### View Cart Items

- **Endpoint**: `GET https://e-commerce-application-g88v.onrender.com/buyer/cart` (Authenticated)
- **Description**: Buyers can view items in their cart.

**Sample Output**:
```json
[
  {
    "productId": 1,
    "name": "Product Name",
    "category": "Category",
    "description": "Product Description",
    "price": 99.99,
    "discount": 10,
    "quantity": 2
  },
  {
    "productId": 2,
    "name": "Another Product",
    "category": "Category",
    "description": "Another Product Description",
    "price": 79.99,
    "discount": 5,
    "quantity": 1
  }
]
```

## Getting Started

