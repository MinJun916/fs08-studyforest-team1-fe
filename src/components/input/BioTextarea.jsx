// src/component/input/BioTextarea.jsx
import React, { useState } from 'react';
import styles from '@/styles/components/input/Input.module.scss';

export default function BioTextarea({
  label = '소개글',
  placeholder = '자기소개를 입력하세요',
  value,
  onChange,
  required = false,
  maxLength = 300,
  helpText = '',
  id = 'bio',
  rows = 5,
}) {
  const [touched, setTouched] = useState(false);
  const showError = touched && !value;
  const describedBy = helpText ? `${id}-help` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <textarea
          id={id}
          className={`${styles.textarea} ${showError ? styles.invalid : ''}`}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setTouched(true)}
          onBlur={() => setTouched(false)} // 🔹 blur 시 원래 상태
          aria-describedby={describedBy}
          required={required}
          rows={rows}
        />
      </label>
    </div>
  );
}
