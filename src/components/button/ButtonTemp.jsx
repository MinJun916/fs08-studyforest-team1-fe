import clsx from 'clsx';
import styles from '@styles/components/button/ButtonTemp.module.scss';

export default function Button({
  variant = 'green', // "green" | "gray" | "light-gray" | "cancel"
  size = 'md', // "sm" | "md" | "lg"
  shape = 'pill', // "pill" | "rect" | "circle"
  circleSize = 'md', // "sm" | "md" | "lg" (shape==="circle"일 때만 사용)
  leftIcon, // <img/> 또는 아이콘 컴포넌트
  disabled = false,
  children,

  // 외부에서 덮어쓰고 싶을 때
  className: classNameProp,
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

  return (
    <button type="button" className={className} disabled={disabled} {...rest}>
      <span className={styles.btnInner}>
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <span className={clsx(styles.btnText, textClassName)} style={textStyle}>
          {children}
        </span>
      </span>
    </button>
  );
}
