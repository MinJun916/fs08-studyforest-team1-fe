import Popup from '@/components/popup/Popup.jsx';
import styles from '@styles/components/modal/PasswordModal.module.scss';
import { useState } from 'react';
import Input from '@/components/input/Input.jsx';
import Button from '@/components/button/Button.jsx';

function PasswordModal({
  studyName = '스터디 이름',
  onClose,
  onClick,
  btnType = 'modify',
  errorMessage = null,
  warningText = '권한이 필요해요!',
}) {
  const [passwordValue, setPasswordValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClick(passwordValue);
    }
  };

  const handleClose = () => {
    setPasswordValue('');
    onClose();
  };

  return (
    <Popup>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>{studyName}</div>
          <button className={styles.exitBtn} onClick={handleClose}>
            나가기
          </button>
        </div>
        <div className={styles.warning}>{warningText}</div>
        <div className={styles.passwordWrapper}>
          <Input
            type="passwordOnly"
            value={passwordValue}
            onValueChange={(v) => setPasswordValue(v)}
            onKeyDown={handleKeyDown}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
        <Button childrenType={btnType} onClick={() => onClick(passwordValue)} />
        <button className={styles.exitBtn2} onClick={handleClose}>
          나가기
        </button>
      </div>
    </Popup>
  );
}

export default PasswordModal;
