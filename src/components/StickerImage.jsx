mport clsx from "clsx";

// stickers 폴더의 sticker-*.png 전부 자동 import
const stickerMap = import.meta.glob("../assets/stickers/sticker-*.png", {
  eager: true,
  import: "default",
});

// "green", "green2" 같은 name을 src로 변환
function resolveSticker(name) {
  return stickerMap[`../assets/stickers/sticker-${name}.png`];
}

export default function StickerImage({
  name = "green",         // 파일명에서 sticker- 뒤에 오는 부분
  size = "md",            // sm | md | lg | number(px)
  className,
  alt = "",               // 장식이면 비워두고, 의미 있으면 텍스트 넣기
  ...rest
}) {
  const px = typeof size === "number"
    ? size
    : { sm: 64, md: 96, lg: 120 }[size] ?? 96;

  // fallback: off → green
  const src = resolveSticker(name) || resolveSticker("off") || resolveSticker("green");

  return (
    <img
      src={src}
      alt={alt}
      draggable="false"
      className={clsx("sticker-img", className)}
      style={{ width: px, height: "auto", verticalAlign: "middle", display: "inline-block" }}
      {...rest}
    />
  );
}