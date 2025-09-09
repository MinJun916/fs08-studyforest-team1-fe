Pause.jsx


import Button from "@/components/button/Button";
import pausePng from "@assets/icons/pause.png";

export default function PauseButton({
  size = "lg",
  defaultActive = false,
  active,
  onToggle,
  disabled = false,
}) {
  const [inner, setInner] = useState(!!defaultActive);
  const isOn = active !== undefined ? active : inner;
  const iconSize = size === "lg" ? 24 : size === "md" ? 20 : 16;

  return (
    <Button
      shape="circle"
      circleSize={size}
      variant="pause"         // 기본 #578246
      toggled={isOn}          // 눌리면 #818181
      disabled={disabled}
      aria-label="일시정지"
      leftIcon={<img src={pausePng} alt="" style={{ width: iconSize, height: iconSize }} />}
      onClick={() => {
        const next = !isOn;
        setInner(next);
        onToggle?.(next);
      }}
    />
  );
}