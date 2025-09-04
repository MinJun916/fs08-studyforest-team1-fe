// src/component/input/NicknameInput.jsx
import React from 'react';
import styles from '@/styles/components/input/Input.module.scss';

const NICK_RE = /^[A-Za-z0-9가-힣_-]{2,20}$/;

export default function NicknameInput({
  label = '닉네임',
  placeholder = '닉네임을 입력하세요',
  value,
  onChange,
  required = true,
  maxLength = 20,
  helpText = '',
  id = 'nickname',
}) {
  const isValid = value ? NICK_RE.test(value) : !required;
  const describedBy = helpText ? `${id}-help` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <input
          id={id}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange?.(e.target.value)}
          aria-invalid={!isValid}
          aria-describedby={describedBy}
          required={required}
        />
      </label>

      {helpText && (
        <p id={describedBy} className={styles.help}>
          {helpText}
        </p>
      )}
      <p className={styles.counter}>
        {value?.length ?? 0}/{maxLength}
      </p>
    </div>
  );
}
