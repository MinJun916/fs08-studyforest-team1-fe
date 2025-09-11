import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/emoji/Emoji.module.scss';

function EmojiList({ emojis = [], onSelect, maxDisplayItems = 3 }) {
  const [items, setItems] = useState([]);

  const emojiTypeToChar = (emojiType) => {
    if (!emojiType) return '';
    try {
      const codePoints = emojiType.split('-').map((hex) => parseInt(hex, 16));
      return String.fromCodePoint(...codePoints);
    } catch (error) {
      console.warn('Failed to convert emojiType to character:', emojiType);
      return '';
    }
  };

  const sortItems = (arr) => {
    return (arr || []).slice().sort((a, b) => {
      const diff = (b.count || 0) - (a.count || 0);
      if (diff !== 0) return diff;
      const aKey = (a.id ?? a.emoji ?? '').toString();
      const bKey = (b.id ?? b.emoji ?? '').toString();
      return aKey.localeCompare(bKey);
    });
  };

  // props로 받은 emojis 데이터를 가공하여 items에 설정
  useEffect(() => {
    if (emojis && emojis.length > 0) {
      const mapped = emojis.map((it) => ({
        id: it.id,
        emoji: it.emojiChar || it.emoji || emojiTypeToChar(it.emojiType) || '',
        count: it.count || 0,
        emojiType: it.emojiType || '',
        studyId: it.studyId,
      }));
      setItems(sortItems(mapped));
    } else {
      setItems([]);
    }
  }, [emojis]);

  const handleItemClick = (emojiChar) => {
    if (typeof onSelect === 'function') onSelect(emojiChar);
  };

  return (
    <div className={styles.emojiBox}>
      {items.length > 0 && (
        <div className={styles.list}>
          {items.slice(0, maxDisplayItems).map((it, i) => (
            <div
              key={it.id || it.emoji + i}
              className={styles.item}
              role="button"
              tabIndex={0}
              onClick={() => handleItemClick(it.emoji)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemClick(it.emoji);
                }
              }}
            >
              <span className={styles.itemEmoji}>{it.emoji}</span>
              <span className={styles.itemCount}>{it.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmojiList;
