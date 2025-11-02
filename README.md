# 🎟️ Eventify — OOP Event Management Platform

Eventify is a full-stack web application that allows event organizers to create, manage, and promote events, while attendees can discover, register, and participate. It demonstrates Object-Oriented Programming (OOP) principles and is built using Node.js, Express, PostgreSQL, and React.

## 📚 Table of Contents

- [About the Project](#-about-the-project)
- [Technology Stack](#-technology-stack)
- [Features (MVP)](#-features-mvp)
- [Database Schema](#-database-schema)
- [Installation & Setup](#-installation--setup)
- [Dump File Instructions](#-dump-file-instructions)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Future Enhancements (Post-MVP)](#-future-enhancements-post-mvp)
- [Acknowledgements](#-acknowledgements)

## 🧠 About the Project

Eventify streamlines the entire event lifecycle — from creation to post-event analytics — for multiple user roles. The system is designed to handle different types of events such as conferences, concerts, workshops, and corporate programs.

- **Organizers** can create and manage events, add details, handle registrations, and analyze results.
- **Attendees** can explore and register for events, manage their tickets, and receive real-time updates.
- **Admins** manage users, roles, and have access to platform analytics.
- **Vendors** (future feature) will provide event-related services through integrated dashboards.

**🎯 Objective:** Build a scalable event management platform that supports different user roles, real-time updates, and analytics — following OOP design and clean architecture principles.

## ⚙️ Technology Stack

### 🖥️ Backend
- **Node.js + Express** — RESTful API
- **PostgreSQL** — relational database
- **pg** — Node PostgreSQL client
- **JWT (JSON Web Token)** — authentication system
- **bcryptjs** — password encryption
- **dotenv** — environment variable management

### 💻 Frontend
- **React + Vite** — modern and fast UI
- **Axios** — API communication
- **Context API** — global authentication and state

### 🧰 Development Tools
- **Nodemon** — auto-restart server
- **Concurrently** — run backend and frontend together
- **Git + GitHub** — version control and deployment

## 🌟 Features (MVP)

### 👥 User Roles
- **Organizer**: Create and manage events
- **Attendee**: Register for events and view tickets
- **Admin**: Manage platform and users

### 🗓️ Event Management
- Full CRUD for events (Create, Read, Update, Delete)
- Add title, description, venue, date, capacity
- Manage event ownership and participation limits

### 🎟️ Registration & Ticketing
- Register users for events
- Ticket confirmation with user-event link
- Waitlist for full-capacity events

### 📊 Analytics (Basic)
- Track number of events and registered users
- Display participation data

## 🧩 Database Schema

### 🧑‍💻 users
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Full name |
| email | VARCHAR(100) | Unique email |
| password | VARCHAR(255) | Encrypted password |
| role | VARCHAR(20) | attendee / organizer / admin |
| created_at | TIMESTAMP | Default now() |

### 🎫 events
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(100) | Event name |
| description | TEXT | Details |
| date | DATE | Event date |
| venue | VARCHAR(255) | Location |
| capacity | INT | Max attendees |
| created_by | INT | FK → users(id) |

### 📝 registrations
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INT | FK → users(id) |
| event_id | INT | FK → events(id) |
| ticket_type | VARCHAR(50) | Regular / VIP |
| created_at | TIMESTAMP | Default now() |

## 🧰 Installation & Setup

### 1️⃣ Clone the Repository
```
git clone https://github.com/aya-asylbek/Eventify.git
cd Eventify
```

### 2️⃣ Install Dependencies
```
npm install
cd server && npm install
cd ../client && npm install
```

### 3️⃣ Create .env in /server

```
PORT=5001
DB_USER=aichurekasylbek
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventify_db
JWT_SECRET=your_super_secret_key_here

```
### 4️⃣ Run the App

```
npm start
```

✅ The backend and frontend will start together using concurrently.

💾 Dump File Instructions
Easily share or restore your PostgreSQL database with a dump file.

### 🔹 Import Database (Restore Dump)
```bash
createdb eventify_db
psql -U aichurekasylbek -d eventify_db -f eventify_dump.sql
```
💡 You can place the dump inside /server/database/ for easy setup.

## 🔗 API Endpoints (MVP)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/events` | Get all events |
| POST | `/api/events` | Create new event |
| POST | `/api/registrations` | Register for event |

## 🧪 Testing

- **Supertest + Jest** — backend endpoint testing (optional)

## 🚀 Future Enhancements (Post-MVP)

These features represent the full project scope required by the Hard Skills assignment:

- **Multi-Role User System**: Support for organizers, attendees, vendors, and administrators, each with specific dashboards and permissions.

- **Event Creation & Management**: Organizers can add rich event details, ticket types, prices, schedules, venues, and speaker/performer management.

- **Registration & Ticketing System**: Attendees can browse and buy tickets with integrated payment processing and receive QR code tickets.

- **Real-Time Event Updates**: Live notifications for schedule or venue changes, plus support for push notifications and email alerts.

- **Check-In & Attendance Tracking**: QR code scanning for entry, real-time attendance monitoring, and automatic waitlist updates.

- **Analytics & Reporting Dashboard**: Comprehensive analytics for organizers including ticket sales, revenue tracking, feedback analysis, and exportable reports.

## 🙌 Acknowledgements

**Developed by Aya Asylbek**  
📍 Sunnyvale, California — 2025  
🎓 Techtonica Graduate Project  
**Full-Stack OOP Event Management Platform**

---

