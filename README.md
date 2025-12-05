<h1 align="center"> AutoRent – MERN Car Rental System</h1>

<p align="center">
  <img src="https://img.shields.io/badge/MERN-FullStack-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge">
  <img src="https://img.shields.io/badge/Frontend-React.js-black?style=for-the-badge">
  <br>
  <img src="https://img.shields.io/badge/Authentication-JWT-orange?style=flat-square">
</p>

---

## 📌 Overview

AutoRent is a **full-stack MERN-based Online Car Rental Application** that enables users to browse cars, filter options, book rentals, cancel bookings, and track their history.  
Admins can manage vehicles, user accounts, and booking statuses — making it powerful and production-ready.

This project demonstrates real-world features like authentication, protected routes, data validation, admin control, and full booking workflow.

---

## Features

### 👤 User Module
- Register & Login (JWT)
- Browse cars with filters
- View car details
- Book car (date selection)
- Cancel booking
- View booking history
- Profile section

### 🔐 Admin Module
- Admin login
- Add / Edit / Delete cars
- Manage availability
- View all users
- View all bookings
- Update booking status

---

##  Tech Stack

| Component | Technology |
|----------|------------|
| Frontend | React.js, Axios, React Router, CSS/Tailwind |
| Backend | Express.js, Node.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT + bcrypt |
| Env | Node + Vite/CRA |
| API Testing | Postman/ThunderClient |

🚀 Fully REST API Based Architecture

---

## 📁 Project Folder Structure

```bash
AutoRent/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    └── App.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
