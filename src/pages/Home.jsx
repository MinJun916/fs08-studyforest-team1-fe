import { useState } from "react";
import Sticker from "../components/Sticker.jsx";         // 118×64 컨테이너


/* 버튼 스타일 확인하려고 잠시 넣어둔 코드 */ 
export default function Home() {
  const [done, setDone] = useState(false);
  const tones = Array.from({ length: 19 }, (_, i) => `t${String(i + 1).padStart(2, "0")}`);

  return (
    <section style={{ display: "grid", gap: 24 }}>
      
    <div style={{ background:"#fff", padding:16, display:"flex", gap:12, alignItems:"center" }}>
      <Sticker active={done} onToggle={setDone} tone="lime" />
      <span>← 클릭해서 켜고 끄기 (임시로 보여줌)</span>
    </div>
    </section>
  );
}