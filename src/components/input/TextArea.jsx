import { useState } from 'react';
import styles from '@styles/components/input/TextArea.module.scss';

function TextArea({ onValueChange }) {
  const [textArea, setTextArea] = useState('');

  const handleTextAreaChange = (e) => {
    const newValue = e.target.value;
    setTextArea(newValue);
    onValueChange(newValue);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputTitle}>소개</div>
      <textarea
        className={styles.textarea}
        placeholder="소개 멘트를 작성해 주세요"
        value={textArea}
        onChange={handleTextAreaChange}
        autoComplete="off"
      />
    </div>
  );
}

export default TextArea;
