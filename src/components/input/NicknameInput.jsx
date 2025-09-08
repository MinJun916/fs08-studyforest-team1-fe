// src/component/input/NicknameInput.jsx
import React, { useState } from 'react';
import styles from '@/styles/components/input/Input.module.scss';

const NICK_RE = /^[A-Za-z0-9가-힣_-]{2,20}$/;

export default function NicknameInput({
  label = '닉네임',
  placeholder = '닉네임을 입력하세요',
  value,
  onChange,
  required = true,
  id = 'nickname',
}) {
  const [touched, setTouched] = useState(false); // 클릭 여부 추적

  const showError = touched && !value; // 클릭했는데 값이 비어있을 때만 에러 표시
  const isValid = value ? NICK_RE.test(value) : !required;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <input
          id={id}
          type="text"
          className={`${styles.input} ${showError ? styles.invalid : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setTouched(true)} // 포커스되면 touched = true
          onBlur={() => setTouched(false)} // 🔹 포커스 해제되면 원래 상태로 복귀
          aria-invalid={!isValid}
          required={required}
        />
      </label>

      {showError && <p className={styles.error}>*닉네임을 입력해주세요.</p>}
    </div>
  );
}
