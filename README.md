
# Task Management Dashboard

## Overview

This project is a **Task Management Dashboard** built with **Next.js** that enables users to manage tasks using a **Kanban board** and **task list**. It includes features such as **user authentication** (with JWT), **CRUD operations** for tasks, and a **MongoDB** backend. The UI is built using **Shadcn** for a modern, responsive experience. The app is deployed on **Vercel** for easy access.

### Features

- **User Authentication**: Sign up, log in, and protected routes using JWT tokens.
- **Task Management**: Create, edit, delete, and view tasks.
  - Fields: `Title`, `Description`, `Status` (To Do, In Progress, Completed), `Priority` (Low, Medium, High), `Due Date`.
  - Sortable and filterable by status, priority, and due date.
- **Two Views**:
  1. **Task List Screen**: A table to view and manage tasks with sorting and filtering.
  2. **Kanban Board Screen**: A drag-and-drop board to manage tasks by status.
- **Responsive UI**: Built with Shadcn for a clean and interactive user interface.
- **Backend API**: Node.js + Express for task management and authentication with MongoDB as the database.
- **Deployment**: The app is deployed on **Vercel**.

## Table of Contents

- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Demo

Check out the live demo: [Deployed on Vercel](#)  
_(Link to your Vercel deployment here)_

### Test Credentials
- **Email**: `test@example.com`
- **Password**: `password123`

## Technologies Used

- **Frontend**: Next.js, React, Shadcn
- **State Management**: React Context / Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **UI Components**: Shadcn (for modals, tooltips, forms, etc.)
- **Drag-and-Drop**: `react-beautiful-dnd`
- **Deployment**: Vercel

## Features

### 1. User Authentication
- Sign up, log in, and log out functionality.
- Protected routes for task management.
- JWT-based authentication with password hashing.

### 2. Task Management
- **CRUD operations**: Create, view, update, and delete tasks.
- **Fields**: Title, Description, Status (To Do, In Progress, Completed), Priority (Low, Medium, High), Due Date.
- Sortable and filterable by `status`, `priority`, and `due date`.

### 3. Kanban Board
- **Drag-and-Drop** functionality for moving tasks between statuses.
- Dynamic status updates on task movement.

### 4. Responsive UI
- Built using Shadcn components for a modern and consistent look.
- Fully responsive design optimized for both desktop and mobile devices.

## Setup

To get the app running locally, follow these steps:

### Prerequisites

- **Node.js** (v16.x or above)
- **MongoDB** (Cloud or Local)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-dashboard.git
cd task-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### 5. Deploy to Vercel

Ensure the environment variables are set up in the Vercel dashboard before deploying.

```bash
vercel
```

## Usage

Once the app is running, you can:

1. **Sign Up** or **Log In**.
2. **Create new tasks** using the task form.
3. **Edit or delete tasks** directly from the task list or Kanban board.
4. **Drag and drop tasks** between columns in the Kanban board to update their status.
5. **Filter and sort tasks** by status, priority, or due date.

## API Endpoints

- **POST** `/api/auth/signup`: User signup.
- **POST** `/api/auth/login`: User login.
- **GET** `/api/tasks`: Fetch all tasks.
- **POST** `/api/tasks`: Create a new task.
- **PATCH** `/api/tasks/:id`: Update a task.
- **DELETE** `/api/tasks/:id`: Delete a task.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Open a pull request once your changes are complete.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.