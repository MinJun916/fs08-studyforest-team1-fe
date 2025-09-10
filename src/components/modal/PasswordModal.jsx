import Popup from '@/components/popup/Popup.jsx';
import styles from '@styles/components/modal/PasswordModal.module.scss';
import useWindowSize from '@/hooks/UseWindowSize.jsx';
import Input from '@/components/input/Input.jsx';
import Button from '@/components/button/Button.jsx';

function PasswordModal({ studyName = '스터디 이름', onClose, onClick }) {
  const { isMobile, isTablet, isDesktop } = useWindowSize();

  if (isDesktop || isTablet) {
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
              <Input type="passwordOnly" />
            </div>
            <Button childrenType="modify" onClick={onClick} />
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
              <Input type="passwordOnly" />
            </div>
            <Button childrenType="modify" onClick={onClick} />
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
