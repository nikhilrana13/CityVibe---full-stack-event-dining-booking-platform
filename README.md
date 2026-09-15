# 🌆 CityVibe – Urban Event & Dining Platform

CityVibe is a full-stack urban discovery platform where users can discover local events, book event tickets, and reserve restaurant tables in their city. The platform provides dedicated dashboards for Users, Organizers, and Admins, creating a complete marketplace similar to **BookMyShow + Zomato**.

---

# 🚀 Highlights

* 🎟️ Event discovery & ticket booking
* 🍽️ Restaurant reservation system
* 🎁 Promotional campaigns & offers
* 💸 Dynamic discount & offer application
* 🔐 Firebase Google Authentication
* 💳 Stripe Checkout & Webhooks (Test Mode)
* 📚 Swagger API Documentation
* 📊 Organizer Analytics Dashboard
* 👑 Admin Verification & Campaign Management
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
* View active promotional offers
* Apply, change, or remove offers during event booking
* Dynamic booking price calculation after applying discounts
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
* Create & manage promotional campaigns
* Configure flat & percentage discounts
* Set minimum order requirements
* Configure usage limits & per-user limits
* Configure campaign start & end dates
* Control campaign visibility on the home page
* Set campaign display priority
* Monitor campaign usage

---

# 🎁 Campaign & Offers System

CityVibe includes a complete promotional campaign system designed to help admins create and manage customer offers.

### Campaign Features

* Flat discount campaigns
* Percentage-based discount campaigns
* Maximum discount limits
* Minimum booking amount
* Per-user usage limits
* Global campaign usage limits
* Campaign start & end dates
* Active / inactive campaign control
* Home-page promotional campaign display
* Campaign display priority

### User Offer Flow

Users can view all currently active offers during the ticket booking process.

```text
Select Tickets
      │
      ▼
View Available Offers
      │
      ▼
Apply Offer
      │
      ▼
Validate Eligibility
      │
      ▼
Calculate Discount
      │
      ▼
Update Final Booking Amount
      │
      ▼
Stripe Checkout
```

Users can also change or remove an applied offer before proceeding to payment.

### Campaign Usage

Campaign usage is recorded only after successful payment confirmation through the Stripe webhook, preventing unsuccessful or abandoned payments from consuming campaign limits.

---

# 💳 Payments

* Stripe Checkout Integration
* Stripe Webhooks
* Secure payment verification
* Automatic booking confirmation
* Campaign-aware checkout pricing
* Campaign usage tracking after successful payment

> **Note:** Stripe Test Mode is used. No real payments are processed.

---

# 🎟️ Ticket Inventory

* Available tickets decrease after successful payment
* Tickets restore automatically after cancellation
* Prevents overbooking
* Pax count based seat calculation
* Event-level seat availability validation
* Inventory deduction handled after successful payment

---

# ⚡ Performance Optimizations

* Pagination
* Filtering
* Sorting
* Optimized MongoDB Aggregation Queries
* Infinite Scroll
* Response Time Logging
* Redis caching for frequently accessed APIs

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

```text
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
* Campaigns & Offers
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
* Stripe Webhook Signature Verification

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

```text
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
