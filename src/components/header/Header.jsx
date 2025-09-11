import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import studyForestLogo from '@assets/brand-marks/brand-logo.svg';
import styles from '@/styles/components/header/Header.module.scss';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerInner}>
          <Link to="/">
            <img src={studyForestLogo} alt="" className={styles.brandImg} />
          </Link>

          <Link to="/study/new" className={styles.createStudyBtn}>
            <div className={styles.createStudyBtnText}>스터디 만들기</div>
          </Link>
        </div>
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
