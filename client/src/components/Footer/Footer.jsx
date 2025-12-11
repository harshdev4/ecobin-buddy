import React from "react";
import styles from "./Footer.module.css";
import { IoCloudUploadOutline, IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineLeaderboard, MdOutlineQuiz } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Footer() {
  const {user} = useAuth();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.section}>
          <h2 className={styles.logo}>EcoBin Buddy</h2>
          <p className={styles.text}>
            Making waste sorting simple and
            rewarding for a cleaner planet.
          </p>

          <div className={styles.socials}>
            <Link to="/ai-chat" className={styles.icon}><IoChatbubbleOutline /></Link>
            <Link to={`/quiz/${user?.id}`} className={styles.icon}><MdOutlineQuiz /></Link>
            <Link to="/community" className={styles.icon}><RiUserCommunityLine /></Link>
            <Link to="/analyse-image" className={styles.icon}><IoCloudUploadOutline /></Link>
            <Link to="leaderboard" className={styles.icon}><MdOutlineLeaderboard /></Link>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.heading}>Features</h3>
          <ul className={styles.list}>
            <li>Waste Classification</li>
            <li>AI chatbox</li>
            <li>Recycling Tips and DIY Ideas</li>
            <li>Eco Quiz</li>
            <li>LeaderBoard</li>
            <li>Community Cleanup</li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} EcoBin Buddy. All rights reserved.
      </div>
    </footer>
  );
}