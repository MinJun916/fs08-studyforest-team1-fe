// src/component/modal/PermissionModal.jsx
import React, { useEffect, useState } from 'react';
import Popup from '@components/popup/popup.jsx';
import PasswordInput from '@components/input/PasswordInput.jsx';
import styles from '@/styles/components/modal/PermissionMordal.module.scss';

/**
 * 권한 확인 모달
 * props:
 * - isOpen: boolean           // 모달 열림/닫힘
 * - onClose: () => void       // '나가기' 클릭 또는 바깥 클릭(팝업 지원 시)
 * - onSubmit?: (pw:string) => void  // '수정하러 가기' 제출 시 콜백
 * - initialPassword?: string  // (옵션) 초기값
 */
export default function PermissionModal({ isOpen, onClose, onSubmit, initialPassword = '' }) {
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState('');

  // 모달이 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      setPassword(initialPassword);
      setError('');
    }
  }, [isOpen, initialPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('비밀번호를 입력해 주세요.');
      return;
    }
    setError('');
    if (onSubmit) onSubmit(password);
  };

  // popup.jsx 가 isOpen을 지원하지 않는다면:
  // return !isOpen ? null : ( ...Popup... );
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form
        className={styles.modal}
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="perm-title"
      >
        <header className={styles.header}>
          <h2 id="perm-title" className={styles.title}>
            연우의 개발공장
          </h2>
          <button type="button" className={styles.exitBtn} onClick={onClose} aria-label="나가기">
            나가기
          </button>
        </header>

        <p className={styles.subtitle}>권한이 필요해요!</p>

        <div className={styles.field}>
          <PasswordInput
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={setPassword}
            required
            error={error}
            name="permission_password"
          />
        </div>

        {/* 에러가 PasswordInput 내부에서 보이지 않는 경우 대비 */}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={styles.primary} disabled={!password.trim()}>
          수정하러 가기
        </button>
      </form>
    </Popup>
  );
}
