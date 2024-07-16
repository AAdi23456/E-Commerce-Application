
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
git clone https://github.com/yourusername/ecommerce-app.git
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

- **Sign-Up**: `POST /auth/signup`
- **Login**: `POST /auth/login`

### Seller Routes

- **Add Product**: `POST /seller/products` (Authenticated)
- **Edit Product**: `PUT /seller/products/:id` (Authenticated)
- **Delete Product**: `DELETE /seller/products/:id` (Authenticated)

### Buyer Routes

- **Search Products**: `GET /buyer/products`
- **Add to Cart**: `POST /buyer/cart` (Authenticated)
- **Remove from Cart**: `DELETE /buyer/cart/:id` (Authenticated)

## Directory Structure

```
.
├── prisma
│   ├── migrations
│   └── schema.prisma
├── controllers
│   ├── authController.js
│   ├── sellerController.js
│   └── buyerController.js
├── middleware
│   └── authMiddleware.js
├── models
│   └── User.js
├── routes
│   ├── authRoutes.js
│   ├── sellerRoutes.js
│   └── buyerRoutes.js
├── .env
├── app.js
├── logger.js
├── package.json
└── README.md
```

## Error Handling

The application provides meaningful and clear error messages for various scenarios such as invalid input, unauthorized access, and non-existent resources.

# E-Commerce-Application
