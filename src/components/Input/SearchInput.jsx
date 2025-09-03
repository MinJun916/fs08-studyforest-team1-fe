// src/component/input/SearchInput.jsx
import React from "react";
import styles from "./Input.module.scss";
// 아이콘 사용 원하면 아래 주석 해제하고 경로 맞춰서 import
// import SearchIcon from "@/assets/icons/Vector.svg";

export default function SearchInput({
  label = "검색",
  placeholder = "검색어를 입력하세요",
  value,
  onChange, // 입력 중 변경 콜백 (string) => void
  onSearch, // 검색 확정 콜백 () => void
  id = "search",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <div className={styles.searchWrap}>
          <input
            id={id}
            type="search"
            className={`${styles.input} ${styles.searchInput}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className={styles.searchBtn}
            aria-label="검색"
            onClick={() => onSearch?.()}
          >
            {/* 아이콘 SVG를 img로 쓰거나 inline-svg로 교체 가능 */}
            {/* <img src={SearchIcon} alt="" aria-hidden="true" /> */}
            🔎
          </button>
        </div>
      </label>
    </div>
  );
}
