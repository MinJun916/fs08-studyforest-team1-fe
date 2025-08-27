import styles from "./Header.module.scss";

import gong from "../assets/brand-marks/brand-gong.svg";
import bu   from "../assets/brand-marks/brand-bu.svg";
import ui   from "../assets/brand-marks/brand-ui.svg";
import sup  from "../assets/brand-marks/brand-sup.svg";

export default function Header() {
  return (
    <header className={styles.siteHeader} role="banner">
      <div className={styles.headerInner}>

        {/* 브랜드 링크로 묶기 */}
        <a href="/" className={styles.brand} aria-label="공부의 숲 홈">
          <ul className={styles.brandMarks}>
            <li className={styles.brandMark}>
              <img src={gong} alt="공" width={41} height={44} />
            </li>
            <li className={styles.brandMark}>
              <img src={bu} alt="부" width={42} height={44} />
            </li>
            <li className={styles.brandMark}>
              <img src={ui} alt="의" width={33} height={35} />
            </li>
            <li className={styles.brandMark}>
              <img src={sup} alt="숲" width={57} height={58} />
            </li>
          </ul>
        </a>

        <button className={styles.cta} type="button" aria-label="스터디 만들기">
          <span>스터디 만들기</span>
        </button>
      </div>
    </header>
  );
}