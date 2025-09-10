import styles from '@styles/components/card/RecentStudies.module.scss';
import { useState, useEffect } from 'react';
import { getRecentStudies } from '@/lib/recentStudies';
import StudyCard from '@/components/card/StudyCard';

function RecentStudies({ onDataChange }) {
  const [items, setItems] = useState([]);

  // 최근 조회한 스터디를 localStorage에서 직접 가져오기
  useEffect(() => {
    const recentStudies = getRecentStudies();
    const limitedStudies = recentStudies.slice(0, 3); // 최대 3개
    setItems(limitedStudies);

    // 부모 컴포넌트에 데이터 상태 전달
    if (onDataChange) {
      onDataChange(limitedStudies.length > 0);
    }
  }, [onDataChange]);

  if (items.length === 0) {
    return <div className={styles.empty}>최근 조회한 스터디가 없습니다.</div>;
  }

  return (
    <div className={styles.recentStudies}>
      <div className={styles.studyCardContainer}>
        {items.map((item) => (
          <StudyCard
            key={item.id}
            studyId={item.id}
            nickName={item.nickName}
            studyName={item.studyName}
            description={item.description}
            backgroundImg={item.backgroundImg}
            totalPoints={item.totalPoints}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentStudies;
