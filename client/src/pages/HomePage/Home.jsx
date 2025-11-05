import React, { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { IoChatbubbleOutline, IoCloudUploadOutline } from 'react-icons/io5';
import heroImage1 from '/images/hero-1.jpg';
import heroImage2 from '/images/hero-2.jpg';
import heroImage3 from '/images/hero-3.jpg';

const Home = () => {
  const images = [heroImage1, heroImage2, heroImage3];
  const [bgImage, setBgImage] = useState(null);
  const indexRef = useRef(0);
  useEffect(() => {
    const changeBg = setInterval(() => {
      setBgImage(images[indexRef.current])
      if (indexRef.current < 2) {
        indexRef.current++;
      }
      else {
        indexRef.current = 0;
      }
    }, 3000);

    return () => clearInterval(changeBg);
  }, []);

  return (
    <div className={styles.homePage}>
      <div style={{padding: '20px 10px'}}>
        <div
          className={styles.heroContainer}
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h1 className={styles.heroHeading}>The smarter way to clean the planet.</h1>
          <p className={styles.heroSubHeading}>Utilizing AI to make eco-friendly choices easy and scalable.</p>
          <div className={styles.heroBtns}>
            <Link to='/analyse-image' className={`${styles.heroBtnWrapper} ${styles.analyseBtnWrapper}`}>
              <IoCloudUploadOutline className={styles.heroIcon} />
              <button className={`${styles.heroBtn} ${styles.analyseBtn}`}>Analyse Waste</button>
            </Link>
            <Link to='/ai-chat' className={`${styles.heroBtnWrapper} ${styles.aiBtn}`}>
              <IoChatbubbleOutline className={styles.heroIcon} />
              <button className={styles.heroBtn}>AI Chat</button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home