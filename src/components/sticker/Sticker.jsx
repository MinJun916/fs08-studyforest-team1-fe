import { useState } from 'react';
import STICKER_OFF from '@assets/icons/stickers/sticker-off.png';
import limePng from '@assets/icons/stickers/sticker-lime.png';
import bluePng from '@assets/icons/stickers/sticker-blue.png';
import pinkPng from '@assets/icons/stickers/sticker-pink.png';
import styles from '@/styles/components/sticker/Sticker.module.scss';

// 매핑 & 기본 톤 (필요하면 바깥에서도 쓰게 named export)
const STICKER_ON = { lime: limePng, blue: bluePng, pink: pinkPng };
const SIZE_MAP = {
  sm: 24,
  md: 36,
  lg: 48,
};
const DEFAULT_COLOR = 'lime';
const DEFAULT_SIZE = 'md';

/**
 * Controlled 토글 버튼
 * @param {boolean} isActive
 * @param {(next:boolean)=>void} onToggle
 * @param {string} color - 'lime' | 'blue' | 'pink'
 * @param {number} size - 아이콘 크기(px)
 * @param {string} onImg  - 개별 커스텀 on 이미지 (옵션)
 * @param {string} offImg - 개별 커스텀 off 이미지 (옵션)
 */

export default function Sticker({
  isActive = false,
  onToggle,
  color = DEFAULT_COLOR,
  onImg = STICKER_ON[color],
  offImg = STICKER_OFF,
  size = DEFAULT_SIZE,
}) {
  // 내부 상태 관리 (props가 전달되지 않았을 때 사용)
  const [internalActive, setInternalActive] = useState(false);

  // onToggle이 없으면 내부 상태 사용
  const currentActive = onToggle ? isActive : internalActive;

  const handleToggle = () => {
    if (onToggle) {
      // 외부에서 상태를 관리하는 경우
      onToggle(!isActive);
    } else {
      // 내부에서 상태를 관리하는 경우
      setInternalActive(!internalActive);
    }
  };

  return (
    <button type="button" className={styles.sticker} onClick={handleToggle}>
      <img
        src={currentActive ? onImg : STICKER_OFF}
        alt="sticker"
        width={SIZE_MAP[size]}
        height={SIZE_MAP[size]}
      />
    </button>
  );
}
