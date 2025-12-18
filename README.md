# 🌍 EchoBin Buddy

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF.svg)](https://vitejs.dev/)

A comprehensive waste management education platform that combines interactive quizzes, community engagement, and AI-powered assistance to promote environmental awareness and sustainable practices.

## ✨ Features

- **🧠 Interactive Quizzes**: Test your knowledge on waste management with engaging quizzes.
- **🤖 AI Assistance**: Get personalized tips and guidance from our AI-powered assistant.
- **🌐 Community Hub**: Share posts, connect with like-minded individuals, and learn from the community.
- **🏆 Leaderboard**: Compete with others and track your progress.
- **🔍 Waste Identification**: Identify different types of waste and learn proper disposal methods.
- **📱 Responsive Design**: Fully responsive web application that works on all devices.
- **🔐 User Authentication**: Secure login and signup with JWT-based authentication.
- **☁️ Cloud Storage**: Image uploads powered by Cloudinary for seamless media sharing.

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building interactive user interfaces
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling for components
- **AOS (Animate On Scroll)** - Library for scroll animations

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **JWT** - JSON Web Tokens for authentication
- **Multer** - Middleware for handling file uploads
- **Cloudinary** - Cloud-based image and video management

## 🚀 Installation

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshdev4/echobin-buddy.git
   cd echobin-buddy
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the application**

   **Start the server:**
   ```bash
   cd server
   npm start
   ```

   **Start the client (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**

   Open your browser and navigate to `http://localhost:5173` (default Vite port)

## 📖 Usage

### For Users
1. **Sign Up/Login**: Create an account or log in to access all features.
2. **Take Quizzes**: Navigate to the Quiz page to test your waste management knowledge.
3. **Explore Community**: View and create posts in the Community section.
4. **Get AI Help**: Use the AI Assist feature for personalized waste management advice.
5. **Check Leaderboard**: See how you rank against other users.
6. **Identify Waste**: Use the Identify tool to learn about different waste types.

### For Developers
- **Development Mode**: Use `npm run dev` in both client and server directories for hot reloading.
- **Build for Production**: Run `npm run build` in the client directory to create optimized production builds.

## 🔌 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Posts
- `GET /api/fetch-posts` - Get all posts
- `POST /api/submit-post` - Create a new post
- `POST /toggleLike/:postId` - Toggle likes for the post

### AI
- `POST /api/analyse-image` - Get AI analyze your image
- `POST /api/ai-chat` - Get AI assist you

### Quizzes
- `GET /api/fetch-quiz/:userId` - Get quiz data

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License

## 🙏 Acknowledgments

- Icons and animations provided by various open-source libraries
- Special thanks to the environmental community for inspiration
- Built with ❤️ for a greener future

---

**Made with passion for environmental sustainability** 🌱
