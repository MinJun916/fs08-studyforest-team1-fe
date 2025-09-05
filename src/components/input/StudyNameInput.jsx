// src/component/input/StudyNameInput.jsx
import React from 'react';
import styles from '@/styles/components/input/Input.module.scss';

const NAME_RE = /^.{2,30}$/; // 최소 2자, 최대 30자(아무 글자)

export default function StudyNameInput({
  label = '스터디 이름',
  placeholder = '스터디 이름을 입력하세요',
  value,
  onChange,
  required = true,
  maxLength = 30,
  helpText = '2~30자',
  id = 'studyName',
}) {
  const isValid = value ? NAME_RE.test(value) : !required;
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
