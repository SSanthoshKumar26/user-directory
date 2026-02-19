# MERN Stack User Management Assessment

A premium, modern Full-Stack User Management application built with the MERN stack, Framer Motion, and Tailwind CSS.

## Features

- **Full CRUD operations**: Create, Read, Update, and Delete users.
- **Advanced Search**: Search users by name or email.
- **Pagination**: Efficiently handle large datasets.
- **CSV Export**: Export user data to a downloadable CSV file.
- **Profile Image Upload**: Support for user profile pictures via Multer.
- **Glassmorphic UI**: High-end SaaS-style design with smooth animations.
- **Responsive Layout**: Works seamlessly on mobile and desktop.

## Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **React Hook Form** (Form Handling)
- **Axios** (API Requests)
- **Lucide React** (Icons)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **Multer** (File Uploads)
- **CSV Writer** (Export functionality)

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (Local or Atlas)

### 1. Clone & Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the Application

From the root directory:
```bash
npm run dev
```
- Frontend will run on `http://localhost:5173`
- Backend will run on `http://localhost:5000`

## Project Structure

```text
frontend/
├── src/
│   ├── components/ (layout, ui, table, forms, animations)
│   ├── pages/      (UsersList, AddUser, EditUser, ViewUser)
│   ├── services/   (API calls)
│   └── styles/     (Global CSS)
backend/
├── src/
│   ├── config/      (DB config)
│   ├── controllers/ (Business logic)
│   ├── models/      (Data models)
│   ├── routes/      (API endpoints)
│   └── services/    (Reusable logic)
```
