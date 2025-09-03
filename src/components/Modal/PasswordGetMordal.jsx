// src/component/modal/PasswordGateModal.jsx
import React, { useState } from 'react';
import Popup from '@components/popup/popup.jsx';
import PasswordInput from '@components/input/PasswordInput.jsx';

export default function PasswordGateModal({ open, onClose, onSubmit }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = () => {
    if (!pw.trim()) return setErr('비밀번호를 입력해 주세요');
    onSubmit?.(pw);
  };

  return (
    <Popup
      open={open}
      size="md"
      title="연우의 개발공장"
      subtitle="권한이 필요해요!"
      headerRightText="나가기"
      onHeaderRightClick={onClose}
      hideActions
    >
      <div style={{ marginTop: 12 }}>
        <PasswordInput
          label="비밀번호"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            err && setErr('');
          }}
          error={err}
          required
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 12,
            border: 'none',
            fontWeight: 800,
            color: '#fff',
            background: '#99C08E',
          }}
        >
          수정하러 가기
        </button>
      </div>
    </Popup>
  );
}
