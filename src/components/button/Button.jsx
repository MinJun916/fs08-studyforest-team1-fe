import { useState } from 'react';
import clsx from 'clsx';

import ic_restart from '@assets/icons/ic_restart.svg';
import ic_pause from '@assets/icons/ic_pause.svg';
import ic_play from '@assets/icons/ic_play.svg';
import ic_stop from '@assets/icons/ic_stop.svg';

import styles from '@styles/components/button/Button.module.scss';

export default function Button({ childrenType, disabled = false }) {
  const [toggled, setToggled] = useState(false);

  let childrenContent = null;
  let childrenIcon = null;
  let inlineIcon = null;
  switch (childrenType) {
    case 'habit':
      childrenContent = '오늘의 습관으로 가기';
      break;
    case 'focus':
      childrenContent = '오늘의 집중으로 가기';
      break;
    case 'modify':
      childrenContent = '수정하러 가기';
      break;
    case 'create':
      childrenContent = '만들기';
      break;
    case 'confirm':
      childrenContent = '확인';
      break;
    case 'cancel':
      childrenContent = '취소';
      break;
    case 'completeModify':
      childrenContent = '수정 완료';
      break;
    case 'start':
      childrenContent = 'Start!';
      inlineIcon = ic_play;
      break;
    case 'stop':
      childrenContent = 'Stop!';
      inlineIcon = ic_stop;
      break;
    case 'restart':
      childrenIcon = ic_restart;
      break;
    case 'pause':
      childrenIcon = ic_pause;
      break;
    default:
      childrenContent = null;
      break;
  }

  const handleClick = () => {
    if (childrenType === 'restart' || childrenType === 'pause') {
      setToggled(!toggled);
    }
  };

  const className = clsx(
    styles[childrenType],
    childrenType === 'confirm' ? styles.confirmTemplate : styles.template,
    disabled && styles.isDisabled,
    toggled && styles.isToggled,
  );

  return (
    <button
      type="button"
      className={`${styles.btn} ${className}`}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className={styles.btnInner}>
        {inlineIcon && <img src={inlineIcon} alt={childrenType} className={styles.inlineIcon} />}
        {childrenContent ? (
          <span className={styles.btnText}>{childrenContent}</span>
        ) : (
          <img src={childrenIcon} alt={childrenType} className={styles.childrenIcon} />
        )}
      </span>
    </button>
  );
}
