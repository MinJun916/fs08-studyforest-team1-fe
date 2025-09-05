import { useState } from "react";
import Button from "@/components/Button/button";

/** ▶ 아이콘 (버튼 글자색을 따라감) */
function PlayIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** ⏸ 아이콘(회색 상태에서 보여줄 아이콘 – 원하면 바꿔도 됨) */
function PauseIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

/**
 * StartButton (시각 상태만 있음)
 * - 처음엔 초록/▶ 아이콘
 * - 클릭하면 회색/⏸ 아이콘으로 바뀌고 비활성(disabled)
 * - 실제 타이머 로직은 없음(콜백도 선택사항)
 */
export default function StartButton({
  label = "Start",
  size = "lg",
  width = 333,
  onClick, // 옵션: 클릭 시 알림만 받고 싶으면 사용
}) {
  const [started, setStarted] = useState(false);

  const handleClick = (e) => {
    if (started) return;
    setStarted(true);       // 시각 상태만 변경
    onClick?.(e);
  };

  return (
    <Button
      variant={started ? "gray" : "green"}
      size={size}
      shape="pill"
      width={width}
      leftIcon={started ? <PauseIcon /> : <PlayIcon />}
      disabled={started}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}