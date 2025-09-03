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
  inputProps = {},
}) {
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
        className={styles.input}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...inputProps}
      />
      {hint && !error && <div className={styles.hint}>{hint}</div>}
      {error && (
        <div id={`${name}-error`} className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
}
