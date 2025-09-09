import React, { useMemo } from 'react';
import styles from '@/styles/components/tag/tag.module.scss';
import LeafIcon from '@/assets/icons/ic_leaf.svg';

function Tag({ bgColor, fontSize = 14, fontColor = '#414141', points }) {
  // 스타일 객체를 useMemo로 메모이제이션하여 불필요한 재생성 방지
  const containerStyle = useMemo(
    () => (bgColor ? { backgroundColor: bgColor } : undefined),
    [bgColor],
  );

  const textStyle = useMemo(
    () => ({
      fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
      color: fontColor,
    }),
    [fontSize, fontColor],
  );

  // 포인트 텍스트 생성 로직 개선
  const pointsText = useMemo(() => {
    const pointsValue = points ?? 0;
    return `${pointsValue}P 획득`;
  }, [points]);

  return (
    <div className={styles.tag} style={containerStyle}>
      <img src={LeafIcon} alt="leaf" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
      <span style={textStyle}>{pointsText}</span>
    </div>
  );
}

export default Tag;
