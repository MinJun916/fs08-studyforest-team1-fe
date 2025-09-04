// src/component/input/StudyNameInput.jsx
import React, { useState } from 'react';
import styles from '@/styles/components/input/Input.module.scss';

const NAME_RE = /^.{2,30}$/; // 최소 2자, 최대 30자(아무 글자)

export default function StudyNameInput({
  label = '스터디 이름',
  placeholder = '스터디 이름을 입력하세요',
  value,
  onChange,
  required = true,
  maxLength = 0,
  helpText = '',
  id = 'studyName',
}) {
  const [touched, setTouched] = useState(false);
  const isValidByRule = value ? NAME_RE.test(value) : !required;

  // 포커스했고 값이 비었을 때만 에러 노출
  const showEmptyError = touched && !value && required;
  const describedBy = helpText ? `${id}-help` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <input
          id={id}
          type="text"
          className={`${styles.input} ${showEmptyError ? styles.invalid : ''}`}
          placeholder={placeholder}
          value={value}
          {...(maxLength > 0 ? { maxLength } : {})}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setTouched(true)}
          onBlur={() => setTouched(false)} // 🔹 blur 시 원래 상태
          aria-invalid={showEmptyError || !isValidByRule}
          aria-describedby={describedBy}
          required={required}
        />
      </label>

      {showEmptyError && <p className={styles.error}>*스터디 이름을 입력해주세요</p>}

      {helpText && (
        <p id={describedBy} className={styles.help}>
          {helpText}
        </p>
      )}

      {maxLength > 0 && (
        <p className={styles.counter}>
          {value?.length ?? 0}/{maxLength}
        </p>
      )}
    </div>
  );
}
