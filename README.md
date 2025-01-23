# Punjab University Toto Booking System

## Overview
A full-stack web application for booking toto (shuttle) services within Punjab University, Chandigarh, built using MERN stack and Socket.IO.

## Features
- User Registration & Authentication
- Real-time Toto Availability Tracking
- Booking Management
- Route Visualization
- Live Location Tracking

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Authentication**: JSON Web Tokens (JWT)

## Prerequisites
- Node.js (v16+)
- MongoDB
- npm/yarn

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/ptu-toto-booking.git
cd ptu-toto-booking
```

### 2. Install Dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration
Create `.env` files in backend and frontend directories:

**Backend `.env`**:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend `.env`**:
```
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run Application
```bash
# Start Backend (from backend directory)
npm run start

# Start Frontend (from frontend directory)
npm run start
```

## Deployment
- Backend: Recommended on Render/Heroku
- Frontend: Recommended on Netlify/Vercel
- Database: MongoDB Atlas

## Contributing
1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push to Branch
5. Open Pull Request

## License
MIT License

## Contact
**Project Maintainer**: [Pranav Kumar]
**Email**: contact@example.com
```
