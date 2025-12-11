import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/HomePage/Home.jsx'
import Quiz from './pages/QuizPage/Quiz.jsx'
import Identify from './pages/IdentifyPage/Identify.jsx'
import Community from './pages/CommunityPage/Community.jsx'
import Login from './pages/LoginPage/Login.jsx'
import SignUp from './pages/SignUpPage/SignUp.jsx'
import AiAssist from './pages/AiAssistPage/AiAssist.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from 'react-hot-toast'
import LeaderBoard from './pages/LeaderBoardPage/LeaderBoard.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [{
    index: true,
    element: <Home />
  },
  {
    path: 'quiz/:id',
    element: <Quiz />
  },
  {
    path: 'analyse-image',
    element: <Identify />
  },
  {
    path: 'leaderboard',
    element: <LeaderBoard/>
  },
  {
    path: 'community',
    element: <Community />
  },
  {
    path: 'ai-chat',
    element: <AiAssist />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'sign-up',
    element: <SignUp />
  },
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </AuthProvider>
  </StrictMode>,
)
