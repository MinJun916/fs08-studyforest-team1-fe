import { Link } from 'react-router-dom';
import styles from '@/styles/components/header/Header.module.scss';

import brandLogo from '@assets/brand-marks/brand-logo.svg';
import makeStudy from '@assets/brand-marks/make-study.svg'; // ← 만든 SVG

export default function Header() {
  return (
    <header className={styles.siteHeader} role="banner">
      <div className={styles.headerInner}>
        <a href="/" className={styles.brand} aria-label="공부의 숲 홈">
          <img src={brandLogo} alt="" className={styles.brandImg} />
        </a>

        {/* 버튼 대신 Link로 교체 */}
        <Link to="/study/new" className={styles.ctaImageBtn} aria-label="스터디 만들기">
          <img src={makeStudy} alt="" draggable="false" />
        </Link>
      </div>
    </header>
  );
}
