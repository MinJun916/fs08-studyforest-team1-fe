import Popup from '@/components/popup/Popup.jsx';
import styles from '@styles/components/modal/DeleteConfirmModal.module.scss';
import { useState } from 'react';
import Input from '@/components/input/Input.jsx';
import Button from '@/components/button/Button.jsx';

function DeleteConfirmModal({
  studyName = '스터디 이름',
  onClose,
  onConfirm,
  errorMessage = null,
}) {
  const [passwordValue, setPasswordValue] = useState('');

  const handleConfirm = () => {
    onConfirm(passwordValue);
  };

  const handleCancel = () => {
    setPasswordValue(''); // 비밀번호 입력값 초기화
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Popup>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>{studyName}</div>
          <button className={styles.exitBtn} onClick={handleCancel}>
            나가기
          </button>
        </div>
        <div className={styles.warning}>삭제하시겠습니까?</div>
        <div className={styles.description}>
          스터디를 삭제하면 모든 데이터가 사라집니다.
          <br />
          삭제하려면 비밀번호를 입력해주세요.
        </div>
        <div className={styles.passwordWrapper}>
          <Input
            type="passwordOnly"
            onValueChange={(v) => setPasswordValue(v)}
            onKeyDown={handleKeyDown}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
        <div className={styles.buttonGroup}>
          <Button childrenType="cancel" onClick={handleCancel} />
          <Button childrenType="confirm" onClick={handleConfirm} />
        </div>
      </div>
    </Popup>
  );
}

export default DeleteConfirmModal;
