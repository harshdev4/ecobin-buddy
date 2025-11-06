import React, { useRef } from 'react'
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { IoCloudUploadOutline, IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineQuiz, MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const mobileNavRef = useRef(null);

  const toggleMenu = () => {
    const menu = mobileNavRef.current;
    if (menu) {
      menu.classList.toggle(`${styles.toggleMenu}`);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}><Link to='/' ><img src="/images/ecobin-logo.png" alt="Ecobin Logo" className={styles.logo} /></Link></div>
      <nav className={`${styles.navContainer} ${styles.desktopNav}`}>
        <ul className={styles.navUl}>
          <li title='Upload Image' className={`${styles.navLi} ${path == '/analyse-image' && styles.activeLink}`}>
            <Link className={styles.navLink} style={path == '/analyse-image' ? { color: 'white' } : undefined} to="analyse-image">
              <IoCloudUploadOutline className={styles.navIcon} />
              <span>Identify</span>
            </Link>
          </li>

          <li title='Quiz' className={`${styles.navLi} ${path == '/quiz' && styles.activeLink}`}>
            <Link className={styles.navLink} to="quiz" style={path == '/quiz' ? { color: 'white' } : undefined}>
              <MdOutlineQuiz className={styles.navIcon} />
              <span>Quiz</span>
            </Link>
          </li>

          <li title='Tips' className={`${styles.navLi} ${path == '/tips' && styles.activeLink}`}>
            <Link className={styles.navLink} to="tips" style={path == '/tips' ? { color: 'white' } : undefined}>
              <MdOutlineTipsAndUpdates className={styles.navIcon} />
              <span>Tips</span>
            </Link>
          </li>

          <li title='Community' className={`${styles.navLi} ${path == '/community' && styles.activeLink}`}>
            <Link className={styles.navLink} to="community" style={path == '/community' ? { color: 'white' } : undefined}>
              <RiUserCommunityLine className={styles.navIcon} />
              <span>Community</span>
            </Link>
          </li>

          <li title='Chat with AI' className={`${styles.navLi} ${path == '/ai-chat' && styles.activeLink}`}>
            <Link className={styles.navLink} to="ai-chat" style={path == '/ai-chat' ? { color: 'white' } : undefined}>
              <IoChatbubbleOutline className={styles.navIcon} />
              <span>AI Chat</span>
            </Link>
          </li>

          <div className={styles.headerBtnWrapper}>
            <li title='Login' className={`${styles.navLi} ${styles.authLi}`}>
              <Link
                className={`${styles.navLink} ${styles.headerAuthBtn} ${styles.headerLoginBtn}`}
                to="login"
              >
                Login
              </Link>
            </li>

            <li title='Sign Up' className={`${styles.navLi} ${styles.authLi}`}>
              <Link
                className={`${styles.navLink} ${styles.headerAuthBtn} ${styles.headerSignBtn}`}
                to="sign-up"
              >
                Sign Up
              </Link>
            </li>
          </div>

        </ul>
      </nav>
      <RxHamburgerMenu className={styles.menuIcon} onClick={toggleMenu} />
      <nav ref={mobileNavRef} className={`${styles.navContainer} ${styles.mobileNav}`}>
        <IoMdClose className={styles.closeMobileNavIcon} onClick={toggleMenu} />
        <ul className={styles.navUl}>
          <li className={`${styles.navLi} ${path == '/analyse-image' && styles.activeLink}`}>
            <Link className={styles.navLink} style={path == '/analyse-image' ? { color: 'white' } : undefined} to="analyse-image" onClick={toggleMenu}>
              <IoCloudUploadOutline className={styles.navIcon} />
              <span>Identify Waste</span>
            </Link>
          </li>

          <li className={`${styles.navLi} ${path == '/quiz' && styles.activeLink}`}>
            <Link className={styles.navLink} to="quiz" style={path == '/quiz' ? { color: 'white' } : undefined} onClick={toggleMenu}>
              <MdOutlineQuiz className={styles.navIcon} />
              <span>Quiz</span>
            </Link>
          </li>

          <li className={`${styles.navLi} ${path == '/tips' && styles.activeLink}`}>
            <Link className={styles.navLink} to="tips" style={path == '/tips' ? { color: 'white' } : undefined} onClick={toggleMenu}>
              <MdOutlineTipsAndUpdates className={styles.navIcon} />
              <span>Tips</span>
            </Link>
          </li>

          <li className={`${styles.navLi} ${path == '/community' && styles.activeLink}`}>
            <Link className={styles.navLink} to="community" style={path == '/community' ? { color: 'white' } : undefined} onClick={toggleMenu}>
              <RiUserCommunityLine className={styles.navIcon} />
              <span>Community</span>
            </Link>
          </li>

          <li className={`${styles.navLi} ${path == '/ai-chat' && styles.activeLink}`}>
            <Link className={styles.navLink} to="ai-chat" style={path == '/ai-chat' ? { color: 'white' } : undefined} onClick={toggleMenu}>
              <IoChatbubbleOutline className={styles.navIcon} />
              <span>AI Chat</span>
            </Link>
          </li>

          <div className={styles.mobileAuthBtnWrapper}>
            <li className={`${styles.navLi} ${styles.authLi}`}>
              <Link className={`${styles.navLink} ${styles.headerAuthBtn} ${styles.headerLoginBtn}`} to="login" onClick={toggleMenu}>
                Login
              </Link>
            </li>

            <li className={`${styles.navLi} ${styles.authLi}`}>
              <Link className={`${styles.navLink} ${styles.headerAuthBtn} ${styles.headerSignBtn}`} to="sign-up" onClick={toggleMenu}>
                Sign Up
              </Link>
            </li>
          </div>

        </ul>
      </nav>
    </header>
  )
}

export default Header
