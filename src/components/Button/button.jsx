import styles from "@/styles/components/button/Button.module.scss";

/**
 * 통합 버튼
 * variant: "green" | "white" | "gray" 
 * size: "sm" | "md" | "lg"
 * shape: "pill" | "rect" | "circle"
 * block: true면 width:100%
 * width: 숫자(px) 전달하면 그 너비로 고정 (ex: 600)
 * circleSize: "sm" | "md" | "lg" (shape="circle"일 때 지름)
 */
export default function Button({
  children,
  type = "button",
  variant = "green",
  size = "md",
  shape = "pill",
  circleSize = "md",
  block = false,
  width,                 // ex) 600
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...rest
}) {
  const isCircle = shape === "circle";

  const cls = [
    styles.btn,
    styles[`v-${variant}`],
    isCircle ? styles[`circle-${circleSize}`] : styles[`s-${size}`],
    isCircle ? styles.circle : styles[shape],
    block ? styles.full : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = width ? { width } : undefined;

  return (
    <button
      type={type}
      className={cls}
      style={style}
      disabled={disabled}
      {...rest}
    >
      {!isCircle && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {!isCircle && <span className={styles.label}>{children}</span>}
      {!isCircle && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      {isCircle && <span className={styles.iconOnly}>{children}</span>}
    </button>
  );
}