import styles from '@styles/components/popup/popup.module.scss';

function Popup({ children }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
}

export default Popup;
