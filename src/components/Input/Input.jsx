// src/component/input/Input.jsx
import React from 'react';
import styles from '@/styles/components/input/Input.module.scss';

/**
 * props
 * - label, name, value, onChange
 * - type?: 'text'|'password'|'search'
 * - placeholder?, error?, hint?
 * - inputProps?: {...} // autoComplete 등 추가 전달용
 */
export default function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  hint,
  required = false, // 🔹 required 기본값 추가
  inputProps = {},
}) {
  const isEmptyError = required && !value; // 🔹 빈 값일 때만 true

  return (
    <div className={styles.row}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${isEmptyError ? styles.errorInput : ''}`} // 🔹 에러 시 스타일 추가
        placeholder={placeholder}
        aria-invalid={isEmptyError}
        aria-describedby={isEmptyError ? `${name}-error` : undefined}
        required={required}
        {...inputProps}
      />

      {hint && !isEmptyError && <div className={styles.hint}>{hint}</div>}

      {/* 🔹 빈 값일 때만 에러 문구 출력 */}
      {isEmptyError && (
        <div id={`${name}-error`} className={styles.error}>
          *{label}을(를) 입력해주세요
        </div>
      )}
    </div>
  );
}
