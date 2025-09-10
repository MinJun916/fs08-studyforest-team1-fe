import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import s from '@/styles/components/timer/Timer.module.scss';

const Timer = forwardRef(function Timer(
  {
    allowOvertime = true, // 시간이 지나면 -00:08 등으로 표시
    defaultMinutes = 25, // 기본 시간
    onTimerComplete = null, // 타이머 완료 시 콜백 함수
    onTimerStart = null, // 타이머 시작 시 콜백 함수
    disabled = false, // 타이머 비활성화 상태
  },
  ref,
) {
  // 타이머 상태
  const [time, setTime] = useState(defaultMinutes * 60 * 1000);
  const [isRunning, _setIsRunning] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [minutesInput, setMinutesInput] = useState(defaultMinutes);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0); // 총 경과 시간 (분)

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
    if (!isStarted) {
      // 입력값 검증: 1-99분 범위로 제한
      const validatedMinutes = Math.max(1, Math.min(99, Number(minutesInput) || 1));
      const ms = validatedMinutes * 60 * 1000;
      durationMsRef.current = ms;
      setTime(ms);
      setIsOvertime(false);

      // 입력값이 범위를 벗어나면 자동으로 수정
      if (Number(minutesInput) !== validatedMinutes) {
        setMinutesInput(validatedMinutes);
      }
    }
  }, [minutesInput, isStarted]);

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
    if (disabled) return; // 비활성화 상태면 시작하지 않음

    // 입력값으로 duration 설정 후 시작
    const mins = Math.max(1, Math.min(99, Number(minutesInput) || 1));
    durationMsRef.current = mins * 60 * 1000;
    setTime(durationMsRef.current);
    setIsOvertime(false);
    setIsStarted(true);

    // 타이머 시작 콜백 호출
    if (onTimerStart) {
      onTimerStart(mins);
    }

    if (isRunningRef.current) return;
    startAtRef.current = Date.now();
    setIsRunning(true);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  const start = useCallback(() => {
    if (disabled) return; // 비활성화 상태면 시작하지 않음

    // 외부 ref로 시작 호출 시에도 현재 입력값을 반영
    if (!isStarted) internalStart();
    else {
      if (isRunningRef.current) return;
      startAtRef.current = Date.now() - (durationMsRef.current - Math.max(0, time));
      setIsRunning(true);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    }
  }, [isStarted, time, tick, disabled]);

  const pause = useCallback(() => {
    if (disabled) return; // 비활성화 상태면 일시정지하지 않음
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, [disabled]);

  const restart = useCallback(() => {
    if (disabled) return; // 비활성화 상태면 재시작하지 않음

    // 입력 단계로 되돌림
    pause();
    setIsStarted(false);
    setIsOvertime(false);
    const ms = Math.max(1, Math.min(99, Number(minutesInput) || defaultMinutes)) * 60 * 1000;
    durationMsRef.current = ms;
    setTime(ms);
    startAtRef.current = null;

    // 타이머 재시작 시 설정 시간 초기화 (부모 컴포넌트에서)
    if (onTimerStart) {
      onTimerStart(null);
    }
  }, [pause, minutesInput, defaultMinutes, disabled, onTimerStart]);

  const stop = useCallback(() => {
    if (disabled) return; // 비활성화 상태면 스탑하지 않음

    // 스탑 버튼 클릭 시 총 경과 시간 기록
    if (startAtRef.current) {
      const elapsed = Date.now() - startAtRef.current;
      const totalMinutes = Math.floor(elapsed / (60 * 1000));
      setTotalElapsedTime(totalMinutes);
      console.log(`총 타이머 시간: ${totalMinutes}분`);

      // 콜백 함수 호출 (포인트 업데이트 등)
      if (onTimerComplete) {
        onTimerComplete(totalMinutes);
      }
    } else {
      // 시작하지 않은 상태에서 스탑 호출 시 현재 설정된 시간 사용
      const currentMinutes = Math.max(1, Math.min(99, Number(minutesInput) || 1));
      setTotalElapsedTime(currentMinutes);
      if (onTimerComplete) {
        onTimerComplete(currentMinutes);
      }
    }

    // 입력 단계로 되돌림
    pause();
    setIsStarted(false);
    setIsOvertime(false);
    const ms = Math.max(1, Math.min(99, Number(minutesInput) || defaultMinutes)) * 60 * 1000;
    durationMsRef.current = ms;
    setTime(ms);
    startAtRef.current = null;
  }, [pause, minutesInput, defaultMinutes, onTimerComplete, disabled]);

  useImperativeHandle(
    ref,
    () => ({
      start,
      pause,
      restart,
      stop,
      totalElapsedTime,
      isStarted,
      minutesInput,
    }),
    [start, pause, restart, stop, totalElapsedTime, isStarted, minutesInput],
  );

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

  // 🔸 시작 전: 분 부분을 input으로 렌더링
  if (!isStarted) {
    return (
      <div className={s.timerContainer}>
        <div className={`${s.timer} ${stateClass}`}>
          <input
            type="number"
            min={1}
            max={99}
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            className={s.minutesInput}
          />
          <span className={s.separator}>:</span>
          <span className={s.seconds}>{ss}</span>
        </div>
        <button onClick={internalStart} disabled={disabled}>
          {disabled ? '처리 중...' : 'Start'}
        </button>
      </div>
    );
  }

  // 🔸 시작 후: 일반 타이머 표시
  return (
    <div className={s.timerContainer}>
      <div className={`${s.timer} ${stateClass}`}>{formatted}</div>
      <div className={s.buttonGroup}>
        {!isOvertime ? (
          <>
            <button onClick={pause} disabled={disabled}>
              {disabled ? '처리 중...' : '일시정지'}
            </button>
            <button disabled>시작</button>
            <button onClick={restart} disabled={disabled}>
              {disabled ? '처리 중...' : '재시작'}
            </button>
          </>
        ) : (
          <button onClick={stop} disabled={disabled}>
            {disabled ? '처리 중...' : '스탑'}
          </button>
        )}
      </div>
    </div>
  );
});

export default Timer;
