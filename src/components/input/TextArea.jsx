import styles from '@styles/components/input/TextArea.module.scss';

function TextArea() {
  return (
    <div>
      <textarea className={styles.textarea} placeholder="소개 멘트를 작성해 주세요" />
    </div>
  );
}

export default TextArea;
