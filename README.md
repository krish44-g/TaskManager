# 🌤️ Weather Todo Manager

A beautiful, weather-responsive task management application that adapts its appearance based on real-time weather conditions and time of day. Built with React, Node.js, Express, and MongoDB.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

- **🌈 Dynamic Weather-Based Backgrounds** - UI automatically adapts to current weather conditions (sunny, cloudy, rainy, night)
- **⏰ Real-Time Clock** - Live date and time display
- **🌡️ Temperature Display** - Shows current temperature for your location
- **📋 Task Categorization** - Organize tasks into Work, Upskilling, and Side Quests
- **⏳ Deadline Management** - Set custom deadlines or default to end of day
- **✅ Task Completion Tracking** - Mark tasks as complete with visual feedback
- **💾 Persistent Storage** - All data stored in MongoDB Atlas
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Live Demo

- **Frontend**: https://to-dofrontend-r6ns.onrender.com
- **Backend API**: https://taskmanager-fadf.onrender.com/api

## 🛠️ Tech Stack

### Frontend
- React 18
- CSS3 with dynamic styling
- Open-Meteo Weather API

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

### Deployment
- Frontend: Render (Static Site)
- Backend: Render (Web Service)
- Database: MongoDB Atlas (Free Tier)

## 📁 Project Structure

```
weather-todo-app/
├── backend/
│   ├── models/
│   │   └── Todo.js          # MongoDB Todo schema
│   ├── routes/
│   │   └── todos.js         # API routes for CRUD operations
│   ├── server.js            # Express server setup
│   ├── package.json
│   └── .env                 # Environment variables (not tracked)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Styling
│   │   └── index.js         # React entry point
│   └── package.json
├── .gitignore
└── README.md
```

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/weather-todo-app.git
   cd weather-todo-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Create `.env` file**
   ```bash
   touch .env
   ```

4. **Add environment variables**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. **Start backend server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```
   App runs on `http://localhost:3000`

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| PATCH | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

### Example Request

**Create Todo:**
```json
POST /api/todos
{
  "task": "Complete project documentation",
  "category": "Work",
  "deadline": "2025-10-30T23:59:59.999Z",
  "completed": false
}
```

**Response:**
```json
{
  "_id": "67210abc123def456",
  "task": "Complete project documentation",
  "category": "Work",
  "deadline": "2025-10-30T23:59:59.999Z",
  "completed": false,
  "createdAt": "2025-10-29T10:30:00.000Z"
}
```

## 🎨 Weather Conditions

The app dynamically changes its background based on:

| Condition | Background |
|-----------|------------|
| ☀️ Sunny (Day) | Blue sky gradient |
| ☁️ Cloudy | Gray gradient |
| 🌧️ Rainy | Dark gray gradient |
| 🌙 Night (6PM-6AM) | Purple/indigo gradient |

## 📦 Deployment

### MongoDB Atlas Setup
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create M0 (free) cluster
3. Add database user
4. Whitelist IP: `0.0.0.0/0`
5. Get connection string

### Render Deployment

**Backend:**
1. Create Web Service
2. Set Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add `MONGODB_URI` environment variable

**Frontend:**
1. Create Static Site
2. Set Root Directory: `frontend`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `build`
5. Add `REACT_APP_API_URL` environment variable

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
PORT=5000
```

### Frontend (Render)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🐛 Known Issues

- **Free tier sleep**: Render free tier spins down after 15 minutes of inactivity. First request may take 30-60 seconds.
- **Weather API**: Coordinates are hardcoded to Vijayawada, India. Update in `App.jsx` for different locations.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**
- GitHub: https://github.com/krish44-g
- LinkedIn: https://www.linkedin.com/in/siva-krishna-749b36300/

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo API](https://open-meteo.com/)
- Icons and UI inspiration from modern design trends
- Built with guidance from Claude AI

## 📸 Screenshots

### Sunny Day View
![Sunny](screenshots/sunny.png)

### Night Mode
![Night](screenshots/night.png)

### Rainy Weather
![Rainy](screenshots/rainy.png)

---

⭐ If you found this project helpful, please give it a star!

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Multiple todo lists
- [ ] Task priorities
- [ ] Notifications/reminders
- [ ] Dark mode toggle
- [ ] Export/import todos
- [ ] Task search and filters
- [ ] Mobile app version
- [ ] Collaborative todo lists
- [ ] Task analytics dashboard
