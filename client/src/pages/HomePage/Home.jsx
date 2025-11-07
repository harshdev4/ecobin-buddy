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
              Our platform is a comprehensive, one-stop solution for smarter and more efficient waste management. Leveraging cutting-edge AI technology alongside community-driven tools, we empower individuals, households, and organizations to take control of their waste in an informed and responsible way. Users can quickly analyze the type of garbage in an image, learn how to categorize it correctly, and get personalized tips on proper disposal and recycling methods. Beyond just providing information, our platform promotes actionable steps, education, and engagement, bridging the gap between awareness and practical implementation.

            </p><p>We believe that small, consistent actions can create a massive positive impact on the environment. By gamifying the learning process through quizzes and interactive challenges, users are encouraged to make sustainable choices fun and habitual. Our AI-powered assistant is available to answer questions, clarify doubts, and provide guidance in real-time, making waste management accessible to everyone. Additionally, our platform fosters a community of eco-conscious individuals who can share insights, tips, and support each other in their sustainability journey. Ultimately, we aim to create a world where responsible waste management becomes second nature, contributing to a cleaner, greener, and healthier planet for future generations.
            </p>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.textArea}>
            <p className={styles.sectionText}>
              We tackle the waste problem using a strategic mix of innovation, education, and community engagement. Our AI Waste Image Analyzer quickly identifies the type of waste, helping users dispose of it accurately and responsibly, reducing contamination in recycling streams. An AI Chat Assistant is available 24/7 to answer questions, clarify doubts, and provide expert guidance on best practices for waste management. Gamification through quizzes and interactive challenges makes learning about recycling and sustainability fun, engaging, and memorable for users of all ages.

            </p><p>In addition, we provide practical tips for sorting, reducing, and repurposing waste, empowering users to make eco-conscious decisions in their daily lives. Our platform also fosters a vibrant community where individuals and organizations can share insights, success stories, and collaborate on local clean-up initiatives. By combining technology, education, and social interaction, we create a scalable and actionable solution that motivates people to adopt sustainable habits consistently. Ultimately, our goal is to transform waste management from a chore into a shared responsibility and an opportunity for positive environmental impact, helping build a cleaner, greener, and healthier planet for everyone.
            </p>
          </div>
          <img src="/images/ai.webp" alt="" className={`${styles.sectionImage} ${styles.solutionImage}`} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.cleanSection}`}>
        <img src="/images/clean.jpg" className={styles.cleanImage} />
      </section>
    </div>

  )
}

export default Home