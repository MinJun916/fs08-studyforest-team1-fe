import styles from '@styles/components/button/ModalSearchButton.module.scss';
import ic_plus from '@assets/icons/ic_plus.svg';

function ModalSearchButton({ onClick }) {
  return (
    <button className={styles.modalSearchButton} onClick={onClick}>
      <img src={ic_plus} alt="검색" />
    </button>
  );
}

export default ModalSearchButton;
