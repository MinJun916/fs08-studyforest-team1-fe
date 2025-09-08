import React, { useState } from 'react';
import styles from '@/styles/components/card/card.module.scss';

/**
 * 재사용 카드
 * variant: "dark" | "light"
 * props:
 * - title: string
 * - daysText: string        // 예: "62일째 진행 중"
 * - subtitle: string        // 예: "Slow And Steady Wins The Race!!"
 * - points: number|string   // 예: 310
 * - thumbnail?: string
 * - stats?: { members:number|string, heat:number|string, likes:number|string }
 * - initiallyLiked?: boolean
 */
export function StudyCard({
  variant = 'light',
  title,
  daysText,
  subtitle,
  points,
  thumbnail,
  stats = { members: 0, heat: 0, likes: 0 },
  initiallyLiked = false,
  onLike,
}) {
  const [liked, setLiked] = useState({
    members: false,
    heat: false,
    likes: initiallyLiked,
  });

  const toggleLike = (key) => setLiked((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <article
      className={`${styles.card} ${variant === 'dark' ? styles.dark : styles.light}`}
      role="group"
      aria-label={`${title} 카드`}
    >
      {thumbnail && (
        <div className={styles.thumb}>
          <img src={thumbnail} alt="" />
        </div>
      )}

      {/* 오버레이(다크 변형에서만 보이도록) */}
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.badge} aria-label="포인트 획득">
            <span className={styles.badgeIcon}>🪴</span>
            <span className={styles.badgeText}>
              {typeof points === 'number' ? `${points}P` : points} 획득
            </span>
          </div>
        </header>

        <div className={styles.days}>{daysText}</div>
        <p className={styles.subtitle}>{subtitle}</p>

        <footer className={styles.footer}>
          <div className={styles.pills}>
            <button
              type="button"
              className={`${styles.pill} ${styles.likePill} ${liked.members ? styles.liked : ''}`}
              onClick={() => toggleLike('members')}
              aria-pressed={liked.members}
            >
              <span className={styles.emoji}>👥</span>
              {stats.members}
            </button>

            <button
              type="button"
              className={`${styles.pill} ${styles.likePill} ${liked.heat ? styles.liked : ''}`}
              onClick={() => toggleLike('heat')}
              aria-pressed={liked.heat}
            >
              <span className={styles.emoji}>🔥</span>
              {stats.heat}
            </button>

            <button
              type="button"
              className={`${styles.pill} ${styles.likePill} ${liked.likes ? styles.liked : ''}`}
              onClick={() => toggleLike('likes')}
              aria-pressed={liked.likes}
            >
              <span className={styles.emoji}>💗</span>
              {stats.likes}
            </button>
          </div>

          {/* <button
            type="button"
            className={styles.likeBtn}
            onClick={toggleLike}
            aria-pressed={liked}
          >
            공감
          </button> */}
        </footer>
      </div>
    </article>
  );
}

export default function CardsDemo() {
  return (
    <div className={styles.grid}>
      <StudyCard
        variant="dark"
        title="이유디의 UX 스터디"
        daysText="62일째 진행 중"
        subtitle="Slow And Steady Wins The Race!!"
        points={310}
        thumbnail="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop"
        stats={{ members: 37, heat: 26, likes: 14 }}
      />
      <StudyCard
        variant="light"
        title="이유디의 UX 스터디"
        daysText="62일째 진행 중"
        subtitle="Slow And Steady Wins The Race!!"
        points={310}
        stats={{ members: 37, heat: 26, likes: 14 }}
        initiallyLiked
      />
    </div>
  );
}
