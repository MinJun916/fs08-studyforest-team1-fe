import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import s from '@/styles/components/timer/Timer.module.scss';

const Timer = forwardRef(function Timer(
  {
    allowOvertime = true, // 시간이 지나면 -00:08 등으로 표시
    defaultMinutes = 25, // 입력창 기본값
  },
  ref,
) {
  // UI 단계: setup(입력창) ↔ running(타이머 표시)
  const [started, setStarted] = useState(false);

  // 입력값(분)
  const [minutesInput, setMinutesInput] = useState(defaultMinutes);

  // 타이머 상태
  const [time, setTime] = useState(defaultMinutes * 60 * 1000);
  const [isRunning, _setIsRunning] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);

  // refs
  const isRunningRef = useRef(false);
  const startAtRef = useRef(null);
  const rafRef = useRef(null);
  const durationMsRef = useRef(defaultMinutes * 60 * 1000); // 이번 라운드 총 길이(ms)

  const setIsRunning = (v) => {
    isRunningRef.current = v;
    _setIsRunning(v);
  };

  // 입력값 변경 시, 아직 시작 전이라면 미리보기 시간도 업데이트
  useEffect(() => {
    if (!started) {
      const ms = Math.max(1, Number(minutesInput) || 0) * 60 * 1000;
      durationMsRef.current = ms;
      setTime(ms);
      setIsOvertime(false);
    }
  }, [minutesInput, started]);

  const tick = useCallback(() => {
    if (!isRunningRef.current || !startAtRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const elapsed = Date.now() - startAtRef.current;
    const remain = durationMsRef.current - elapsed;

    setTime(allowOvertime ? remain : Math.max(0, remain));
    setIsOvertime(remain < 0);

    rafRef.current = requestAnimationFrame(tick);
  }, [allowOvertime]);

  const internalStart = () => {
    // 입력값으로 duration 고정 후 시작
    const mins = Math.max(1, Number(minutesInput) || 0);
    durationMsRef.current = mins * 60 * 1000;
    setTime(durationMsRef.current);
    setIsOvertime(false);
    setStarted(true);

    if (isRunningRef.current) return;
    startAtRef.current = Date.now();
    setIsRunning(true);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  const start = useCallback(() => {
    // 외부 ref로 시작 호출 시에도 현재 입력값을 반영
    if (!started) internalStart();
    else {
      if (isRunningRef.current) return;
      startAtRef.current = Date.now() - (durationMsRef.current - Math.max(0, time));
      setIsRunning(true);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    }
  }, [started, time, tick]);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const restart = useCallback(() => {
    // 입력 단계로 되돌림
    pause();
    setStarted(false);
    setIsOvertime(false);
    const ms = Math.max(1, Number(minutesInput) || defaultMinutes) * 60 * 1000;
    durationMsRef.current = ms;
    setTime(ms);
    startAtRef.current = null;
  }, [pause, minutesInput, defaultMinutes]);

  useImperativeHandle(ref, () => ({ start, pause, restart }), [start, pause, restart]);

  // 루프 유지
  useEffect(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [tick]);

  // 포맷
  const absMs = Math.abs(time);
  const mm = String(Math.floor(absMs / 60000)).padStart(2, '0');
  const ss = String(Math.floor((absMs % 60000) / 1000)).padStart(2, '0');
  const formatted = `${isOvertime ? '-' : ''}${mm}:${ss}`;

  const stateClass = isOvertime ? s.overtime : isRunning ? s.running : '';

  // 🔸 시작 전: 입력 폼
  if (!started) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ marginRight: 8 }}>분 설정</label>
          <input
            type="number"
            min={1}
            step={1}
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            style={{ width: 80, textAlign: 'right' }}
          />
        </div>
        <button onClick={internalStart}>Start</button>
      </div>
    );
  }

  // 🔸 시작 후: div 숫자만
  return <div className={`${s.timer} ${stateClass}`}>{formatted}</div>;
});

export default Timer;
