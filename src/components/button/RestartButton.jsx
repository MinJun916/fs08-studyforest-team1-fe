RestartButton.jsx

import Button from "@/components/button/Button";
import restartPng from "@assets/icons/restart.png";

export default function RestartButton({
  size = "lg",               // "lg" | "md" | "sm"
  defaultActive = false,     // 내부에서 상태 관리
  active,                    // 부모가 제어하고 싶을 때(우선)
  onToggle,                  // 상태 변경 콜백 (true/false)
  disabled = false,
}) {
  const [inner, setInner] = useState(!!defaultActive);
  const isOn = active !== undefined ? active : inner;     // controlled 우선
  const iconSize = size === "lg" ? 24 : size === "md" ? 20 : 16;

  return (
    <Button
      shape="circle"
      circleSize={size}
      variant="restart"
      toggled={isOn}                     // ✅ 토글 상태 전달
      disabled={disabled}
      aria-label="다시시작"
      leftIcon={<img src={restartPng} alt="" style={{ width: iconSize, height: iconSize }} />}
      onClick={() => {
        const next = !isOn;
        setInner(next);
        onToggle?.(next);
      }}
    />
  );
}