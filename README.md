# SkillSwap

A production-ready **MERN Skill Exchange Platform** that enables users to share their skills, request skill exchanges, review completed exchanges, and receive notifications. The backend is built using **Node.js, Express.js, TypeScript, MongoDB, and a layered architecture** following production-ready best practices.

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing with bcrypt

---

## User Management

* View Profile
* Update Profile
* Upload Profile Image
* Public User Profiles

---

## Skill Management

* Create Skill
* Update Skill
* Delete Skill
* View Skill Details
* Browse All Skills
* Search Skills
* Filter Skills

---

## Skill Exchange

* Send Exchange Request
* Prevent Duplicate Requests
* Accept Exchange
* Reject Exchange
* Complete Exchange
* Exchange Status Tracking

---

## Reviews & Ratings

* Review Completed Exchanges
* One Review Per User Per Exchange
* Bidirectional Reviews
* Rating System

---

## Notifications

* Exchange Request Notifications
* Exchange Status Notifications
* Review Notifications
* Fetch User Notifications
* Mark Notification as Read

---

## Production Features

* Layered Architecture
* Repository Pattern
* Zod Validation
* Centralized Error Handling
* Custom Error Classes
* Async Handler
* JWT Authentication Middleware
* Helmet Security
* Rate Limiting
* HPP Protection
* Compression
* Structured Logging with Pino
* Request Logging
* Health Check Endpoint

---

# Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript

## Database

* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

## Validation

* Zod

## File Upload

* Cloudinary
* Multer

## Logging

* Pino
* Pino HTTP

## Security

* Helmet
* Express Rate Limit
* HPP
* Compression

---

# Architecture

The project follows a layered architecture to improve maintainability and scalability.

```text
Client

↓

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

MongoDB
```

### Responsibilities

**Routes**

* Define API endpoints
* Apply middleware
* Delegate requests to controllers

**Controllers**

* Handle request and response
* Call service layer
* Return standardized API responses

**Services**

* Implement business logic
* Perform validations
* Coordinate repositories

**Repositories**

* Interact with MongoDB
* Execute database queries
* Isolate persistence logic

---

# Project Structure

```text
apps/
└── api/
    └── src/
        ├── config/
        ├── middleware/
        ├── modules/
        │   ├── auth/
        │   ├── user/
        │   ├── skill/
        │   ├── exchange/
        │   ├── reviews/
        │   ├── notification/
        │   └── health/
        ├── routes/
        ├── shared/
        ├── types/
        ├── app.ts
        └── server.ts
```

---

# API Modules

* Authentication
* Users
* Skills
* Skill Exchange
* Reviews
* Notifications
* Health

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/ksatyamkumar/skillSwap.git
```

Navigate to the project

```bash
cd skillswap
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

# Available Scripts

Start development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Start production server

```bash
npm start
```

Run tests

```bash
npm test
```

---

# Health Check

Health endpoint

```http
GET /api/v1/health
```

Example response

```json
{
  "success": true,
  "status": "UP",
  "timestamp": "2026-07-30T18:15:30.000Z",
  "uptime": 1234.56
}
```

---

# Security

The application includes several production-ready security features.

* JWT Authentication
* Password Hashing
* Helmet
* Rate Limiting
* HPP Protection
* Compression
* Request Logging
* Centralized Error Handling
* Input Validation

---

# Error Handling

Centralized error handling supports:

* Custom Application Errors
* Validation Errors
* MongoDB Errors
* Invalid ObjectId Handling
* Unknown Server Errors

---

# Logging

Logging is implemented using **Pino**.

Features include:

* Structured Logs
* Request Logging
* Error Logging
* Pretty Logs During Development

---

# Development Workflow

Feature development follows a Git branching strategy.

```text
main

├── feature/authentication

├── feature/user-profile

├── feature/skill-module

├── feature/exchange-module

├── feature/reviewsk

├── feature/notifications
```

Each feature is developed independently and merged into `main` after completion.

---

# Future Improvements

The following features are intentionally planned for a later phase of the project:

* React Frontend
* Swagger / OpenAPI Documentation
* Real-time Chat
* WebSockets
* Redis Caching
* Email Verification
* Password Reset
* Analytics Dashboard
* CI/CD Pipeline
* Docker Support
* Kubernetes Deployment

---

# Contributing

Contributions, feature requests, and suggestions are welcome.

Please create a feature branch and open a pull request.

---

# License

This project is licensed under the MIT License.

---

# Author

**Satyam Kumar**

* Full Stack Developer
* MERN Stack
* TypeScript
* Node.js
* React
* MongoDB

---

**If you found this project helpful, consider giving it a ⭐ on GitHub.**
