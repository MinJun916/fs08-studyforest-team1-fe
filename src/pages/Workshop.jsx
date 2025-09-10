// src/pages/Workshop.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import styles from '@/styles/pages/Workshop.module.scss';

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

  // 스터디 정보
  const [studyId, setStudyId] = useState(null);
  const [studyTitle, setStudyTitle] = useState(''); // 스터디 이름
  const [createdAt, setCreatedAt] = useState(''); // 생성 시각(ISO)

  // 현재 시각(생성시각이 없을 때만 표시용)
  const [now, setNow] = useState(() => new Date());

  // 30초마다 now 갱신 (createdAt이 없을 때만 의미 있음)
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // 스터디 상세 불러오기 (localStorage의 id/createdAt 사용 + 서버 조회)
  useEffect(() => {
    const id = localStorage.getItem('sf_current_study_id');
    const savedCreatedAt = localStorage.getItem('sf_current_study_createdAt'); // Create 시 저장 권장
    setStudyId(id);

    if (!id) return;

    let mounted = true;
    (async () => {
      try {
        const res = await api.get(`/studies/${id}`);
        const data = res?.data?.data ?? res?.data ?? {};
        if (!mounted) return;

        setStudyTitle(data.studyName || data.name || '');
        // 우선순위: 로컬 저장 createdAt > 서버의 createdAt > (없으면 공란)
        setCreatedAt(savedCreatedAt || data.createdAt || '');
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // 날짜 포맷 함수
  const formatKR = (input) => {
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) return ''; // 잘못된 날짜 방지
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  };

  // 화면에 보여줄 시간 텍스트: createdAt(있으면) 우선, 없으면 now
  const timeText = useMemo(
    () => (createdAt ? formatKR(createdAt) : formatKR(now)),
    [createdAt, now],
  );

  const toggle = (id) =>
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)));

  const focusHref = studyId ? `/focus/${studyId}` : '/focus';

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.card}>
          {/* ===== 카드 상단 (Focus와 동일한 좌/우 배치) ===== */}
          <div className={styles.cardTop}>
            <div className={styles.leftGroup}>
              {/* ⬇️ Create에서 입력한 스터디 이름으로 표시 */}
              <h1 className={styles.studyTitle}>{studyTitle || '스터디'}</h1>

              {/* ⬇️ “현재 시간” 자리에는 생성 시각을 우선 표시 */}
              <p className={styles.subText}>현재 시간</p>
              <div className={styles.nowRow}>
                <span className={styles.nowBadge} aria-live="polite">
                  {timeText || '시간 정보를 불러오는 중...'}
                </span>
              </div>
            </div>

            <div className={styles.rightActions}>
              <Link to={focusHref} className={styles.topBtn}>
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
