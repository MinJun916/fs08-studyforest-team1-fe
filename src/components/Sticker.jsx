import {DEFAULT_TONE,STICKER_OFF,STICKER_ON} from "./stickerMap.js";

/**
 * Controlled 토글 버튼
 * @param {boolean} active   - 현재 상태(부모가 관리)
 * @param {(next:boolean)=>void} onToggle - 클릭 시 다음 상태를 부모에 통지
 * @param {string} tone  - 'lime' 같은 키 (색상 변수 대신 "토큰명" 추천)
 */
export default function NewSticker({
   active = false,
   onToggle ,
   tone = DEFAULT_TONE
  }) {

    const stickerColor = tone ? STICKER_ON[tone] : STICKER_ON[DEFAULT_TONE];
    const src = active ? stickerColor : STICKER_OFF;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onToggle?.(!active)}
      style={{ border:0, background:"transparent", cursor:"pointer" }}
    >
      <img src={src} alt={active ? "켜짐" : "꺼짐"} width={36} height={36} />
    </button>
  );


}