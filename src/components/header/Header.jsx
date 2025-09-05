import { Link } from 'react-router-dom';
import styles from '@/styles/components/header/Header.module.scss';

import studyForestLogo from '@assets/brand-marks/brand-logo.svg';

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link to="/">
          <img src={studyForestLogo} alt="" className={styles.brandImg} />
        </Link>

        <Link to="/study/new" className={styles.createStudyBtn}>
          <div className={styles.createStudyBtnText}>스터디 만들기</div>
        </Link>
      </div>
    </header>
  );
}
