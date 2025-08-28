import { useState } from "react";
import Toast from "../components/Toast";

export default function ToastDemo() {
  const [placement, setPlacement] = useState("top-right");
  const [showPoint, setShowPoint] = useState(false);
  const [showWarn, setShowWarn] = useState(false);

  const placements = ["top-right", "top-left", "top-center", "bottom-right", "bottom-left", "bottom-center"];

  return (
    <section style={{ padding: 16, display: "grid", gap: 16 }}>
      <fieldset style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
        <legend>Placement</legend>
        {placements.map((p) => (
          <label key={p} style={{ marginRight: 12 }}>
            <input
              type="radio"
              name="place"
              value={p}
              checked={placement === p}
              onChange={() => setPlacement(p)}
            />{" "}
            {p}
          </label>
        ))}
      </fieldset>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setShowPoint(true)}>포인트 토스트</button>
        <button onClick={() => setShowWarn(true)}>경고 토스트</button>
      </div>

      <Toast
        variant="point"
        isOpen={showPoint}
        onClose={() => setShowPoint(false)}
        placement={placement}
        autoClose={2000}
        offset={{ bottom: 24, top: 72 }}  // 어느 위치든 기본 여백
      >
        🎉{"\u2009"}50포인트를 획득했습니다!
      </Toast>

      <Toast
        variant="warning"
        isOpen={showWarn}
        onClose={() => setShowWarn(false)}
        placement={placement}
        autoClose={2500}
        offset={{ bottom: 24, top: 72 }}
      >
        🚨{"\u2009"}집중이 중단되었습니다.
      </Toast>
    </section>
  );
}