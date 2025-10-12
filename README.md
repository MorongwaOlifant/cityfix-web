# CityFix

CityFix is a full-stack web application designed to help citizens report and track city maintenance issues, such as potholes, broken streetlights, or other infrastructure problems. The application consists of a React frontend for user interaction and a Node.js/Express backend with MongoDB for data storage and JWT-based authentication.

## Features

- User registration and authentication
- Issue reporting with location and description
- Issue tracking and status updates
- Secure API with JWT tokens
- Responsive frontend interface

## Project Structure

```
CityFix/
├── client/                 # React frontend application
│   └── src/
│       ├── assets/         # Static assets (images, icons)
│       ├── components/     # Reusable UI components
│       │   ├── common/     # Common components
│       │   ├── layout/     # Layout components
│       │   ├── pages/      # Page components
│       │   └── sections/   # Section components
│       ├── contexts/       # React contexts for state management
│       ├── hooks/          # Custom React hooks
│       ├── routes/         # Application routing
│       ├── services/       # API service functions
│       ├── styles/         # CSS and styling files
│       └── utils/          # Utility functions
├── server/                 # Node.js/Express backend
│   ├── app.js              # Main application file
│   ├── server.js           # Server startup file
│   ├── package.json        # Backend dependencies and scripts
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   └── utils/              # Backend utility functions
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/cityfix
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies (if package.json exists):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3001` (or as configured).

### Running the Application

- Backend: `npm run dev` in server directory
- Frontend: `npm run dev` in client directory

Ensure MongoDB is running and accessible.

## API Endpoints

- `GET /` - Server status
- Additional endpoints for authentication and issue management (to be implemented)

## Technologies Used

- **Frontend:** React, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcryptjs
- **Security:** Helmet, CORS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC