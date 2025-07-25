# MENTORSHIP MARCHING PLATFORM

A Hackathon project, developed as part of the requirements for Digital SkillUp Africa (DSA), built and presented by HUNSA SEMAKO SAMUEL.

# MentorMe

**MentorMe** is a full-stack mentorship matching platform designed to connect mentees with mentors based on their skills and goals. It facilitates the entire mentorship journey, from initial requests and profile matching to real-time communication, session scheduling, and goal tracking. The platform also incorporates advanced features like an AI chat assistant and gamification to enhance user engagement.

---

### Live Demo

- **Netlify:** https://dsamentor.netlify.app

### Core Functionality

- **User Roles:** Differentiated experiences for Mentees, Mentors, and Administrators.
- **User Authentication:** Secure registration and login using email/password, Google OAuth, and Facebook OAuth.
- **Dynamic User Profiles:** Comprehensive profiles for all users including name, bio, skills, goals, and an avatar. Profiles can be easily edited.
- **Mentor/Mentee Matching:** Mentees can browse and send mentorship requests to mentors. Mentors can review and accept/reject incoming requests.
- **Session Management:**
  - **Availability Setting:** Mentors can set their weekly availability slots.
  - **Session Booking:** Mentees can book sessions based on mentor availability.
  - **Session List:** Users can view their upcoming and past sessions.
  - **Feedback System:** Mentees can provide ratings and comments for past sessions.
- **Real-time Messaging:** Integrated chat for seamless communication between matched mentees and mentors, including online status indicators.
- **Video Conferencing:** Built-in video call functionality for direct mentor-mentee interactions during scheduled sessions.
- **Goal Tracking:** Mentees can define and manage their personal S.M.A.R.T. (Specific, Measurable, Achievable, Relevant, Time-bound) goals within their mentorships.
- **Notifications:** Real-time notifications for new requests, session bookings, goal completions, and availability updates.

### Advanced Features

- **Admin Dashboard:** Centralized management for administrators to oversee users, mentorship matches, and sessions on the platform.
- **AI Chat Assistant:** An intelligent assistant (powered by Google Gemini and Cohere AI) to help users with goal setting, answering questions about the platform, and analyzing uploaded files.
- **Google Calendar Integration:** Sync mentorship sessions directly with Google Calendar for better scheduling and reminders.

---

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma (for MongoDB)
- **Database:** MongoDB
- **Real-time Communication:** Socket.IO Server
- **Authentication:**
  - JWT (JSON Web Tokens)
  - bcryptjs (password hashing)
  - Passport.js (Google and Facebook OAuth strategies)
  - Express Session, Connect Mongo (for session management)
- **API Rate Limiting:** `express-rate-limit`
- **Environment Variables:** `dotenv`
- **File Uploads:** Multer with Cloudinary Storage
- **Email Service:** Nodemailer
- **AI Integration:** Google Generative AI, Cohere AI
- **Job Scheduling:** `node-cron` for reminders
- **Validation:** `express-validator`

### Frontend

- **Framework:** React.js
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Real-time Communication:** Socket.IO Client
- **Styling:** Tailwind CSS, custom CSS
- **Notifications:** React Hot Toast
- **Calendar:** React Big Calendar, Moment.js
- **Other:** `date-fns` for date manipulation

---d

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
npm install
Build Command: npm run build
Start Command: npm start or npm run dev
```

## 🔧 Frontend Setup

| npm install                  |
| :--------------------------- |
| Build Command: npm run build |
| Start Command: npm run dev   |

## 🔧 Test Data

| 10 Mentee profiles |
| :----------------- |
| 10 Mentor profiles |

## 🔧 Below are the Login information for the profiles of Mentors and Mentees.

| | Login details for 2 mentors

| mentor@gmail.com - MentorMe123 |
| hssamuel2024@gmail.com - MentorMe123 |
| :-------------------------- |
|
Login details for 2 mentees |
mentee@gmail.com - MentorMe123
idarajoy199@gmail.com - MentorMe123
