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
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <g clip-path="url(#clip0_9947_480)">
            <path d="M12 7.875C12 8.49632 11.6642 9 11.25 9C10.8358 9 10.5 8.49632 10.5 7.875C10.5 7.25368 10.8358 6.75 11.25 6.75C11.6642 6.75 12 7.25368 12 7.875Z" fill="#414141"/>
            <path d="M7.5 7.875C7.5 8.49632 7.16421 9 6.75 9C6.33579 9 6 8.49632 6 7.875C6 7.25368 6.33579 6.75 6.75 6.75C7.16421 6.75 7.5 7.25368 7.5 7.875Z" fill="#414141"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.6421 4.86914 15.6288 8.43761 15.915C8.43872 14.799 8.4493 13.9701 8.54265 13.2883C7.75462 13.2043 7.02749 12.9059 6.41504 12.4519C6.16547 12.2669 6.11311 11.9146 6.29811 11.665C6.4831 11.4155 6.83539 11.3631 7.08496 11.5481C7.58413 11.9181 8.17774 12.1458 8.8177 12.1823C9.42626 10.5832 10.7103 9.33054 12.3303 8.76368C13.1903 8.46274 14.2225 8.4393 15.915 8.43761C15.6288 4.86914 12.6421 2.0625 9 2.0625ZM15.8544 9.56306C14.1625 9.56701 13.353 9.59769 12.7018 9.82555C11.3553 10.2967 10.2967 11.3553 9.82555 12.7018C9.59769 13.353 9.56701 14.1625 9.56306 15.8544L15.8544 9.56306ZM0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 9.27171 17.049 9.54046 17.0227 9.80558L17.0029 10.0056L10.0056 17.0029L9.80558 17.0227C9.54046 17.049 9.27171 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9Z" fill="#414141"/>
            </g>
            <defs>
            <clipPath id="clip0_9947_480">
            <rect width="18" height="18" fill="white"/>
            </clipPath>
            </defs>
          </svg>
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
