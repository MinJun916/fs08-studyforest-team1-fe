import styles from '@styles/components/popup/popup.module.scss';

function Popup({ children }) {
  return (
    <div>
      <div className={styles.overlay}>{children}</div>
    </div>
  );
}

export default Popup;
