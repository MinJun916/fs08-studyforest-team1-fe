// src/component/modal/HabitsEditModal.jsx
import React, { useState } from 'react';
import Popup from '@/component/popup/popup.jsx';

export default function HabitsEditModal({
  open,
  onClose,
  initialHabits = [],
  onSubmit, // (habits: string[]) => void
}) {
  const [habits, setHabits] = useState(initialHabits);
  const [draft, setDraft] = useState('');

  const addHabit = () => {
    const v = draft.trim();
    if (!v) return;
    setHabits((list) => [...list, v]);
    setDraft('');
  };
  const removeHabit = (idx) => setHabits((list) => list.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    onSubmit?.(habits);
    onClose?.();
  };

  return (
    <Popup open={open} size="md" title="습관 목록" hideActions>
      {/* 리스트 */}
      <div
        style={{
          maxHeight: '46vh',
          overflowY: 'auto',
          marginTop: 12,
          paddingRight: 4,
        }}
      >
        {habits.map((h, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F2F2F2',
              padding: '14px 16px',
              borderRadius: 20,
              margin: '10px 0',
            }}
          >
            <span style={{ color: '#666' }}>{h}</span>
            <button
              type="button"
              aria-label="삭제"
              onClick={() => removeHabit(i)}
              style={{
                display: 'grid',
                placeItems: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: '#FFE4EA',
                color: '#E24672',
                fontSize: 18,
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {/* 추가 입력 */}
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '2px solid #222',
            borderRadius: 14,
            padding: '10px 12px',
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            placeholder="+"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
            }}
          />
          <button
            type="button"
            onClick={addHabit}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            ＋
          </button>
        </div>
      </div>

      {/* 하단 액션 */}
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            flex: 1,
            height: 56,
            borderRadius: 12,
            border: 'none',
            background: '#E5E5E5',
            color: '#666',
            fontWeight: 800,
          }}
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            flex: 1,
            height: 56,
            borderRadius: 12,
            border: 'none',
            background: '#99C08E',
            color: '#fff',
            fontWeight: 800,
          }}
        >
          수정 완료
        </button>
      </div>
    </Popup>
  );
}
