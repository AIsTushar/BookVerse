# Bookstore App

## Overview

**This App** is a full-featured e-commerce platform built for buying and selling books online—with a admin dashboard and a seamless user experience.

## API Documentation

Postman collection link:  
 [Postman Documentation URL](https://documenter.getpostman.com/view/21536674/2sBXVmdnVj)

## LIVE URL's

Postman collection link:  
[BACKEND](https://bookverse-jade-psi.vercel.app),
[ADMIN Dashboard](https://bookshopadmin-lyart.vercel.app)

## Features

### Authentication & Account Security

- **Email Verification**:  
  Users receive a one-time password (OTP) via email using a custom **SMTP-based OTP system** to verify their account upon registration.
- **Password Recovery**:  
  Forgot-password flow is secured with time-limited OTPs sent via email—ensuring only the legitimate user can reset their password.
- **Google Sign-In**:  
  Supports seamless authentication using **Google ID Token**, allowing users to log in or register without creating a new password.

### Secure Payments with Stripe

- **Stripe Integration**:  
  Full integration with **Stripe** for handling online payments securely.
- **PaymentMethod ID Flow**:  
  The frontend collects payment details via Stripe Elements and sends only the **`paymentMethodId`** to the backend—ensuring PCI compliance and no sensitive card data touches your server.
- **Order Checkout**:  
  Users can complete purchases directly from the cart using saved or new payment methods.

### Admin Dashboard (Protected Routes)

- **Content Management**:  
  Admins can **create, update, and delete** books, authors, and categories directly from the dashboard.
- **Real-Time Analytics**:  
  View key business metrics including:
  - Total sales
  - Number of orders
  - Revenue trends (with monthly/annual charts)
- **Order Management**:  
  Monitor all user orders, view order details, and update order status (e.g., _Processing_, _Shipped_, _Delivered_).
- **User Oversight**:  
  View user list and toggle account status (active/suspended) as needed.

### User-Facing Storefront (Frontend)

- **Smart Book Discovery**:  
  Users can browse the full catalog and refine results using multiple filters:
  - **Price range slider**
  - **Author name**
  - **Publisher**
  - **Category**
- **Search Functionality**:  
  Full-text search by book title or description for quick discovery.
- **Wishlist**:  
  Save favorite books for later viewing. Items persist across sessions.
- **Shopping Cart**:  
  Add/remove books, adjust quantities, and proceed to checkout seamlessly.
- **Product Reviews**:  
  Authenticated users can:
  - Submit star ratings and written reviews
  - Edit or delete their own reviews
  - View aggregated ratings and recent feedback on each book
- **Responsive & Intuitive UI**:  
  Designed for smooth navigation on both desktop and mobile devices.

### Backend Architecture Highlights

- RESTful API design with clear resource separation (`/api/v1/...`)
- Role-based access control (user vs. admin)
- Secure session management using HTTP-only cookies or JWT (as implemented)
- Input validation and error handling across all endpoints

## API Routes

### Authentication

- `POST` `/api/v1/auth/login`
- `POST` `/api/v1/auth/verify-otp`
- `POST` `/api/v1/auth/forget-password`
- `POST` `/api/v1/forget-otp-verify`
- `POST` `/api/v1/auth/resend-otp`
- `POST` `/api/v1/auth/reset-password`
- `GET` `/api/v1/auth/social-login`

### Users (Admin)

- `POST` `/api/v1/user/create`
- `GET` `/api/v1/user/me`
- `PUT` `/api/v1/user/me`
- `PUT` `/api/v1/user/change-password`
- `GET` `/api/v1/user/all-users`

### Categories

- `POST` `/api/v1/categories`
- `GET` `/api/v1/categories`
- `GET` `/api/v1/categories/:id`
- `PATCH` `/api/v1/categories/:id`
- `DELETE` `/api/v1/categories/:id`

### Authors

- `POST` `/api/v1/authors`
- `GET` `/api/v1/authors`
- `GET` `/api/v1/authors/:id`
- `PATCH` `/api/v1/authors/:id`
- `DELETE` `/api/v1/authors/:id`

### Products

- `POST` `/api/v1/products`
- `GET` `/api/v1/products`
- `GET` `/api/v1/products/:id`
- `PATCH` `/api/v1/products/:id`
- `DELETE` `/api/v1/products/:id`

### Wishlist

- `POST` `/api/v1/wishlist`
- `GET` `/api/v1/wishlist`
- `DELETE` `/api/v1/wishlist/:productId`

### Cart

- `POST` `/api/v1/cart`
- `GET` `/api/v1/cart`
- `PATCH` `/api/v1/cart/:productId`
- `DELETE` `/api/v1/cart/:productId`

### Orders

- `POST` `/api/v1/orders`
- `GET` `/api/v1/orders`
- `GET` `/api/v1/orders/:id`
- `GET` `/api/v1/orders/admin`
- `PATCH` `/api/v1/orders/:id/status`

### Reviews

- `POST` `/api/v1/reviews`
- `GET` `/api/v1/reviews/product/:productId`
- `PATCH` `/api/v1/reviews/:id`
- `DELETE` `/api/v1/reviews/:id`

### Dashboard (Admin)

- `GET` `/api/v1/dashboard/stats`
- `GET` `/api/v1/dashboard/revenue-chart?year=YYYY`

### Payments (Stripe)

- `POST` `/api/v1/payments/create-intent`
