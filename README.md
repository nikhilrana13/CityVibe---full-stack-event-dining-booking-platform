CityVibe – Urban Event & Dining Platform

CityVibe is a full-stack platform that allows users to discover events, book tickets, and reserve restaurant tables in their city.

Organizers can create and manage events or restaurant listings through a dedicated dashboard, while administrators verify organizers and maintain platform quality.

The platform includes secure authentication, Stripe-based payments, dynamic ticket inventory management, and a scalable REST API fully documented using Swagger.

CityVibe simulates a real-world marketplace similar to a combination of BookMyShow and Zomato, bringing both event discovery and dining reservations into one platform.

Features
User Features

Discover trending events in your city

Search events and restaurants

Book event tickets securely

Reserve tables at restaurants

View booking history

Cancel bookings

Login using Google authentication

Organizer Features

Organizer onboarding with verification

Upload PAN card and bank account details

Event creation and management

Ticket pricing and seat management

Event booking analytics

QR / Code based ticket verification

Revenue and booking dashboard

Restaurant listing and reservation management

Dining Features

Restaurant listing system

Table reservation functionality

Available dining time slot system

Guest management

Reservation analytics for restaurant owners

Admin Dashboard

CityVibe includes an Admin Panel to manage the platform and verify organizers.

Admin capabilities include:

Review organizer onboarding applications

View uploaded documents (PAN card, business details, bank account)

Approve or reject organizer accounts

Ensure only verified organizers can publish events or restaurants

Monitor platform activity

The admin account is created using a seed script to prevent public admin signup.

Payments

CityVibe integrates Stripe Checkout for secure event ticket payments.

Features include:

Secure payment processing using Stripe Checkout

Stripe test mode (demo account) used during development

Automatic booking confirmation after payment

Stripe Webhooks used to verify payment success

Secure backend payment verification

Note:
This project currently uses Stripe test environment, so no real payments are processed.

Ticket Inventory Management

CityVibe includes a dynamic ticket inventory system.

Key behavior:

Available tickets decrease when a booking is made

When a booking is cancelled, tickets are automatically restored

Prevents overbooking and ensures accurate seat availability

Example flow:

Booking tickets

User books ticket
      │
Available tickets decrease
      │
Booking confirmed

Cancel booking

User cancels booking
      │
Tickets restored
      │
Available seat count increases
Tech Stack
Frontend

React (Vite)

TailwindCSS

Redux Toolkit

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

Authentication

Firebase Authentication

Google OAuth

Phone OTP (planned feature)

Payments

Stripe Checkout

Stripe Webhooks

Storage

Cloudinary (Image Uploads)

API Documentation

All backend APIs are documented using Swagger (OpenAPI).

Swagger provides:

Interactive API documentation

Request and response schema definitions

API testing through Swagger UI

Clear endpoint references for developers 
Core API Modules

CityVibe backend exposes REST APIs for the following modules.

Authentication APIs

Google login

Firebase token verification

User profile update

Event APIs

Create event

Get event details

Get trending events

Cancel event

Delete event

Event Booking APIs

Book event tickets

Create Stripe payment session

Verify event ticket

Cancel booking

View booking history

Restaurant APIs

Restaurant listing

Restaurant details

Available dining slots

Dining Booking APIs

Create reservation

Cancel reservation

View reservation history

Get booking details

Organizer APIs

Organizer onboarding

Upload verification documents

Update business profile

Dashboard statistics

Event management analytics

Dining management analytics

Search APIs

Search events

Search restaurants

Trending results

Security Features

JWT based authentication

Firebase ID token verification

Organizer authorization middleware

Admin-level organizer verification

Rate limiting for authentication and booking APIs

Input validation and API protection

Admin Setup

The admin account is created using a seed script.

Example:

node scripts/createAdmin.js

This script inserts an admin user into the database with permissions required to manage organizers and platform activities.

Future Improvements

Phone OTP authentication

Event recommendation system

Real-time booking notifications

Email notifications for bookings

Advanced analytics dashboard
