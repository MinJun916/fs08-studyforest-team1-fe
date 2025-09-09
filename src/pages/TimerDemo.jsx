import { useRef } from "react";
import Timer from "@/components/timer/Timer";

export default function TimerDemo() {
  const timerRef = useRef(null);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Timer Demo (25분)</h2>
      {/* 25분 = 1500초 */}
      <Timer ref={timerRef} focusMinutes={25} /> 
      <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={() => timerRef.current?.start()}>Start</button>
        <button onClick={() => timerRef.current?.pause()}>Pause</button>
        <button onClick={() => timerRef.current?.restart()}>Restart</button>
      </div>
    </div>
  );
}