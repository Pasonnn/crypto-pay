# Authentication Service

## Overview
The Authentication Service handles user identity management, authentication, and authorization for the cryptocurrency payment gateway platform. It provides secure endpoints for user registration, login, token management, and profile access.

## Features
- User registration and account management
- Secure authentication with JWT tokens
- Token refresh mechanism
- User profile management
- Session invalidation (logout)
- Role-based access control

## Tech Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## API Endpoints

### User Registration
- **Endpoint**: `POST /auth/register`
- **Description**: Register a new merchant account
- **Request Body**:
  ```json
  {
    "email": "merchant@example.com",
    "password": "securePassword123",
    "name": "Merchant Name",
    "businessName": "Business LLC"
  }
  ```
- **Response**: User object with JWT token

### User Login
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate and receive access token
- **Request Body**:
  ```json
  {
    "email": "merchant@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: JWT token with user information

### Token Refresh
- **Endpoint**: `POST /auth/refresh`
- **Description**: Refresh an expired access token
- **Request Body**:
  ```json
  {
    "refreshToken": "valid-refresh-token"
  }
  ```
- **Response**: New JWT access token

### User Profile
- **Endpoint**: `GET /auth/profile`
- **Description**: Retrieve merchant profile information
- **Headers**: Authorization: Bearer {token}
- **Response**: User profile data

### Profile Update
- **Endpoint**: `PUT /auth/profile`
- **Description**: Update merchant profile information
- **Headers**: Authorization: Bearer {token}
- **Request Body**: Fields to update
- **Response**: Updated user profile

### Logout
- **Endpoint**: `POST /auth/logout`
- **Description**: Invalidate current session token
- **Headers**: Authorization: Bearer {token}
- **Response**: Confirmation of logout
