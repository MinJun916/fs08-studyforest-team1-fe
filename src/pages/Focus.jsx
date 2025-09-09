// export default function Focus() {
//   return (
//     <div style={{padding: 20}}>
//       <h1>Focus (임시)</h1>
//       <p>포커스 페이지가 아직 구현되지 않아 임시로 표시됩니다.</p>
//     </div>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '@/styles/pages/Focus.module.scss';

/** 오늘의 집중 – UI 전용(타이머 기능 없음) */
export default function Focus() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.card}>
          {/* ===== 카드 상단 영역 ===== */}
          <div className={styles.cardTop}>
            {/* 왼쪽: 타이틀 → 설명 → 포인트 */}
            <div className={styles.leftGroup}>
              <h1 className={styles.studyTitle}>연우의 개발공장</h1>
              <p className={styles.subText}>현재까지 획득한 포인트</p>
              <span className={styles.pointsPill}>
                <span className={styles.leaf} aria-hidden>
                  🍃
                </span>
                310P 획득
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
