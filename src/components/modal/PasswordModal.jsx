import Popup from '@/components/popup/Popup.jsx';
import styles from '@styles/components/modal/PasswordModal.module.scss';
import { useState, useRef } from 'react';
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
  const [showValidation, setShowValidation] = useState(false);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleClose = () => {
    setPasswordValue('');
    setShowValidation(false);
    onClose();
  };

  const handleButtonClick = () => {
    setShowValidation(true);

    // 유효성 검사 실행
    if (inputRef.current) {
      const validation = inputRef.current.validateInput(passwordValue, 'passwordOnly');
      if (!validation.error) {
        onClick(passwordValue);
      }
    } else {
      onClick(passwordValue);
    }
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
            ref={inputRef}
            type="passwordOnly"
            value={passwordValue}
            onValueChange={(v) => setPasswordValue(v)}
            onKeyDown={handleKeyDown}
            showError={showValidation}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
        <Button childrenType={btnType} onClick={handleButtonClick} />
        <button className={styles.exitBtn2} onClick={handleClose}>
          나가기
        </button>
      </div>
    </Popup>
  );
}

export default PasswordModal;
