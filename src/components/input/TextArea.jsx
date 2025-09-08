import { useState } from 'react';
import styles from '@styles/components/input/TextArea.module.scss';

function TextArea({ onValueChange }) {
  const [textArea, setTextArea] = useState('');

  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value);
    onValueChange(textArea);
    console.log(textArea);
  };

  return (
    <div>
      <textarea
        className={styles.textarea}
        placeholder="소개 멘트를 작성해 주세요"
        value={textArea}
        onChange={handleTextAreaChange}
      />
    </div>
  );
}

export default TextArea;
