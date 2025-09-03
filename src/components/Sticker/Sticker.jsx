import offPng from '../assets/icons/stickers/sticker-off.png';
import limePng from '../assets/icons/stickers/sticker-lime.png';
import bluePng from '../assets/icons/stickers/sticker-blue.png';
import pinkPng from '../assets/icons/stickers/sticker-pink.png';

// 매핑 & 기본 톤 (필요하면 바깥에서도 쓰게 named export)
export const STICKER_ON = { lime: limePng, blue: bluePng, pink: pinkPng };
export const STICKER_OFF = offPng;
export const DEFAULT_TONE = 'lime';

/**
 * Controlled 토글 버튼
 * @param {boolean} active
 * @param {(next:boolean)=>void} onToggle
 * @param {string} tone - 'lime' | 'blue' | 'pink'
 * @param {number} size - 아이콘 크기(px)
 * @param {string} onSrc  - 개별 커스텀 on 이미지 (옵션)
 * @param {string} offSrc - 개별 커스텀 off 이미지 (옵션)
 */
export default function Sticker({
  active = false,
  onToggle,
  tone = DEFAULT_TONE,
  size = 36,
  onSrc,
  offSrc,
}) {
  const onImg = onSrc ?? STICKER_ON[tone] ?? STICKER_ON[DEFAULT_TONE];
  const offImg = offSrc ?? STICKER_OFF;
  const src = active ? onImg : offImg;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onToggle?.(!active)}
      style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 0 }}
    >
      <img src={src} alt={active ? '켜짐' : '꺼짐'} width={size} height={size} />
    </button>
  );
}
