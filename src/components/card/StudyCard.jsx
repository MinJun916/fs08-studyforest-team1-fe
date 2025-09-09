import { useState, useEffect } from 'react';
import Emoji from '@components/emoji/emoji';
import Tag from '@components/tag/Tag.jsx';
import api from '@/lib/axios.js';
import dDayCounter from '@/lib/dDayCounter.js';
import styles from '@styles/components/card/StudyCard.module.scss';

function StudyCard({ studyId = 'c0071d8c-90e4-471b-b9cf-e6a3fb4d7854' }) {
  const initialStudy = {
    studyName: '',
    createdAt: '',
    point: 0,
    backgroundImg: '',
    description: '',
  };

  const [study, setStudy] = useState(initialStudy);
  const [loading, setLoading] = useState(false);

  const fetchStudy = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/studies/${studyId}`);
      setStudy(res.data.data);
    } catch (error) {
      console.error(error);
      setStudy(initialStudy);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudy();
  }, [studyId]);

  const dDay = dDayCounter(study.createdAt);

  return (
    <div className={styles.studyCard}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.title}>{study.studyName}</div>
          <div className={styles.point}>
            <Tag bgColor={'#00000080'} fontSize={12} points={study.point} fontColor={'#fff'} />
          </div>
        </div>
        <div className={styles.dDate}>{dDay}일째 진행 중</div>
      </div>
      <div className={styles.description}>{study.description}</div>
      <div className={styles.emojiWrapper}>
        <div className={styles.emoji}>
          <Emoji studyId={studyId} />
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
