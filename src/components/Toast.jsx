import { useEffect } from "react";
import styles from "./Toast.module.scss";

/**
 * @typedef {"point"|"warning"} ToastVariant
 * @typedef {"top-right"|"top-left"|"bottom-right"|"bottom-left"|"top-center"|"bottom-center"} Placement
 * @typedef {{ top?: number, right?: number, bottom?: number, left?: number }} Offset
 *
 * @param {Object} props
 * @param {ToastVariant} [props.variant="point"]
 * @param {boolean} [props.isOpen=false]
 * @param {() => void} [props.onClose]
 * @param {number} [props.autoClose=2000]
 * @param {Placement} [props.placement="top-right"]
 * @param {boolean} [props.showClose=false]
 * @param {number} [props.zIndex=1000]
 * @param {Offset}  [props.offset]           // 위치별 여백 (헤더 피할 때)
 * @param {number}  [props.stackGap=8]       // 같은 위치에서 여러 개 쌓일 때 간격
 */
export default function Toast({
  variant = "point",
  isOpen = false,
  onClose,
  autoClose = 2000,
  placement = "top-right",
  showClose = false,
  children,
  zIndex = 1000,
  offset = { top: 20, right: 20, bottom: 20, left: 20 },
  stackGap = 8,
}) {
  useEffect(() => {
    if (!isOpen || !autoClose) return;
    const t = setTimeout(() => onClose?.(), autoClose);
    return () => clearTimeout(t);
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const role = variant === "warning" ? "alert" : "status";
  const live = variant === "warning" ? "assertive" : "polite";

  // placement에 맞춰 padding 인라인 적용
  const pad = (side) => (offset?.[side] ?? 20);
  const containerStyle = { zIndex, rowGap: `${stackGap}px` };

  if (placement === "top-right")
    Object.assign(containerStyle, { paddingTop: pad("top"), paddingRight: pad("right") });
  if (placement === "top-left")
    Object.assign(containerStyle, { paddingTop: pad("top"), paddingLeft: pad("left") });
  if (placement === "top-center")
    Object.assign(containerStyle, { paddingTop: pad("top") });
  if (placement === "bottom-right")
    Object.assign(containerStyle, { paddingBottom: pad("bottom"), paddingRight: pad("right") });
  if (placement === "bottom-left")
    Object.assign(containerStyle, { paddingBottom: pad("bottom"), paddingLeft: pad("left") });
  if (placement === "bottom-center")
    Object.assign(containerStyle, { paddingBottom: pad("bottom") });

  return (
    <div className={`${styles.portal} ${styles[placement]}`} style={containerStyle}>
      <div className={`${styles.toast} ${styles[variant]}`} role={role} aria-live={live}>
        <p className={styles.message}>{children}</p>
        {showClose && (
          <button
            type="button"
            className={styles.close}
            aria-label="닫기"
            onClick={() => onClose?.()}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}