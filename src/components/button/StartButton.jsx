import Button from "@/components/button/Button";
import playPng from "@assets/icons/play.png";

export default function StartButton({
  active = false,        // true면 회색, false면 초록
  label = "Start!",
  width,
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
}) {
  const variant = active ? "gray" : "green";

  const leftIcon = (
    <img
      src={playPng}
      alt=""
      aria-hidden="true"
      style={{ width: 18, height: "auto", display: "block" }}
      draggable="false"
    />
  );

  return (
    <Button
      variant={variant}
      shape="pill"
      leftIcon={leftIcon}
      width={width}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}