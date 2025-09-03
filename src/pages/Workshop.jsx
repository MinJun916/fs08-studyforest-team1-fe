import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '@/styles/pages/Workshop.module.scss';

/** ─────────────────────────────────────────────────────────
 * 로고(공부의 숲) – 원형칩 4개로 단순 구현한 atom
 * props: size = "md" | "lg"
 * ───────────────────────────────────────────────────────── */
function ForestLogo({ size = 'md' }) {
  return (
    <div className={`${styles.logo} ${styles[size]}`} aria-label="공부의 숲 로고">
      <span className={styles.badge} data-variant="pink">
        공
      </span>
      <span className={styles.badge} data-variant="yellow">
        부
      </span>
      <span className={styles.badge} data-variant="blue">
        의
      </span>
      <span className={styles.badge} data-variant="green">
        숲
      </span>
    </div>
  );
}

/** ─────────────────────────────────────────────────────────
 * 상단 헤더(제목/우측 버튼) – organism
 * ───────────────────────────────────────────────────────── */
function PageHeader({ title, onClickFocus, onClickHome }) {
  return (
    <header className={styles.header}>
      <ForestLogo size="lg" />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.headerActions}>
        <button type="button" className={styles.ghostBtn} onClick={onClickFocus}>
          오늘의 집중 <span aria-hidden>›</span>
        </button>
        <button type="button" className={styles.ghostBtn} onClick={onClickHome}>
          홈 <span aria-hidden>›</span>
        </button>
      </div>
    </header>
  );
}

/** ─────────────────────────────────────────────────────────
 * 시계 atom – 매초 갱신, ko-KR 표기 (오전/오후)
 * ───────────────────────────────────────────────────────── */
function Now() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const text = useMemo(
    () =>
      new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now),
    [now],
  );
  return (
    <div className={styles.nowRow}>
      <span className={styles.nowLabel}>현재 시간</span>
      <span className={styles.nowBadge} aria-live="polite">
        {text}
      </span>
    </div>
  );
}

/** ─────────────────────────────────────────────────────────
 * 습관 아이템 molecule
 * completed=true면 연둣빛(활성), 아니면 회색
 * ───────────────────────────────────────────────────────── */
function HabitItem({ text, completed, onToggle }) {
  return (
    <button
      type="button"
      className={`${styles.habitItem} ${completed ? styles.completed : ''}`}
      onClick={onToggle}
      aria-pressed={completed}
      title={completed ? '완료됨' : '미완료'}
    >
      {text}
    </button>
  );
}

/** ─────────────────────────────────────────────────────────
 * 메인 페이지
 * ───────────────────────────────────────────────────────── */
export default function Workshop() {
  // 초기 목록(샘플)
  const [habits, setHabits] = useState([
    { id: 1, text: '미라클모닝 6시 기상', completed: true },
    { id: 2, text: '아침 챙겨 먹기', completed: true },
    { id: 3, text: 'React 스터디 책 1챕터 읽기', completed: false },
    { id: 4, text: '스트레칭', completed: false },
    { id: 5, text: '영양제 챙겨 먹기', completed: false },
    { id: 6, text: '사이드 프로젝트', completed: false },
    { id: 7, text: '물 2L 먹기', completed: false },
  ]);

  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const [newItem, setNewItem] = useState('');

  const addHabit = () => {
    const text = newItem.trim();
    if (!text) return;
    setHabits((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    setNewItem('');
    inputRef.current?.focus();
  };

  const toggleHabit = (id) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)));
  };

  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          title="연우의 개발공장"
          onClickFocus={() => alert('오늘의 집중 페이지로 이동(라우팅 연결 예정)')}
          onClickHome={() => alert('홈으로 이동(라우팅 연결 예정)')}
        />

        <section className={styles.card}>
          <Now />

          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>오늘의 습관</h2>
            <button type="button" className={styles.linkBtn} onClick={() => setEditing((v) => !v)}>
              목록 수정
            </button>
          </div>

          {/* 입력 영역 */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder="목록을 입력하고 Enter 또는 추가 버튼을 눌러주세요"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addHabit();
              }}
              aria-label="새 습관 입력"
            />
            <button type="button" className={styles.primaryBtn} onClick={addHabit}>
              추가
            </button>
          </div>

          {/* 목록 */}
          <div className={styles.list}>
            {habits.map((h) => (
              <div key={h.id} className={styles.listRow}>
                <HabitItem
                  text={h.text}
                  completed={h.completed}
                  onToggle={() => toggleHabit(h.id)}
                />
                {editing && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => removeHabit(h.id)}
                    aria-label={`${h.text} 삭제`}
                    title="삭제"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
