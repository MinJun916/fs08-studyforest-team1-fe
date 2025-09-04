import styles from '@styles/components/header/StudyCreateBtn.module.scss';

export default function StudyCtaButton({
  children = '스터디 만들기',
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.studyBtn} ${className}`}
      aria-label={typeof children === 'string' ? children : '스터디 만들기'}
      {...props}
    >
      <svg className={styles.bg} viewBox="0 0 252 58" preserveAspectRatio="none" aria-hidden="true">
        <rect width="252" height="58" rx="16" fill="#99C08E" />
      </svg>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
