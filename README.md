🌆 CityVibe – Urban Event & Dining Platform

CityVibe is a full-stack urban discovery platform where users can explore local events, book event tickets, and reserve restaurant tables in their city.

Organizers can create and manage events or restaurant listings through a dedicated organizer dashboard, while administrators verify organizers and manage the platform through an admin dashboard.

The platform integrates secure authentication, Stripe payments, dynamic ticket inventory management, optimized APIs with pagination/filtering/sorting, and a scalable backend fully documented using Swagger.

CityVibe simulates a real-world marketplace similar to a combination of BookMyShow + Zomato, bringing both event discovery and dining reservations into a single platform.

🚀 Highlights

🎟️ Event discovery and ticket booking platform

🍽️ Restaurant reservation system

🔐 Firebase authentication with Google login

💳 Stripe payment integration (Test Mode)

📚 Fully documented REST APIs using Swagger

📊 Organizer analytics dashboard

👑 Admin panel for organizer verification

⚡ APIs with pagination, filtering, and sorting

🔄 Infinite scroll for event and restaurant listings

🎫 Dynamic ticket inventory management

✨ Features:

👤 User Features

🔥 Discover trending events in your city

🔎 Search events and restaurants

🎟️ Book event tickets securely

🍽️ Reserve tables at restaurants

📜 View booking history

❌ Cancel bookings

🔐 Login using Google Authentication

🎤 Organizer Features

📝 Organizer onboarding with verification

🪪 Upload PAN card and bank account details

🎪 Event creation and management

💰 Ticket pricing and seat management

📊 Event booking analytics

📷 QR / Code based ticket verification

📈 Revenue and booking dashboard

🍽️ Restaurant listing and reservation management

🍽️ Dining Features

🏪 Restaurant listing system

🪑 Table reservation functionality

⏰ Available dining time slot system

👥 Guest management

📊 Reservation analytics for restaurant owners

👑 Admin Dashboard

CityVibe includes an Admin Panel to manage the platform and verify organizers.

Admin capabilities

📑 Review organizer onboarding applications

📄 View uploaded documents

PAN card

Business details

Bank account details

✅ Approve or reject organizer accounts

🚫 Ensure only verified organizers can publish events or restaurants

📊 Monitor platform activity

The admin account is created using a seed script to prevent public admin signup.

💳 Payments

CityVibe integrates Stripe Checkout for secure event ticket payments.

Features

🔐 Secure payment processing using Stripe Checkout

🧪 Stripe test mode (demo account) used during development

✅ Automatic booking confirmation after payment

🔔 Stripe Webhooks used to verify payment success

🛡️ Secure backend payment verification

⚠️ Note
This project currently uses Stripe test environment, so no real payments are processed.

🎟️ Ticket Inventory Management

CityVibe includes a dynamic ticket inventory system.

Key behavior

📉 Available tickets decrease when a booking is made

🔄 When a booking is cancelled, tickets are automatically restored

🚫 Prevents overbooking and maintains accurate seat availability

Booking Flow
User books ticket
      │
Available tickets decrease
      │
Booking confirmed
Cancel Booking
User cancels booking
      │
Tickets restored
      │
Available seat count increases
⚡ Performance & Query Optimization

CityVibe APIs are optimized for large datasets and smooth browsing.

Backend API capabilities

📄 Pagination support

🔎 Filtering options

🔃 Sorting functionality

⚡ Optimized MongoDB queries

Example API query:

GET /api/events?page=1&limit=10&sort=latest&city=Delhi
🔄 Infinite Scroll (Frontend)

CityVibe implements infinite scrolling for event and restaurant listings.

Benefits

Loads more results automatically while scrolling

Reduces initial page load time

Improves browsing experience

Uses backend pagination APIs

This creates a browsing experience similar to Instagram, Airbnb, or Zomato.

🧰 Tech Stack
🎨 Frontend

React (Vite)

TailwindCSS

Redux Toolkit

React Router

⚙️ Backend

Node.js

Express.js

MongoDB

Mongoose

🔐 Authentication

Firebase Authentication

Google OAuth

Phone OTP (planned feature)

💳 Payments

Stripe Checkout

Stripe Webhooks

☁️ Storage

Cloudinary (Image Uploads)

📚 API Documentation

All backend APIs are documented using Swagger (OpenAPI).

Swagger provides:

📖 Interactive API documentation

📦 Request and response schema definitions

🧪 API testing through Swagger UI

🔍 Clear endpoint references for developers

🧩 Core API Modules

CityVibe backend exposes REST APIs for the following modules.

🔐 Authentication APIs

Google login

Firebase token verification

User profile update

🎪 Event APIs

Create event

Get event details

Get trending events

Cancel event

Delete event

🎟️ Event Booking APIs

Book event tickets

Create Stripe payment session

Verify event ticket

Cancel booking

View booking history

🍽️ Restaurant APIs

Restaurant listing

Restaurant details

Available dining slots

🪑 Dining Booking APIs

Create reservation

Cancel reservation

View reservation history

Get booking details

🎤 Organizer APIs

Organizer onboarding

Upload verification documents

Update business profile

Dashboard statistics

Event management analytics

Dining management analytics

🔎 Search APIs

Search events

Search restaurants

Trending results

🔒 Security Features

🔑 JWT based authentication

🔐 Firebase ID token verification

🛡️ Organizer authorization middleware

👮 Admin-level organizer verification

🚦 Rate limiting for authentication & booking APIs

✔️ Input validation and API protection

👑 Admin Setup

The admin account is created using a seed script.

Example:

node scripts/createAdmin.js

This script inserts an admin user into the database with permissions required to manage organizers and platform activities.

🚀 Future Improvements

📱 Phone OTP authentication

🤖 Event recommendation system

🔔 Real-time booking notifications

📧 Email notifications for bookings

📊 Advanced analytics dashboard
