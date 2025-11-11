import React, { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import { IoChatbubbleOutline, IoCloudUploadOutline } from 'react-icons/io5';
import { FaUpload, FaTag, FaCheck } from "react-icons/fa6";
import { FaBrain, FaRecycle, FaLightbulb } from "react-icons/fa";

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
      <div style={{ padding: '20px 10px' }}>
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

      <section className={`${styles.section} ${styles.problem}`}>
        <h1 className={`${styles.sectionHeading} ${styles.problemHeading}`}><span className={styles.headingSpan}>How </span>EcoBin Buddy AI Works</h1>
        <p className={styles.sectionPara}>Our advance machine learning algorithm analyze your uploaded images to provide instant, accurate waste classification.</p>
        <div className={styles.sectionCards}>
          <div className={`${styles.sectionCard} ${styles.aiWorkingCard}`}>
            <FaUpload className={styles.aiWorkIcon} />
            <h3 className={styles.aiWorkHeading}>1. Upload Image</h3>
            <p className={`${styles.cardText} ${styles.aiWorkingText}`}>Simply upload a photo of your waste item using our intuitive interface.</p>
          </div>
          <div className={`${styles.sectionCard} ${styles.aiWorkingCard}`}>
            <FaBrain className={styles.aiWorkIcon} />
            <h3 className={styles.aiWorkHeading}>2. AI Analysis</h3>
            <p className={`${styles.cardText} ${styles.aiWorkingText}`}>Our AI processes the image using advanced computer vision and machine learning.</p>
          </div>
          <div className={`${styles.sectionCard} ${styles.aiWorkingCard}`}>
            <FaTag className={styles.aiWorkIcon} />
            <h3 className={styles.aiWorkHeading}>3. Get Classification</h3>
            <p className={`${styles.cardText} ${styles.aiWorkingText}`}>Receive instant classification results with disposal instructions and tips.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.liveDemoSection}`}>
        <h1 className={`${styles.sectionHeading} ${styles.problemHeading}`}><span className={styles.headingSpan}>Live </span>Classification Demo</h1>
        <p className={styles.sectionPara}>See our AI in action with real-time waste classification.</p>
        <div className={styles.demoContent}>
          <div className={styles.demoImageDiv}>
            <img src="/images/live-demo.webp" alt="live demo" className={styles.demoImage} />
          </div>

          <div className={styles.demoResultDiv}>
            <div className={styles.resultTop}>
              <FaRecycle className={styles.recycleIcon} />
              <div className={styles.reycleContent}>
                <h3>Recyclable Plastic</h3>
                <p>PET Bottle - Type 1</p>
              </div>
            </div>
            <div className={styles.resultMid}>
              <div className={styles.iconDiv}>
                <FaCheck className={styles.midIcon} />
                <h3 className={`${styles.iconHeading} ${styles.midHeading}`}>Disposal instructions</h3>
              </div>
              <ul className={styles.disposalSteps}>
                <li>Remove cap and label if possible.</li>
                <li>Rinse container thorougly.</li>
                <li>Place it it recycle bin.</li>
              </ul>
            </div>
            <div className={styles.resultBottom}>
              <div className={`${styles.iconDiv} ${styles.bottomIconDiv}`}>
                <FaLightbulb className={styles.bottomIcon} />
                <h3 className={`${styles.iconHeading} ${styles.bottomHeading}`}>Alternate instructions</h3>
              </div>
              <ul className={styles.alternateSteps}>
                <li>Reuse it at home.</li>
                <li>Repurpose for crafts.</li>
                <li>Recycle properly.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.featuresDiv}>
          <div className={styles.resultFeatures}><h3 className={styles.resultFeatureHeading}>95%+</h3><span className={styles.resultFeatureSubHeading}>Classification Accuracy</span></div>
          <div className={styles.resultFeatures}><h3 className={styles.resultFeatureHeading}>50+</h3><span className={styles.resultFeatureSubHeading}>Waste Categories</span></div>
          <div className={styles.resultFeatures}><h3 className={styles.resultFeatureHeading}>24/7</h3><span className={styles.resultFeatureSubHeading}>Available Service</span></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.cleanSection}`}>
        <img src="/images/clean.jpg" className={styles.cleanImage} />
      </section>
    </div>

  )
}

export default Home