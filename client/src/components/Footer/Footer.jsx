import React from "react";
import styles from "./Footer.module.css";
// import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoCloudUploadOutline, IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineQuiz, MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Brand Section */}
        <div className={styles.section}>
          <h2 className={styles.logo}>EcoBin Buddy</h2>
          <p className={styles.text}>
            Making waste sorting simple and
            rewarding for a cleaner planet.
          </p>

          <div className={styles.socials}>
            <Link to="#" className={styles.icon}><IoChatbubbleOutline /></Link>
            <Link to="#" className={styles.icon}><MdOutlineQuiz /></Link>
            <Link to="#" className={styles.icon}><RiUserCommunityLine /></Link>
            <Link to="#" className={styles.icon}><IoCloudUploadOutline /></Link>
            <Link to="#" className={styles.icon}><MdOutlineTipsAndUpdates /></Link>
          </div>
        </div>

        {/* Features */}
        <div className={styles.section}>
          <h3 className={styles.heading}>Features</h3>
          <ul className={styles.list}>
            <li>Waste Classification</li>
            <li>AI chatbox</li>
            <li>Recycling Tips and DIY Ideas</li>
            <li>Eco Quiz</li>
            <li>Community Cleanup</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        © {new Date().getFullYear()} EcoBin Buddy. All rights reserved.
      </div>
    </footer>
  );
}