import React from "react";
import styles from "./LongButton.module.scss";

export default function LongButton({
  children = "만들기",
  type = "button",
  size = "lg",        // 'lg' | 'md' | 'sm'
  full = false,       // true면 가로 꽉
  variant = "primary",// 'primary' | 필요시 더 추가
  className = "",
  ...rest
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    full ? styles.full : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={cls} {...rest}>
      <span className={styles.text}>{children}</span>
    </button>
  );
}