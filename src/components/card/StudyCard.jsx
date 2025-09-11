import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import EmojiList from '@components/emoji/EmojiList';
import Tag from '@components/tag/Tag.jsx';
import dDayCounter from '@/lib/dDayCounter.js';
import styles from '@styles/components/card/StudyCard.module.scss';

function StudyCard({
  studyName,
  createdAt,
  totalPoints,
  backgroundImg,
  description,
  nickName,
  studyId,
  emojis = [],
  className,
}) {
  const navigate = useNavigate();
  const dDay = dDayCounter(createdAt);

  const handleCardClick = () => {
    if (studyId) {
      navigate(`/study/${studyId}`);
    }
  };

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

  const bgNameMap = {
    green: styles.greenName,
    yellow: styles.yellowName,
    blue: styles.blueName,
    pink: styles.pinkName,
    alvaro: styles.alvaroName,
    mikey: styles.mikeyName,
    andrew: styles.andrewName,
    chris: styles.chrisName,
  };

  const isImg =
    backgroundImg === 'alvaro' ||
    backgroundImg === 'mikey' ||
    backgroundImg === 'andrew' ||
    backgroundImg === 'chris';

  const imgTagStyleMap = {
    bgColor: 'rgba(0, 0, 0, 0.50)',
    fontSize: 12,
    points: totalPoints,
    fontColor: '#fff',
  };

  const colorTagStyleMap = {
    bgColor: 'rgba(255, 255, 255, 0.30)',
    fontSize: 12,
    points: totalPoints,
    fontColor: '#414141',
  };

  return (
    <div
      className={clsx(styles.studyCard, bgMap[backgroundImg], isImg || styles.blackFont, className)}
      onClick={handleCardClick}
    >
      <div className={styles.studyCardWrapper}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <div className={styles.title}>
              <span className={clsx(styles.nickName, bgNameMap[backgroundImg])}>{nickName}</span>
              <span className={styles.studyName}>{`의 ${studyName}`}</span>
            </div>
            <div className={styles.point}>
              <Tag {...(isImg ? imgTagStyleMap : colorTagStyleMap)} />
            </div>
          </div>
          <div className={styles.dDate}>{dDay}일째 진행 중</div>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.emojiWrapper}>
          <div className={styles.emoji}>
            <EmojiList emojis={emojis} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
