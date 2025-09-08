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
  error, // 외부에서 넘겨주는 검증 에러(선택)
  hint,
  required = false,
  inputProps = {},
}) {
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState(false);

  // 포커스했고 값이 비었을 때(필수인 경우)에만 비어있음 에러 노출
  const emptyError = required && touched && !value;
  // 외부 error가 있으면 우선 표시, 없고 비어있음이면 해당 문구
  const errorMessage = error || (emptyError ? '비밀번호를 입력해주세요.' : '');
  const hasError = Boolean(errorMessage);

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
          onFocus={() => setTouched(true)}
          onBlur={() => setTouched(false)} // 🔹 blur 시 원래 상태
          placeholder={placeholder}
          className={`${styles.input} ${hasError ? styles.invalid : ''}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...inputProps}
        />

        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setShowPw((s) => !s)}
          aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          <img src={showPw ? HideIcon : ShowIcon} alt="" />
        </button>
      </div>

      {hint && !hasError && <div className={styles.hint}>{hint}</div>}
      {hasError && (
        <div id={`${name}-error`} className={styles.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}
