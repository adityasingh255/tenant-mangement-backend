# Tenant Management System (MERN)

A production-ready Tenant Management Application built with Node.js, Express, MongoDB, and React.

## 🚀 Features
- **JWT Authentication**: Secure login with hashed passwords.
- **Role-Based Management**: CRUD for Roles with assigned permissions.
- **User Management**: CRUD for Users with pagination and fuzzy search.
- **Site Management**: CRUD for various office/tenant locations.
- **Dashboard**: Real-time stats of system entities.
- **Time Zone Integration**: Automatic population of time zones via external API.
- **Premium UI**: Clean, responsive design using Vanilla CSS.

## 🛠️ Stack
- **Backend**: Node.js, Express.js, Mongoose, JWT, Bcrypt, Helmet, Morgan.
- **Frontend**: React (Hooks), Axios, React Router, Lucide Icons.
- **Database**: MongoDB Atlas.

## 📦 Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

**Seed Initial Data:**
```bash
# This creates an admin user (admin@example.com / password123)
node seeder.js -i
```

**Start Backend:**
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:3000`.

## 📖 API Documentation

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/login` | Login user | Public |
| GET | `/api/v1/auth/me` | Get current user | Private |
| GET | `/api/v1/users` | List users (page, search) | Private |
| POST | `/api/v1/users` | Create user | Private |
| GET | `/api/v1/dashboard/stats` | Dashboard summaries | Private |
| GET | `/api/v1/utils/timezones` | Fetch timezones | Public |

## 🚢 Deployment Steps

### Backend (Render/Railway)
1. Push `backend/` to GitHub.
2. Connect repository to Render as a "Web Service".
3. Set Environment Variables in Render dashboard.
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`

### Frontend (Vercel/Netlify)
1. Push `frontend/` to GitHub.
2. Connect to Vercel.
3. Set Framework Preset: "Vite".
4. Set Root Directory: `frontend/`.
5. Set API Proxy or update `baseURL` in `services/api.js` to point to production backend.

## 📄 License
MIT
