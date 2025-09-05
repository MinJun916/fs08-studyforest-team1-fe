import Button from "@/components/Button/button";


export default function ButtonsDemo() {
  const box = { padding: 24, display: "grid", gap: 16, maxWidth: 720, margin: "0 auto" };
  const row = { display: "flex", gap: 12 };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Buttons Demo</h1>

      <div style={box}>
        {/* 긴 초록 버튼들 */}
        <Button variant="green" size="lg" shape="pill" width={600}>
          오늘의 습관으로 가기
        </Button>
        <Button variant="green" size="lg" shape="pill" width={600}>
          오늘의 집중으로 가기
        </Button>
        <Button variant="green" size="lg" shape="pill" width={600}>
          만들기
        </Button>
        <Button variant="green" size="lg" shape="pill" width={600}>
          확인
        </Button>
        <Button variant="green" size="lg" shape="pill" width={600}>
          수정하러 가기
        </Button>

        {/* 중간/작은 사이즈 예시 */}
        <div style={row}>
          <Button variant="green" size="md" shape="pill">오늘의 습관으로 가기</Button>
        </div>
        <div style={row}>
          <Button variant="green" size="sm" shape="pill">수정 완료</Button>
        </div>

        {/* 동그란 컨트롤들 */}
        <div style={row}>
          <Button shape="circle" circleSize="md" aria-label="다시시작">⟳</Button>
          <Button shape="circle" circleSize="md" aria-label="일시정지">⏸</Button>
          <Button shape="circle" circleSize="md" aria-label="정지">■</Button>
        </div>
      </div>
    </div>
  );
}