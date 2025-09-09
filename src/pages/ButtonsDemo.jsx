import { useState } from 'react';
import Button from '@/components/button/Button';

// assets
import playPng from '@assets/icons/play.png';
import stopPng from '@assets/icons/stop.png';
import restartPng from '@assets/icons/restart.png';
import pausePng from '@assets/icons/pause.png';

export default function ButtonsDemo() {
  const [restartOn, setRestartOn] = useState(false);
  const [pauseOn, setPauseOn] = useState(false);

  const box = { padding: 24, display: 'grid', gap: 16, maxWidth: 720, margin: '0 auto' };
  const row = { display: 'flex', gap: 12 };

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
          <Button variant="green" size="md" shape="pill">
            오늘의 습관으로 가기
          </Button>
        </div>
        <div style={row}>
          <Button variant="green" size="md" shape="pill">
            오늘의 집중으로 가기
          </Button>
        </div>
        <div style={row}>
          <Button variant="green" size="md" shape="pill">
            수정하러 가기
          </Button>
        </div>
        <div style={row}>
          <Button variant="green" size="md" shape="pill">
            만들기
          </Button>
        </div>
        <div style={row}>
          <Button variant="green" size="md" shape="pill">
            확인
          </Button>
        </div>

        {/* 작은 초록 버튼 */}
        <div style={row}>
          <Button variant="green" size="sm" shape="pill">
            확인
          </Button>
        </div>

        {/* 회색 취소 버튼 */}
        <Button variant="cancel" size="md" shape="pill">
          취소
        </Button>

        {/* 동그란 컨트롤 (토글) */}
        <div style={row}>
          {/* Restart: 기본 #99C08E, 토글 시 #818181 */}
          <Button
            shape="circle"
            circleSize="lg"
            variant="restart"
            toggled={restartOn}
            onClick={() => setRestartOn(!restartOn)}
            aria-label="다시시작"
          >
            <img src={restartPng} alt="" style={{ width: 35.2, height: 35.2, marginTop: '2px' }} />
          </Button>

          {/* Pause: 기본 #578246, 토글 시 #818181 */}
          <Button
            shape="circle"
            circleSize="lg"
            variant="pause"
            toggled={pauseOn}
            onClick={() => setPauseOn(!pauseOn)}
            aria-label="일시정지"
          >
            <img src={pausePng} alt="" style={{ width: 35.2, height: 35.2, marginTop: '2px' }} />
          </Button>
        </div>

        {/* Start / Stop */}
        <h2>Start / Stop</h2>
        <div style={row}>
          {/* Start (초록) */}
          <Button
            variant="green"
            shape="rect"
            leftIcon={<img src={playPng} alt="" style={{ width: 30 }} />}
            width={333}
            textStyle={{
              fontFamily: 'Pretendard, system-ui, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 'normal',
              textShadow: 'none',
            }}
          >
            Start!
          </Button>

          {/* Start (회색 활성) */}
          <Button
            variant="gray"
            shape="rect"
            leftIcon={<img src={playPng} alt="" style={{ width: 30 }} />}
            width={333}
            textStyle={{
              fontFamily: 'Pretendard, system-ui, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 'normal',
              textShadow: 'none',
            }}
          >
            Start!
          </Button>
        </div>

        <div style={row}>
          {/* Stop (큰) */}
          <Button
            variant="green"
            shape="rect"
            leftIcon={<img src={stopPng} alt="" style={{ width: 30 }} />}
            width={333}
            textStyle={{
              fontFamily: 'Pretendard, system-ui, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 'normal',
              textShadow: 'none',
            }}
          >
            Stop!
          </Button>

          {/* Stop (작은) */}
          <Button
            variant="green"
            shape="rect"
            leftIcon={<img src={stopPng} alt="" style={{ width: 24 }} />}
            width={160}
            textStyle={{
              fontFamily: 'Pretendard, system-ui, sans-serif',
              fontSize: 18,
              fontWeight: 800,
              lineHeight: 'normal',
              textShadow: 'none',
            }}
          >
            Stop!
          </Button>
        </div>
      </div>
    </div>
  );
}
