import Button from '@/components/button/button';

export default function ButtonsDemo() {
  const box = { padding: 24, display: 'grid', gap: 16, maxWidth: 720, margin: '0 auto' };
  const row = { display: 'flex', gap: 12 };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Buttons Demo</h1>

      <div style={box}>
        {/* 긴 초록 버튼들 */}
        <Button childrenType="habit" />
        <Button childrenType="focus" />
        <Button childrenType="create" />
        <Button childrenType="confirm" />
        <Button childrenType="modify" />

        {/* 회색 취소 버튼 */}
        <Button childrenType="cancel" />

        {/* 동그란 컨트롤 (토글) */}
        <div style={row}>
          {/* Restart: 기본 #99C08E, 토글 시 #818181 */}
          <Button childrenType="restart" />

          {/* Pause: 기본 #578246, 토글 시 #818181 */}
          <Button childrenType="pause" />
        </div>

        {/* Start / Stop */}
        <h2>Start / Stop</h2>
        <div style={row}>
          {/* Start (초록) */}
          <Button childrenType="start" />

          {/* Start (회색 활성) */}
          <Button childrenType="start" disabled={true} />
        </div>

        <div style={row}>
          {/* Stop (큰) */}
          <Button childrenType="stop" />
        </div>
      </div>
    </div>
  );
}
