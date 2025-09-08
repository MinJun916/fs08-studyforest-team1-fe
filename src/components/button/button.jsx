import clsx from "clsx";
import styles from "../../styles/components/button/button.module.scss";

export default function Button({
  variant = "green",     // "green" | "gray" | (확장 가능)
  size = "md",           // "sm" | "md" | "lg"
  shape = "pill",        // "pill" | "rect" | "circle"
  circleSize = "md",     // "sm" | "md" | "lg" (shape==="circle"일 때만 사용)
  width,                 // 숫자(px) 또는 문자열("100%")
  leftIcon,              // <Icon />
  disabled = false,
  children,

  // ✅ 추가된 props
  className: classNameProp,
  style: styleProp,
  textClassName,
  textStyle,

  ...rest
}) {
  const className = clsx(
    styles.btn,
    styles[variant],                  // .green / .gray 
    styles[`size-${size}`],           // .size-sm / .size-md / .size-lg
    styles[shape],                    // .pill / .rect / .circle
    shape === "circle" && styles[`circle-${circleSize}`],
    disabled && styles.isDisabled,
    classNameProp                     // ✅ 외부 className 병합
  );

  // ✅ style 병합 (width + 외부 styleProp)
  const mergedStyle = {
    ...(width != null ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...styleProp,
  };

  return (
    <button
      type="button"
      className={className}
      style={mergedStyle}
      disabled={disabled}
      {...rest}
    >
      <span className={styles.btnInner}>
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <span
          className={clsx(styles.btnText, textClassName)} // ✅ 텍스트 전용 클래스
          style={textStyle}                               // ✅ 텍스트 전용 style
        >
          {children}
        </span>
      </span>
    </button>
  );
}