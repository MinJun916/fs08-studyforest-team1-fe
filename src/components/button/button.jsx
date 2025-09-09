import clsx from 'clsx';
import styles from '@styles/components/button/Button.module.scss';

export default function Button({
  variant = 'green', // "green" | "gray" | "light-gray" | "cancel"
  size = 'md', // "sm" | "md" | "lg"
  shape = 'pill', // "pill" | "rect" | "circle"
  circleSize = 'md', // "sm" | "md" | "lg" (shape==="circle"일 때만 사용)
  width, // 숫자(px) 또는 문자열("100%")
  leftIcon, // <img/> 또는 아이콘 컴포넌트
  disabled = false,
  children,

  // 외부에서 덮어쓰고 싶을 때
  className: classNameProp,
  style: styleProp,
  textClassName,
  textStyle,
  toggled = false,

  ...rest
}) {
  const className = clsx(
    styles.btn,
    styles[variant],
    styles[`size-${size}`],
    styles[shape],
    shape === 'circle' && styles[`circle-${circleSize}`],
    disabled && styles.isDisabled,
    toggled && styles.isToggled,
    classNameProp,
  );

  const mergedStyle = {
    ...(width != null ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...styleProp,
  };

  return (
    <button type="button" className={className} style={mergedStyle} disabled={disabled} {...rest}>
      <span className={styles.btnInner}>
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <span className={clsx(styles.btnText, textClassName)} style={textStyle}>
          {children}
        </span>
      </span>
    </button>
  );
}
