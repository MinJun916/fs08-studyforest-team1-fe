// src/component/input/PasswordInput.jsx
import React, { useState } from 'react';
import styles from '@/styles/components/input/PasswordInput.module.scss';
import ShowIcon from '@/assets/icons/btn_visibility_off_24px.svg';
import HideIcon from '@/assets/icons/Vector.svg';

export default function PasswordInput({
  label = '비밀번호',
  name = 'password',
  value,
  onChange,
  placeholder = '비밀번호를 입력해 주세요',
  error,
  hint,
  required = false,
  inputProps = {},
}) {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className={styles.row}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrap}>
        <input
          id={name}
          name={name}
          type={showPw ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.invalid : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...inputProps}
        />

        {/* 👁 아이콘 버튼이 input 내부 오른쪽에 들어옴 */}
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setShowPw((s) => !s)}
          aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          <img src={showPw ? HideIcon : ShowIcon} alt="" />
        </button>
      </div>

      {hint && !error && <div className={styles.hint}>{hint}</div>}
      {error && (
        <div id={`${name}-error`} className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
}
