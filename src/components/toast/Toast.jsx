import styles from '@styles/components/toast/Toast.module.scss';

function Toast({ type = 'point', point = 50 }) {
  let toastText = '';
  if (type === 'point') {
    toastText = `🎉 ${point}포인트를 획득했습니다!`;
  }
  if (type === 'warning') {
    toastText = `🚨 집중이 중단되었습니다.`;
  }

  return (
    <div className={`${styles.toast} ${styles[`toast_${type}`]}`}>
      <div className={styles[`text_${type}`]}>{toastText}</div>
    </div>
  );
}

export default Toast;
