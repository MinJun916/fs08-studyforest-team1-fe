import { useState, useEffect } from 'react';
import styles from '@styles/components/input/TextArea.module.scss';

function TextArea({ onValueChange, value }) {
  const [textArea, setTextArea] = useState(value || '');

  // value prop이 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setTextArea(value);
    }
  }, [value]);

  const handleTextAreaChange = (e) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setTextArea(newValue);
    }
    onValueChange(newValue);
  };

  const currentValue = value !== undefined ? value : textArea;

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputTitle}>소개</div>
      <textarea
        className={styles.textarea}
        placeholder="소개 멘트를 작성해 주세요"
        value={currentValue}
        onChange={handleTextAreaChange}
        autoComplete="off"
      />
    </div>
  );
}

export default TextArea;
