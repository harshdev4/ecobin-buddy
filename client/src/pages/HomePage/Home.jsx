import React, { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import { IoChatbubbleOutline, IoCloudUploadOutline } from 'react-icons/io5';

const Home = () => {
  const { images } = useOutletContext();
  const [bgImage, setBgImage] = useState(images[0]);
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