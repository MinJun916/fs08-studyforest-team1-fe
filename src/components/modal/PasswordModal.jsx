import Popup from '@components/popup/Popup.jsx';
import styles from '@styles/components/modal/PasswordModal.module.scss';
import useWindowSize from '@/hooks/useWindowSize.jsx';

function PasswordModal({ studyName = '스터디 이름', onClose, onClick }) {
  const { isMobile } = useWindowSize();

  if (!isMobile) {
    return (
      <div>
        <Popup>
          <div className={styles.modal}>
            <div className={styles.header}>
              <div className={styles.title}>{studyName}</div>
              <button className={styles.exitBtn} onClick={onClose}>
                나가기
              </button>
            </div>
            <div className={styles.warning}>권한이 필요해요!</div>
            <div className={styles.passwordWrapper}>
              <div className={styles.title}>비밀번호</div>
              <input className={styles.input}></input>
            </div>
            <button className={styles.button} onClick={onClick}>
              수정하러 가기
            </button>
          </div>
        </Popup>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div>
        <Popup>
          <div className={styles.modal}>
            <div className={styles.header}>
              <div className={styles.title}>{studyName}</div>
            </div>
            <div className={styles.warning}>권한이 필요해요!</div>
            <div className={styles.passwordWrapper}>
              <div className={styles.title}>비밀번호</div>
              <input className={styles.input}></input>
            </div>
            <button className={styles.button} onClick={onClick}>
              수정하러 가기
            </button>
            <button className={styles.exitBtnMobile} onClick={onClose}>
              나가기
            </button>
          </div>
        </Popup>
      </div>
    );
  }
}

export default PasswordModal;
