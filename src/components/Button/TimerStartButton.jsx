import { useState } from "react";
import Button from "@/components/Button/button";

/* ▶ 아이콘(인라인 SVG) */
function PlayIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.25" />
      <polygon points="10,8 18,12 10,16" fill="currentColor" />
    </svg>
  );
}

/**
 * 타이머 시작 버튼
 * - 처음엔 초록색
 * - 클릭하면 회색으로 고정(disabled)
 * - onStart() 콜백 제공
 */
export default function TimerStartButton({
  label = "Start!",
  size = "lg",
  width = 333,            // 피그마 샷 참고 사이즈
  onStart,
}) {
  const [started, setStarted] = useState(false);

  const handleClick = () => {
    if (started) return;
    setStarted(true);
    onStart?.();
  };

  return (
    <Button
      variant={started ? "gray" : "green"}
      size={size}
      shape="pill"
      width={width}
      leftIcon={<PlayIcon size={20} />}
      disabled={started}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}