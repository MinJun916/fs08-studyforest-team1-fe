import clsx from "clsx";
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
  variant = "green",      // "green" | "white" | "danger" | "gray"
  size = "md",            // "sm" | "md" | "lg"
  shape = "pill",         // "pill" | "rect" | "circle"
  width,                  // px 숫자
  circleSize = "md",
  leftIcon = null,        // ✅ 아이콘 지원
  disabled = false,
  className,
  ...rest
}) {
  const style = width ? { width } : undefined;

  return (
    <button
      type={type}
      className={clsx(
        styles.btn,
        styles[variant],
        styles[shape],
        styles[`size-${size}`],
        shape === "circle" && styles[`circle-${circleSize}`],
        disabled && styles.isDisabled,
        className
      )}
      style={style}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className={styles.btnInner}>
        {leftIcon ? <span className={styles.iconLeft}>{leftIcon}</span> : null}
        {children}
      </span>
    </button>
  );
}
