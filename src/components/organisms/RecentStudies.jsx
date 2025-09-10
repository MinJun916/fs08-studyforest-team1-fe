import styles from '@styles/components/organisms/RecentStudies.module.scss';
import { useState, useEffect } from 'react';
import { getRecentStudies } from '@/lib/recentStudies';
import StudyCard from '@/components/card/StudyCard';

function RecentStudies({ onDataChange }) {
  const [items, setItems] = useState([]);

  // 모든 최근 스터디를 로드 (최대 3개)
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
        {items.map((item) => {
          return (
            <div key={item.id} className={styles.studyCard}>
              <StudyCard studyId={item.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentStudies;
