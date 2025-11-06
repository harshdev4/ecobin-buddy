import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'

const App = () => {
  const [images, setImages] = useState(["https://res.cloudinary.com/dpam1gove/image/upload/v1762451421/hero-3_d3jzns.webp", "https://res.cloudinary.com/dpam1gove/image/upload/v1762451420/hero-1_ruwwf1.webp", "https://res.cloudinary.com/dpam1gove/image/upload/v1762451419/hero-2_xvgsq9.jpg"]);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  return (
    <>
    <Header></Header>
    <Outlet context={{ images }}></Outlet>
    </>
  )
}

export default App
