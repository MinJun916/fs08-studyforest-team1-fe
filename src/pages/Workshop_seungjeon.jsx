// src/pages/Workshop.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '@/styles/pages/Workshop_seungjeon.module.scss';

const INITIAL = [
  { id: 1, text: '미라클모닝 6시 기상', completed: true },
  { id: 2, text: '아침 챙겨 먹기', completed: true },
  { id: 3, text: 'React 스터디 책 1챕터 읽기', completed: false },
  { id: 4, text: '스트레칭', completed: false },
  { id: 5, text: '영양제 챙겨 먹기', completed: false },
  { id: 6, text: '사이드 프로젝트', completed: false },
  { id: 7, text: '물 2L 먹기', completed: false },
];

export default function Workshop() {
  const [habits, setHabits] = useState(INITIAL);
  const [now, setNow] = useState(() => new Date());

  // Focus처럼 상단 레이아웃 유지, 현재시간은 30초마다 갱신
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const nowText = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now);

  const toggle = (id) =>
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)));

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.card}>
          {/* ===== 카드 상단 (Focus와 동일한 좌/우 배치) ===== */}
          <div className={styles.cardTop}>
            <div className={styles.leftGroup}>
              <h1 className={styles.studyTitle}>연우의 개발공장</h1>
              <p className={styles.subText}>현재 시간</p>

              <div className={styles.nowRow}>
                <span className={styles.nowBadge} aria-live="polite">
                  {nowText}
                </span>
              </div>
            </div>

            <div className={styles.rightActions}>
              <Link to="/focus" className={styles.topBtn}>
                오늘의 집중
              </Link>
              <Link to="/" className={styles.topBtn}>
                홈
              </Link>
            </div>
          </div>

          {/* ===== 오늘의 습관 패널 ===== */}
          <div className={styles.habitPanel} role="group" aria-label="오늘의 습관">
            <p className={styles.habitTitle}>오늘의 습관</p>

            <ul className={styles.habitList}>
              {habits.map((h) => (
                <li key={h.id} className={`${styles.habitItem} ${h.completed ? styles.done : ''}`}>
                  <button type="button" onClick={() => toggle(h.id)}>
                    {h.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
