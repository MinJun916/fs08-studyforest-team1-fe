import "./Header.scss";

// Vite 파일 URL import
import gong from "../assets/brand-marks/brand-gong.svg";
import bu   from "../assets/brand-marks/brand-bu.svg";
import ui   from "../assets/brand-marks/brand-ui.svg";
import sup  from "../assets/brand-marks/brand-sup.svg";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        {/* 브랜드 마크 (공/부/의/숲) */}
        <ul className="brand-marks" aria-label="브랜드 마크">
          <li className="brand-mark">
            <img src={gong} alt="공" width={41} height={44} />
          </li>
          <li className="brand-mark">
            <img src={bu} alt="부" width={42} height={44} />
          </li>
          <li className="brand-mark">
            <img src={ui} alt="의" width={33} height={35} />
          </li>
          <li className="brand-mark">
            <img src={sup} alt="숲" width={57} height={58} />
          </li>
        </ul>

        <button className="cta" type="button" aria-label="스터디 만들기">
          <span>스터디 만들기</span>
        </button>
      </div>
    </header>
  );
}