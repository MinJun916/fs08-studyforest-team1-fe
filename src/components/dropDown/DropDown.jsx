import React, { useEffect, useRef, useState } from 'react';
import styles from '@styles/components/dropDown/DropDown.module.scss';

// 기본 정렬 옵션 매핑 (요청받은 값과 한글 라벨 매핑)
export const SORTOPTIONS = [
  { value: 'newest', label: '최근순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'points_desc', label: '점수높은순' },
  { value: 'points_asc', label: '점수낮은순' },
];

/**
 * DropDown
 * props:
 * - options: [{ value, label }]
 * - value: current value
 * - onChange: fn(value)
 */
export default function DropDown({ options = [], value, onChange = () => {} }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef(null);
  const opts = options && options.length ? options : SORTOPTIONS;

  // 내부 상태: 부모가 value를 넘기지 않을 때(Uncontrolled) 사용
  const [internalValue, setInternalValue] = useState(value ?? 'newest');

  // 부모가 value를 제공하면 internalValue를 동기화
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  useEffect(() => {
    if (open) setHighlight(-1);
  }, [open]);

  function handleToggle(e) {
    e.stopPropagation();
    setOpen((v) => !v);
  }

  function handleSelect(opt) {
    onChange(opt.value);
    // 부모가 value를 제공하지 않으면 내부 상태를 업데이트
    if (value === undefined) setInternalValue(opt.value);
    setOpen(false);
  }

  function onKeyDown(e) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      setHighlight((h) => Math.min(h + 1, opts.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlight >= 0 && highlight < opts.length) handleSelect(opts[highlight]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const selected = opts.find((o) => o.value === (value !== undefined ? value : internalValue));

  return (
    <div className={styles.dropDown} ref={rootRef} onKeyDown={onKeyDown} tabIndex={0}>
      <button
        type="button"
        className={styles.toggle}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.label}>{selected ? selected.label : '최근순'}</span>
        <span className={styles.caret} aria-hidden>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12.0005 14.6538L7.59668 10.25H16.4043L12.0005 14.6538Z" fill="#818181" />
          </svg>
        </span>
      </button>

      {open && (
        <ul className={styles.list} role="listbox">
          {opts.map((opt, idx) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={[
                styles.item,
                value === opt.value ? styles.selected : '',
                highlight === idx ? styles.highlight : '',
              ].join(' ')}
              onClick={() => handleSelect(opt)}
              onMouseEnter={() => setHighlight(idx)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
