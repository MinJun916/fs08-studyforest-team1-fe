import Emoji from '@/components/emoji/emoji';
import Tag from '@/components/tag/Tag.jsx';
import styles from '@styles/components/card/StudyCard.module.scss';

function StudyCard({ studyId, studyName, startDate, point, emoji, backgroundImg, description }) {
  return (
    <div className={styles.studyCard}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.title}>스터디 이름</div>
          <div className={styles.point}>
            <Tag bgColor={'#00000080'} fontSize={12} points={30} />
          </div>
        </div>
        <div className={styles.dDate}>62일째 진행 중</div>
      </div>
      <div className={styles.description}>Slow And Steady Wins The Race!</div>
      <div className={styles.emojiWrapper}>
        <div className={styles.emoji}>
          <Emoji studyId={studyId} />
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
