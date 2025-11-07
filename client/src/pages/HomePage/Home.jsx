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
        <h1 className={`${styles.sectionHeading} ${styles.problemHeading}`}><span className={styles.headingSpan}>Why </span>is it required?</h1>
        <div className={styles.separater}></div>
        <div className={`${styles.sectionContent}`}>
          <img src="/images/problem.webp" alt="" className={styles.sectionImage} />
          <div className={styles.textArea}>
            <p className={styles.sectionText}>
              Waste management isn’t just about throwing garbage away — it’s about protecting our environment,
              conserving resources, and ensuring a healthy planet for future generations. Every day, millions of tons
              of waste are generated across the world, and a large portion of it ends up in landfills, rivers, and oceans,
              slowly poisoning the air we breathe and the water we drink.
            </p>

            <p className={styles.sectionText}>
              Plastic waste alone takes hundreds of years to decompose, releasing toxic chemicals into the soil and
              harming marine and terrestrial life. Unsegregated waste makes recycling difficult, while open dumping
              and burning contribute to severe air pollution and greenhouse gas emissions.
            </p>

            <p className={styles.sectionText}>
              In India, waste generation has increased exponentially with urbanization and population growth.
              Overflowing landfills and inadequate disposal systems have become a serious public health and
              environmental concern. This isn’t just an issue of cleanliness — it’s about sustainability,
              responsibility, and survival.
            </p>

            <p className={styles.sectionText}>
              Effective waste management empowers communities to recycle, reuse, and reduce. It transforms
              waste into valuable resources, minimizes pollution, and helps build cleaner, greener cities.
              The question is no longer *if* we should act — it’s *how fast* we can.
            </p>

          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.solution}`}>
        <h1 className={`${styles.sectionHeading} ${styles.problemHeading}`}><span className={styles.headingSpan}>What </span>are we proposing?</h1>
        <div className={styles.separater}></div>
        <div className={`${styles.sectionContent}`}>
          <img src="/images/bin.webp" alt="" className={`${styles.sectionImage} ${styles.solutionImage}`} />
          <div className={styles.textArea}>
            <p className={styles.sectionText}>
              Waste management isn’t just about throwing garbage away — it’s about protecting our environment,
              conserving resources, and ensuring a healthy planet for future generations. Every day, millions of tons
              of waste are generated across the world, and a large portion of it ends up in landfills, rivers, and oceans,
              slowly poisoning the air we breathe and the water we drink.
            </p>

            <p className={styles.sectionText}>
              Plastic waste alone takes hundreds of years to decompose, releasing toxic chemicals into the soil and
              harming marine and terrestrial life. Unsegregated waste makes recycling difficult, while open dumping
              and burning contribute to severe air pollution and greenhouse gas emissions.
            </p>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.textArea}>
            <p className={styles.sectionText}>
              Our platform is a one-stop solution for smarter waste management. By combining cutting-edge AI technology with community-driven tools, we make it easy for individuals and organizations to understand, categorize, and manage their waste responsibly. From analyzing the type of garbage in an image to providing tips on disposal and recycling, our website bridges the gap between awareness and action, helping everyone contribute to a cleaner and greener planet.
            </p>

            <p className={styles.sectionText}>
             We tackle the waste problem using a mix of innovation, education, and engagement. Our AI Waste Image Analyzer quickly identifies the type of waste, helping users dispose of it correctly. An AI Chat Assistant answers queries in real-time, giving expert guidance on waste management. Gamification through quizzes encourages learning and makes recycling fun. We also share actionable tips for sorting and reducing waste, while fostering a community where eco-conscious users can connect and collaborate. Together, these solutions create a practical and scalable approach to keeping our environment clean.
            </p>
          </div>
          <img src="/images/ai.webp" alt="" className={`${styles.sectionImage} ${styles.solutionImage}`} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.cleanSection}`}>
        <img src="/images/clean.jpg" className={styles.cleanImage}/>
      </section>
    </div>

  )
}

export default Home