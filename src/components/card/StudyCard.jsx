import { useState, useEffect } from 'react';
import Emoji from '@components/emoji/emoji';
import Tag from '@components/tag/Tag.jsx';
import api from '@/lib/axios.js';
import dDayCounter from '@/lib/dDayCounter.js';
import clsx from 'clsx';
import styles from '@styles/components/card/StudyCard.module.scss';

function StudyCard({ studyId = 'b6d43784-2ca5-4102-9cc9-3005056d2506' }) {
  const initialStudy = {
    studyName: '',
    createdAt: '',
    point: 0,
    backgroundImg: '',
    description: '',
    nickName: '',
  };

  const [study, setStudy] = useState(initialStudy);
  const [loading, setLoading] = useState(false);

  const fetchStudy = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/studies/${studyId}`);
      setStudy(res.data.data);
      console.log(res.data.data);
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

  const bgMap = {
    green: styles.green,
    yellow: styles.yellow,
    blue: styles.blue,
    pink: styles.pink,
    alvaro: styles.alvaro,
    mikey: styles.mikey,
    andrew: styles.andrew,
    chris: styles.chris,
  };

  const isImg =
    study.backgroundImg === 'alvaro' ||
    study.backgroundImg === 'mikey' ||
    study.backgroundImg === 'andrew' ||
    study.backgroundImg === 'chris';

  const imgTagStyleMap = {
    bgColor: 'rgba(0, 0, 0, 0.50)',
    fontSize: 12,
    points: study.point,
    fontColor: '#fff',
  };

  const colorTagStyleMap = {
    bgColor: 'rgba(255, 255, 255, 0.30)',
    fontSize: 12,
    points: study.point,
    fontColor: '#414141',
  };

  return (
    <div className={clsx(styles.studyCard, bgMap[study.backgroundImg], isImg || styles.blackFont)}>
      <div className={styles.studyCardWrapper}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <div className={styles.title}>
              <span className={styles.nickName}>{study.nickName}</span>
              <span className={styles.studyName}>{`의 ${study.studyName}`}</span>
            </div>
            <div className={styles.point}>
              <Tag {...(isImg ? imgTagStyleMap : colorTagStyleMap)} />
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
    </div>
  );
}

export default StudyCard;
