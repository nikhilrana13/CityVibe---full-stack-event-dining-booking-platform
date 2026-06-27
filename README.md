# 🌆 CityVibe – Urban Event & Dining Platform

CityVibe is a full-stack urban discovery platform where users can discover local events, book event tickets, and reserve restaurant tables in their city. The platform provides dedicated dashboards for Users, Organizers, and Admins, creating a complete marketplace similar to **BookMyShow + Zomato**.

---

# 🚀 Highlights

* 🎟️ Event discovery & ticket booking
* 🍽️ Restaurant reservation system
* 🔐 Firebase Google Authentication
* 💳 Stripe Checkout & Webhooks (Test Mode)
* 📚 Swagger API Documentation
* 📊 Organizer Analytics Dashboard
* 👑 Admin Verification Panel
* ⚡ Pagination, Filtering & Sorting
* 🔄 Infinite Scroll
* 🎫 Dynamic Ticket Inventory
* 🐳 Docker & Docker Compose Support
* 🚀 Redis Caching for High-Traffic APIs

---

# ✨ Features

## 👤 User

* Browse trending events
* Search events & restaurants
* Book event tickets
* Reserve restaurant tables
* View & cancel bookings
* Google Authentication

---

## 🎤 Organizer

* Organizer onboarding & verification
* Upload PAN & Bank details
* Create & manage events
* Restaurant management
* Ticket pricing & inventory
* QR / Code ticket verification
* Revenue & booking analytics

---

## 👑 Admin

* Verify organizer applications
* Review uploaded documents
* Approve / Reject organizers
* Monitor platform activities

---

# 💳 Payments

* Stripe Checkout Integration
* Stripe Webhooks
* Secure payment verification
* Automatic booking confirmation

> **Note:** Stripe Test Mode is used. No real payments are processed.

---

# 🎟️ Ticket Inventory

* Available tickets decrease after booking
* Tickets restore automatically after cancellation
* Prevents overbooking

---

# ⚡ Performance Optimizations

* Pagination
* Filtering
* Sorting
* Optimized MongoDB Aggregation Queries
* Infinite Scroll
* Response Time Logging

---

# 🚀 Redis Caching

Redis is used to reduce database load and improve API performance using the **Cache-Aside Pattern**.

### Cached APIs

* 🏠 Home API
* 🔎 Search API
* 🎟️ Event Details API
* 🍽️ Restaurant Details API

### Benefits

* Faster response times
* Reduced MongoDB queries
* Lower server load
* Automatic cache expiration using TTL

Example Flow:

```
Client
   │
Redis Cache
   │
Cache Hit
   ▼
Response (Few ms)

Cache Miss
   ▼
MongoDB
   ▼
Redis Store
   ▼
Response
```

---

# 🧰 Tech Stack

## Frontend

* React (Vite)
* Tailwind CSS
* Redux Toolkit
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis

## Authentication

* Firebase Authentication
* Google OAuth

## Payments

* Stripe Checkout
* Stripe Webhooks

## Storage

* Cloudinary

## Documentation

* Swagger (OpenAPI)

---

# 📚 API Modules

* Authentication
* Events
* Event Booking
* Restaurants
* Dining Booking
* Organizer
* Admin
* Search
* Home

---

# 🔒 Security

* JWT Authentication
* Firebase Token Verification
* Organizer Authorization
* Admin Authorization
* Rate Limiting
* Input Validation

---

# 🐳 Docker Support

CityVibe is fully containerized using Docker & Docker Compose.

### Containers

* ⚙️ Backend API
* 👤 User Frontend
* 🎤 Organizer Dashboard
* 👑 Admin Dashboard
* 🚀 Redis Server

### Run Project

Clone the repository

```bash
git clone <repository-url>
cd cityvibe
```

Create environment files

```
backend/.env
frontend/.env
organizer-frontend/.env
admin-frontend/.env
```

Start all services

```bash
docker compose up --build
```

Run in background

```bash
docker compose up -d
```

Stop services

```bash
docker compose down
```

---

# 🌐 Local Services

| Service             | URL                   |
| ------------------- | --------------------- |
| Backend API         | http://localhost:3000 |
| User Frontend       | http://localhost:5173 |
| Organizer Dashboard | http://localhost:5174 |
| Admin Dashboard     | http://localhost:5175 |

---

# 🚀 Future Improvements

* 📱 Phone OTP Authentication
* 🤖 Event Recommendation System
* 🔔 Real-time Notifications
* 📧 Email Notifications
* 📊 Advanced Analytics Dashboard

---

# 🌍 Live Demo

### 👤 User

https://cityvibe-full-stack-event-dining-booking-d2nc.onrender.com

### 🎤 Organizer

https://cityvibe-full-stack-event-dining-booking-ul1e.onrender.com
