# Course Portal: A Full-Stack Learning Management System

This project is a comprehensive **Course Portal** (Learning Management System) application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It facilitates a dynamic learning environment where users can register as either students or teachers, each with tailored functionalities. Teachers are empowered to create, manage, and deliver course content, while students can explore, enroll in, and track their progress through various courses.

## Table of Contents

  * Features
  * Technology Stack
  * Installation and Setup
  * Usage
  * Project Structure

## Features

The Course Portal offers a robust set of features designed to provide a seamless learning and teaching experience:

### Authentication & Authorization

  * **Role-Based Access**: Secure user registration and login mechanisms for distinct `student` and `teacher` roles.
  * **Protected Routes**: Implementation of middleware to enforce role-based access control, ensuring users only access authorized sections of the application.

### Course Management (Teacher Dashboard)

  * **Dynamic Course Creation**: Teachers can effortlessly create new courses, defining key attributes such as title, description, pricing, category, and an engaging course thumbnail.
  * **Comprehensive Course Editing**: Full control to modify existing course details, including title, description, price, and category.
  * **Course Archiving/Deletion**: Option to remove courses that are no longer active or relevant.
  * **Structured Content Management**:
      * **Section Management**: Add, modify, and remove sections to organize course content logically.
      * **Lesson Management**: Integrate, edit, and delete individual lessons within sections, supporting video content uploads for rich media experiences.
  * **Teacher Analytics**: Dedicated dashboard providing valuable insights including total courses created, student enrollment count across all courses, and revenue generated, visualized with intuitive charts.

### Course Enrollment & Learning (Student Dashboard & Public Pages)

  * **Course Discovery**: Browse a comprehensive catalog of all available courses, enhanced with search and category filtering capabilities for easy navigation.
  * **Pre-Enrollment Preview**: Access the initial lesson of any course as a preview, allowing potential students to sample content before committing to enrollment.
  * **Seamless Enrollment**: Simple process for students to enroll in desired courses.
  * **Progress Tracking**: Mark lessons as completed to monitor learning progress effectively.
  * **Personalized Learning Dashboard**: Students can view their overall course progress and review completed lessons.
  * **My Courses Overview**: A dedicated section to view all currently enrolled courses.

### General Functionality

  * **Cloud-Based Media Storage**: Utilizes Cloudinary for efficient storage and delivery of all course videos and thumbnail images, ensuring high availability and performance.
  * **Responsive User Interface**: The frontend is meticulously designed to be fully responsive, providing an optimal viewing and interaction experience across a wide range of devices, from desktops to mobile phones.

## Technology Stack

This project leverages a modern and robust technology stack for both its backend API and frontend user interface.

### Backend

  * **Node.js**: Asynchronous event-driven JavaScript runtime environment.
  * **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
  * **MongoDB**: Flexible NoSQL document database.
  * **Mongoose**: Elegant MongoDB object data modeling (ODM) for Node.js.
  * **bcryptjs**: Library for hashing passwords securely.
  * **jsonwebtoken (JWT)**: Compact, URL-safe means of representing claims to be transferred between two parties, used for authentication.
  * **Cloudinary**: Cloud-based service for image and video management.
  * **Multer**: Node.js middleware for handling `multipart/form-data`, primarily used for file uploads.
  * **CORS**: Middleware to enable Cross-Origin Resource Sharing.

### Frontend

  * **React.js**: Declarative, efficient, and flexible JavaScript library for building user interfaces.
  * **Vite**: Next-generation frontend tooling that provides an incredibly fast development experience.
  * **React Router DOM**: Standard library for routing in React applications.
  * **Axios**: Popular promise-based HTTP client for making API requests.
  * **Recharts**: A composable charting library built with React and D3.
  * **Tailwind CSS**: A highly customizable, utility-first CSS framework.
  * **Radix UI**: High-quality, unstyled, and accessible UI components for building design systems.

## Installation and Setup

To get a local copy of the project up and running, follow these steps:

**1. Clone the repository:**

```bash
git clone <repository_url>
cd snkt2024/course-portal/course-portal-982977a893c4485b0a399792ca84acd5a119a4ec
```

**2. Backend Setup:**

Navigate to the `backend` directory:

```bash
cd backend
```

Install the required Node.js dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory. Populate it with your environment variables. **Remember to replace placeholder values with your actual credentials.**

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
```

Start the backend server:

```bash
node server.js
# For development with nodemon (if installed globally or as a dev dependency):
# npm start # Assuming you have a 'start' script in package.json, e.g., "nodemon server.js"
```

The backend API will be accessible at `http://localhost:3000` (or the port specified in your `.env` file).

**3. Frontend Setup:**

Navigate back to the project root and then into the `frontend` directory:

```bash
cd ../frontend
```

Install the required React dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will typically launch in your default web browser at `http://localhost:5173` (Vite's default port, or another available port).

## Usage

Once both the backend and frontend servers are successfully running:

1.  **Access the Application**: Open your web browser and navigate to `http://localhost:5173` (or the port where your frontend is running).
2.  **User Registration**:
      * Navigate to the `/signup` route.
      * Choose your role (`student` or `teacher`) during registration.
3.  **Login**:
      * Use your newly created credentials to log in via the `/login` page.
4.  **Explore Functionalities**:
      * **As a Student**:
          * Access the "My Learning" dashboard to view your enrolled courses and track your progress.
          * Browse the public "Courses" section to discover and enroll in new learning opportunities.
      * **As a Teacher**:
          * Navigate to the "Dashboard" to manage your courses.
          * Add new sections and lessons to your courses, including video content.
          * Monitor student enrollment and revenue statistics.
      * **As a Public User (Logged Out)**:
          * Browse all available courses.
          * Utilize the "Course Preview" feature to watch the first lesson of any course before deciding to enroll.

**Note**: The payment functionality for course enrollment is currently a mock implementation. Real financial transactions are not processed. All video and image uploads are seamlessly handled by Cloudinary.

## Project Structure

The repository is organized into `backend` and `frontend` directories, representing the server-side API and the client-side React application, respectively.

```
.
├── .gitignore
├── backend/
│   ├── src/
│   │   ├── config/             # Cloudinary configuration
│   │   ├── controllers/        # Business logic for API endpoints
│   │   ├── middleware/         # Authentication, role checks, file upload handlers
│   │   ├── models/             # Mongoose schemas (Course, User, Enrollment, Progress, Lesson)
│   │   └── routes/             # Express API routes definition
│   ├── package.json
│   ├── package-lock.json
│   └── server.js               # Main backend server entry point
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.jsx             # Main React application component, handles routing
    │   ├── components/         # Reusable UI components
    │   │   ├── ui/             # Shadcn UI components (buttons, cards, inputs etc.)
    │   │   ├── coursepage/     # Components specific to course playback/details
    │   │   ├── public/         # Components for public-facing sections (e.g., CourseCard)
    │   │   └── teacher/        # Components for teacher dashboard (e.g., RevenueChart)
    │   ├── contexts/           # React Context API for global state management (e.g., AuthContext)
    │   ├── hooks/              # Custom React hooks (e.g., use-mobile for responsiveness)
    │   ├── layout/             # Layout components (Public, Student, Teacher specific layouts)
    │   ├── lib/                # Utility functions (e.g., `cn` for Tailwind class merging)
    │   ├── pages/              # Main application pages (authentication, public, student, teacher views)
    │   ├── services/           # Route protection and redirection logic (e.g., ProtectedRoute)
    │   └── index.css           # Tailwind CSS directives and custom styles
    ├── package.json
    ├── package-lock.json
    ├── README.md               # Frontend-specific README (less detailed)
    └── vite.config.js          # Vite build tool configuration
```
