// src/pages/Focus.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '@/lib/axios';
import styles from '@/styles/pages/Focus.module.scss';

export default function Focus() {
  // /focus/:id 라우트 파라미터 (없으면 로컬스토리지에서 보조적으로 꺼냄)
  const { id: idFromRoute } = useParams();

  // 화면에 표시할 상태들
  const [title, setTitle] = useState(''); // 스터디 이름
  const [points, setPoints] = useState(0); // 총 포인트
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 상세 조회
  useEffect(() => {
    let mounted = true;

    async function fetchDetail() {
      setLoading(true);
      setError('');

      const studyId = idFromRoute || localStorage.getItem('sf_current_study_id');
      if (!studyId) {
        setError('스터디 ID를 찾을 수 없어요. 먼저 스터디를 생성해 주세요.');
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/studies/${studyId}`);
        const data = res?.data?.data ?? res?.data ?? {};

        if (!mounted) return;

        // 서버 응답 키에 맞춰 유연하게 매핑
        setTitle(data.studyName || data.name || '');
        setPoints(Number(data.totalPoints ?? data.point ?? data.points ?? 0));
      } catch (e) {
        if (!mounted) return;
        console.error(e);
        setError('스터디 정보를 불러오는 중 문제가 발생했어요.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchDetail();
    return () => {
      mounted = false;
    };
  }, [idFromRoute]);

  // 로딩/에러 상태 처리
  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <section className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.leftGroup}>
                <h1 className={styles.studyTitle}>불러오는 중...</h1>
                <p className={styles.subText}>현재까지 획득한 포인트</p>
                <span className={styles.pointsPill}>
                  <span className={styles.leaf} aria-hidden>
                    🍃
                  </span>
                  로딩중
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <section className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.leftGroup}>
                <h1 className={styles.studyTitle}>오류</h1>
                <p className={styles.subText}>{error}</p>
              </div>
              <div className={styles.rightActions}>
                <Link to="/" className={styles.topBtn}>
                  홈
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // 정상 화면
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.card}>
          {/* ===== 상단 영역 ===== */}
          <div className={styles.cardTop}>
            {/* 왼쪽: 타이틀/포인트 */}
            <div className={styles.leftGroup}>
              <h1 className={styles.studyTitle}>{title || '스터디'}</h1>
              <p className={styles.subText}>현재까지 획득한 포인트</p>
              <span className={styles.pointsPill}>
                <span className={styles.leaf} aria-hidden>
                  🍃
                </span>
                {points}P 획득
              </span>
            </div>

            {/* 오른쪽: 상단 버튼들 */}
            <div className={styles.rightActions}>
              <Link to="/workshop" className={styles.topBtn}>
                오늘의 습관
              </Link>
              <Link to="/" className={styles.topBtn}>
                홈
              </Link>
            </div>
          </div>

          {/* ===== 타이머 패널(모양만) ===== */}
          <div className={styles.timerPanel} role="group" aria-label="오늘의 집중">
            <p className={styles.timerTitle}>오늘의 집중</p>
            <div className={styles.timerDisplay} aria-live="polite">
              25:00
            </div>
            <button type="button" className={styles.startBtn} disabled>
              Start!
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
