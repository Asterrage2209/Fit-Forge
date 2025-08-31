# FitForge - Full-Stack Fitness Trainer Web App

Welcome to **FitForge**!  
This is a modern, full-stack web application designed to help users track their fitness journey, discover new workouts, and log their progress.  

The project is a complete web-based transformation of an original Java OOP terminal application, now built with the **MERN stack** (React, Node.js, Express).

---

## ✨ Features

- **Complete User Authentication**: Secure sign-up and sign-in flows.
- **Predefined Workouts**: A comprehensive list of workouts for various fitness goals (Weight Loss, Powerlifting, etc.), sourced from the original Java project.
- **Custom Workout Builder**: Users can create their own workout plans.
- **Session Logging**: Ability to log sets, reps, and track progress over time.
- **Responsive Design**: A beautiful and intuitive user interface that works on all devices.
- **Light & Dark Theme**: A theme toggle in the navbar to switch between light and dark modes, with the user's preference saved locally.
- **Contact Form**: A functional contact form that sends messages to the backend.

---

## 🛠️ Tech Stack

This project is a **monorepo** containing two main packages:

### Frontend
- React (v18) with TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- React Router for page navigation
- Lucide React for icons

### Backend
- Node.js
- Express for the REST API
- TypeScript with ts-node for development
- cors for handling cross-origin requests

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally for development.

### 1. Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or newer is recommended)
- npm (comes with Node.js)
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/fitforge-app.git
cd fitforge-app
```

### 3. Environment Variables

The backend server may use environment variables for configuration (e.g., API keys, database URLs).

Navigate to the server directory and create your `.env` file:

```bash
# In the /server directory
cp .env.example .env
```

Fill in any required values in the new `.env` file as needed.  
For now, the defaults are fine.

### 4. Install Dependencies

This project is a monorepo. Dependencies need to be installed for the client, the server, and the root directory.

```bash
# Install Backend Dependencies
cd server
npm install
cd ..

# Install Frontend Dependencies
cd client
npm install
cd ..

# Install Root Dependencies
npm install
```

This multi-step process ensures all `node_modules` are installed correctly.

### 5. Run the Application

Once dependencies are installed, start the application with:

```bash
npm run dev
```

This command uses **concurrently** to start both the backend and frontend development servers at the same time.

- React Frontend → [http://localhost:5173](http://localhost:5173)  
- Node.js Backend → [http://localhost:3001](http://localhost:3001)  

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the app live!

---

## 📜 Available Scripts

```bash
npm run dev         # Starts both the client and server development servers
npm run dev:client  # Starts only the client (Vite) development server
npm run dev:server  # Starts only the backend (Nodemon) development server
```

---

## 🤝 Contributing

Contributions are welcome! 🎉  
If you have suggestions for improvements or want to add new features, please feel free to **fork the repository** and submit a **pull request**.

---
