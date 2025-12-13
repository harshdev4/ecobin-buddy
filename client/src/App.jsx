import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import { useAuth } from './context/AuthContext.jsx';
import Footer from './components/Footer/Footer.jsx';
import AosConfig from './components/AosConfig/AOSCONFIG.jsx';
import "aos/dist/aos.css";
import Loader from './components/Loader/Loader.jsx';

const App = () => {
  const [images, setImages] = useState(["https://res.cloudinary.com/dpam1gove/image/upload/v1762451421/hero-3_d3jzns.webp", "https://res.cloudinary.com/dpam1gove/image/upload/v1762451420/hero-1_ruwwf1.webp", "https://res.cloudinary.com/dpam1gove/image/upload/v1762451419/hero-2_xvgsq9.jpg"]);

  const { user, loading, urlLocation} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authPages = ["/login", "/sign-up"];
    if (loading) return;

    if (user && authPages.includes(location.pathname)) {
      if (urlLocation.includes('quiz')) navigate(`${urlLocation}/${user.id}`, { replace: true });  
      else navigate(`${urlLocation}`, { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  return (
    <>
      {loading && <Loader></Loader>}
      <Header></Header>
      <AosConfig/>
      <Outlet context={{ images }}></Outlet>
      {location.pathname !== '/ai-chat' && <Footer></Footer>}
    </>
  )
}

export default App
