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
he project will run two servers:

Frontend (React) → http://localhost:5173

Backend (Express / Node) → http://localhost:5001

Make sure both are running in your terminal — one for the client and one for the server.

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
```
createdb eventify_db
psql -U aichurekasylbek -d eventify_db -f eventify_dump_hashed.sql
```
💡 Tip: You can place the dump file inside /server/database/ for easier setup.
This version (eventify_dump_hashed.sql) already includes hashed passwords,
so authentication will work immediately after import.

### 👩‍💻 Test User Accounts

Use these demo credentials to log in and explore the app:

| Role      | Email                                           | Password |
| --------- | ----------------------------------------------- | -------- |
| Organizer | [aya@eventify.com](mailto:aya@eventify.com)     | 123      |
| Attendee  | [sam@eventify.com](mailto:sam@eventify.com)     | 1234      |
| Admin     | [admin@eventify.com](mailto:admin@eventify.com) | 123      |

### Organizer 
login <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 18 57 PM" src="https://github.com/user-attachments/assets/b1f21698-861b-4c1e-8bf3-62c0118c1a08" />
Dashboard <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 20 06 PM" src="https://github.com/user-attachments/assets/1318e87b-ce5b-4843-8dc4-aa6dd901951b" />
Create event <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 20 32 PM" src="https://github.com/user-attachments/assets/39c90caa-ba69-411b-8c10-1d5f1e574ca8" />
Analytics <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 20 32 PM" src="https://github.com/user-attachments/assets/c5853dd9-bedf-4517-8b48-633729380b4e" />
Registartion details <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 20 32 PM" src="https://github.com/user-attachments/assets/3d58cda1-d3e8-46eb-822c-2a9e5632643c" />
### Attendee 
Dashboard <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 23 32 PM" src="https://github.com/user-attachments/assets/aeb7d254-c52e-4870-9d03-5b0bdcbb18a2" />
Resitrations with qr code <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 24 10 PM" src="https://github.com/user-attachments/assets/41d4bfc7-c45b-4f17-abfe-7f0cbc25bdcb" />
### Admin 
Dashboard <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 25 47 PM" src="https://github.com/user-attachments/assets/89209407-557c-4824-b5fd-6a531c31fc2a" />
Events <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 26 18 PM" src="https://github.com/user-attachments/assets/9226dbda-19ae-4b74-a1a8-a28480fa70a1" />
Registrations <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 26 48 PM" src="https://github.com/user-attachments/assets/6b9adb41-4a02-4ead-a296-adf2ba52bac4" />
Analytics <img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 27 21 PM" src="https://github.com/user-attachments/assets/8a1b8d76-a995-492d-ab5f-fe96fb19e85a" />

### Registration page
<img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 28 02 PM" src="https://github.com/user-attachments/assets/9b51dd96-a4df-4a45-8db3-12d7c8ad537a" />
<img width="1440" height="900" alt="Screen Shot 2025-11-03 at 4 28 38 PM" src="https://github.com/user-attachments/assets/6a42322a-66c9-410e-b09d-fca6b2b99d7b" />

## 🔗 API Endpoints (MVP)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/events` | Get all events |
| POST | `/api/events` | Create new event |
| POST | `/api/registrations` | Register for event |

## 🧪 Testing

- Vitest — frontend testing

## 🙌 Acknowledgements

**Developed by Aya Asylbek**  
📍 Sunnyvale, California — 2025  
🎓 Techtonica Graduate Project  
**Full-Stack OOP Event Management Platform**

---

