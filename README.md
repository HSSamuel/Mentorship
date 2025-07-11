# MentorMe

**MentorMe** is a full-stack web application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **TypeScript**. It's a mentorship platform designed to connect mentors and mentees — making it easier to request, manage, and participate in mentorship, schedule sessions, and communicate in real time.

---

## 🚀 Features

- **User Authentication**  
  Secure user registration and login with email/password and social providers (Google, Facebook).

- **User Roles**  
  Three distinct user roles:

  - `MENTEE`
  - `MENTOR`
  - `ADMIN`  
    Each with specific permissions and functionalities.

- **Profile Management**  
  Users can create and update profiles with bio, skills, and goals.

- **Mentor Search and Filtering**  
  Mentees can search mentors by name or bio and filter by skills.

- **Mentorship Request System**  
  Mentees send mentorship requests; mentors can accept or reject.

- **Session Management**

  - Mentors can set weekly availability.
  - Mentees book sessions with their mentors.
  - Google Calendar integration for session events.
  - Automated email reminders.

- **Real-time Communication**

  - Chat between mentors and mentees.
  - Real-time notifications for important events.

- **Feedback and Reviews**  
  Mentees can rate and review mentors after sessions.

- **AI-Powered Assistant**  
  Helps users with career tasks like writing cover letters or interview preparation.

- **Admin Dashboard**  
  Manage users, mentorships, and view statistics.

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Prisma
- Passport.js
- JWT (JSON Web Tokens)
- Socket.IO
- Cloudinary & Multer (file uploads)
- Nodemailer
- Google Calendar API
- Cohere & Google Generative AI (AI assistant)

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Socket.IO Client
- React Hot Toast (notifications)

---

## 🧰 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or cloud)
- Cloudinary account
- Google Cloud project (Calendar API enabled)
- API keys for Cohere and Google Generative AI

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HSSamuel/mentorship.git

## 🔧 Backend Setup
cd backend
npm install
```
