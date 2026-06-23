# ✈️ Trao AI Travel Planner

AI-powered travel planning application built using Next.js, Node.js, Express.js, MongoDB, JWT Authentication, and Google Gemini AI.

---

## 📌 Project Overview

Trao AI Travel Planner is a full-stack AI-powered web application that helps users generate personalized travel itineraries based on destination, trip duration, budget, and interests.

The main objective of this project was to learn how real-world full-stack applications are built by combining authentication, databases, REST APIs, state management, and Generative AI into a single product.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt

### AI Trip Generation

* Generate personalized travel itineraries
* Destination-based recommendations
* Budget-aware planning
* Interest-based activity suggestions

### Trip Management

* Create and save trips
* View all generated trips
* Detailed trip information page
* Regenerate itinerary days using AI

### Itinerary Management

* Day-wise itinerary view
* Add custom activities
* Delete activities
* Activity cost estimation
* Time-based activity organization

### Hotel Recommendations

* AI-generated hotel suggestions
* Ratings and pricing information

### Packing Checklist

* Categorized packing items
* Mark items as packed/unpacked

### User Experience

* Responsive Design
* Skeleton Loading States
* Toast Notifications
* Smooth Animations
* Modern SaaS-style UI

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Zustand
* Axios
* React Hot Toast
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### AI Integration

* Google Gemini API

---

## 📂 Project Structure

```text
AI-Travell-planner
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── services
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── store
│   │   └── utils
│
└── README.md
```

---

## 📚 What I Learned

This project helped me gain practical experience in:

* Building authentication systems using JWT
* Password hashing with bcrypt
* Designing MongoDB schemas with Mongoose
* Creating REST APIs using Express.js
* Managing frontend state using Zustand
* Implementing protected routes in Next.js
* Integrating AI APIs into applications
* Building responsive user interfaces with Tailwind CSS
* Error handling and debugging
* Organizing large full-stack projects
* Working with environment variables and deployment workflows

One of the biggest lessons from this project was learning how to break down a large application into smaller features and implement them step by step.

---

## ⚡ Challenges Faced

During development, I faced several challenges:

* Setting up authentication between frontend and backend
* Managing protected routes
* Handling AI-generated JSON responses
* Structuring trip and itinerary data models
* Debugging API integration issues
* Creating a responsive and user-friendly interface
* Managing state across multiple pages

These challenges helped improve my debugging, problem-solving, and full-stack development skills.

---

## 🔮 Future Improvements

Planned improvements include:

* AI-enhanced custom activities
* Activity editing functionality
* Feedback-based itinerary regeneration
* Trip sharing feature
* Travel assistant chatbot
* Weather integration
* Maps integration
* Budget tracking dashboard

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Naresh-Jogu/AI-travel-planner.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

```env
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
```

### Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

## 🎯 Project Goal

The goal of this project was to build a real-world full-stack application that combines modern web development technologies with Generative AI while improving my skills as a developer.

---

## 👨‍💻 Author

**Naresh Jogu**

Aspiring Full Stack Developer focused on MERN Stack and Generative AI applications.

**Socials**

Git -> https://github.com/Naresh-Jogu
Linkedin -> https://www.linkedin.com/in/naresh-jogu-mern/
