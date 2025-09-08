// src/component/input/Input.jsx
import React from 'react';
import styles from '@/styles/components/input/Input.module.scss';

export default function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  hint,
  required = false,
  inputProps = {},
}) {
  const isEmptyError = required && !value;

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
        // ✅ 이벤트 대신 "값"을 올려보내도록 통일
        onChange={(e) => onChange?.(e.target.value)}
        className={`${styles.input} ${isEmptyError ? styles.errorInput : ''}`}
        placeholder={placeholder}
        aria-invalid={isEmptyError}
        aria-describedby={isEmptyError ? `${name}-error` : undefined}
        required={required}
        {...inputProps}
      />

      {hint && !isEmptyError && <div className={styles.hint}>{hint}</div>}
      {isEmptyError && (
        <div id={`${name}-error`} className={styles.error}>
          *{label}을(를) 입력해주세요
        </div>
      )}
    </div>
  );
}
