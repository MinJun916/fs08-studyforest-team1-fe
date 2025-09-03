// src/component/popup/popup.jsx
import React, { useEffect, useRef } from "react";
import styles from "./popup.module.scss";

/**
 * 공용 Popup 컴포넌트
 * props
 * - open: boolean (필수)  // true일 때만 표시
 * - variant: 'alert' | 'confirm' (기본: 'alert')
 * - title: string
 * - message: string
 * - confirmText: string (기본: '확인')
 * - cancelText: string (기본: '취소')  // confirm일 때만 노출
 * - onConfirm: () => void
 * - onCancel: () => void
 * - onClose: () => void         // 바깥 클릭, ESC
 * - size: 'md' | 'sm' (기본: 'md')
 */
export default function Popup({
  open,
  variant = "alert",
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  onClose,
  size = "md",
}) {
  const dialogRef = useRef(null);
  const firstBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    // ESC 닫기
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    document.addEventListener("keydown", onKey);
    // 최초 포커스
    setTimeout(() => firstBtnRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isConfirm = variant === "confirm";

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      aria-hidden
    >
      <section
        ref={dialogRef}
        className={`${styles.popup} ${size === "sm" ? styles.sm : styles.md}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-desc"
      >
        {title && (
          <h2 id="popup-title" className={styles.title}>
            {title}
          </h2>
        )}

        {message && (
          <p id="popup-desc" className={styles.message}>
            {message}
          </p>
        )}

        <div className={styles.actions}>
          {isConfirm && (
            <button
              ref={firstBtnRef}
              type="button"
              className={`${styles.btn} ${styles.ghost}`}
              onClick={() => {
                onCancel && onCancel();
                onClose && onClose();
              }}
            >
              {cancelText}
            </button>
          )}

          <button
            ref={!isConfirm ? firstBtnRef : undefined}
            type="button"
            className={`${styles.btn} ${styles.primary}`}
            onClick={() => {
              onConfirm && onConfirm();
              onClose && onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </section>
    </div>
  );
}
