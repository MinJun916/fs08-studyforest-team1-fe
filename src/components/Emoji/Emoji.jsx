import React, { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import axios from 'axios';
import styles from '@/styles/components/emoji/Emoji.module.scss';

function Emoji({ onSelect, pickerProps = {}, studyId = 'c0071d8c-90e4-471b-b9cf-e6a3fb4d7854', host = 'https://studyforest-n1at.onrender.com' }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]); // { emoji: '😀', count: 1, id, emojiType }
  const rootRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // helper: convert emoji char to emojiType used by backend (hex codepoints)
  const emojiToType = (emoji) => {
    if (!emoji) return '';
    return [...emoji].map((c) => c.codePointAt(0).toString(16)).join('-');
  };

  // helper: keep items sorted by count desc (stable by id/emoji)
  const sortItems = (arr) => {
    return (arr || []).slice().sort((a, b) => {
      const diff = (b.count || 0) - (a.count || 0);
      if (diff !== 0) return diff;
      const aKey = (a.id ?? a.emoji ?? '').toString();
      const bKey = (b.id ?? b.emoji ?? '').toString();
      return aKey.localeCompare(bKey);
    });
  };

  // fetch list from server
  useEffect(() => {
    let url = `${host}/emojis?offset=0&limit=10`;
    if (studyId) url = `${host}/emojis?studyId=${studyId}&order=count&offset=0&limit=10`;
    let cancelled = false;

    axios
      .get(url)
      .then((res) => {
        if (cancelled) return;
        const data = res?.data?.data ?? [];
        const mapped = data.map((it) => ({
          id: it.id,
          emoji: it.emojiChar || it.emoji || '',
          count: it.count || 0,
          emojiType: it.emojiType || emojiToType(it.emojiChar || it.emoji || ''),
        }));
  setItems(sortItems(mapped));
      })
      .catch((err) => {
        // non-blocking: keep local items
        console.warn('failed to fetch emojis', err?.message || err);
      });

    return () => {
      cancelled = true;
    };
  }, [studyId, host]);

  const handleEmojiClick = (emojiData) => {
    const emojiChar = emojiData?.emoji ?? emojiData?.native ?? '';
    if (!emojiChar) return;

    const emojiType = emojiToType(emojiChar);

    axios
      .post(`${host}/emojis`, { studyId, emojiType })
      .then((res) => {
        const data = res?.data?.data ?? [];
        const mapped = data.map((it) => ({
          id: it.id,
          emoji: it.emojiChar || it.emoji || emojiChar,
          count: it.count || 0,
          emojiType: it.emojiType || emojiType,
        }));
        setItems(sortItems(mapped));
      })
      .catch((err) => {
        setItems((prev) => {
          const idx = prev.findIndex((it) => it.emoji === emojiChar);
          if (idx >= 0) {
            const next = prev.slice();
            next[idx] = { ...next[idx], count: next[idx].count + 1 };
            return sortItems(next);
          }
          return sortItems([...prev, { emoji: emojiChar, count: 1, emojiType }]);
        });
        console.warn('failed to post emoji', err?.message || err);
      })
      .finally(() => setOpen(false));

    if (typeof onSelect === 'function') onSelect(emojiChar);
  };

  const handleItemClick = (emojiChar) => {
    if (!emojiChar) return;
    const emojiType = emojiToType(emojiChar);

    axios
      .post(`${host}/emojis`, { studyId, emojiType })
      .then((res) => {
        const data = res?.data?.data ?? [];
        const mapped = data.map((it) => ({
          id: it.id,
          emoji: it.emojiChar || it.emoji || emojiChar,
          count: it.count || 0,
          emojiType: it.emojiType || emojiType,
        }));
        setItems(sortItems(mapped));
      })
      .catch((err) => {
        setItems((prev) => {
          const idx = prev.findIndex((it) => it.emoji === emojiChar);
          if (idx >= 0) {
            const next = prev.slice();
            next[idx] = { ...next[idx], count: next[idx].count + 1 };
            return sortItems(next);
          }
          return sortItems([...prev, { emoji: emojiChar, count: 1, emojiType }]);
        });
        console.warn('failed to post emoji', err?.message || err);
      });

    if (typeof onSelect === 'function') onSelect(emojiChar);
  };

  return (
    <div ref={rootRef} className={styles.emojiBox}>
      {items.length > 0 && (
        <div className={styles.list}>
          {items.slice(0, 3).map((it, i) => (
            <div
              key={it.emoji + i}
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
      <div className={styles.emojiAdd}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          title="이모지 추가"
          className={styles.addButton}
        >
          추가
        </button>
          {open && (
            <div className={styles.pickerWrapper}>
                {items.length > 0 && (
                  <div className={styles.sideList}>
                    {items.slice(0, 8).map((it, i) => (
                      <div
                        key={it.emoji + '-side-' + i}
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
                <div className={styles.picker}>
                  <Picker onEmojiClick={handleEmojiClick} {...pickerProps} />
                </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Emoji;
