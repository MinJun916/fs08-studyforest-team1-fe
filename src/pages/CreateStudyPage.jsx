import { useState } from 'react';
import styles from '@/styles/pages/CreateStudyPage.module.scss';

import imgDesk from '@assets/icons/bg-desk.png';
import imgWindow from '@assets/icons/bg-window.png';
import imgTiles from '@assets/icons/bg-tiles.png';
import imgPlant from '@assets/icons/bg-plant.png';
import pawSelected from '@assets/icons/ic_bg_selected.png';

import Input from '@/components/input/Input.jsx';

export default function CreateStudyPage() {
  // 윗줄: 발바닥(기본) + 파스텔 3색 → 4칸
  const colorTiles = [
    { id: 'c1', kind: 'color', value: '#DDE7D5' },
    { id: 'c2', kind: 'color', value: '#F8EAB9' },
    { id: 'c3', kind: 'color', value: '#DAEBF0' },
    { id: 'c4', kind: 'color', value: '#F7DCE1' },
  ];
  const DEFAULT_BG = { kind: 'color', value: colorTiles[0].value }; // "#DDE7D5"

  // 아랫줄: 사진 4개 → 4칸
  const imageTiles = [
    { id: 'g1', kind: 'image', value: `url(${imgDesk})` },
    { id: 'g2', kind: 'image', value: `url(${imgWindow})` },
    { id: 'g3', kind: 'image', value: `url(${imgTiles})` },
    { id: 'g4', kind: 'image', value: `url(${imgPlant})` },
  ];

  const [form, setForm] = useState({
    intro: '',
    background: DEFAULT_BG,
  });

  // textarea용 onChange 핸들러
  const onIntroChange = (e) => setForm((f) => ({ ...f, intro: e.target.value }));

  const selectBackground = (bg) => setForm((f) => ({ ...f, background: bg }));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('payload', form);
    alert('임시: 콘솔에서 값 확인하세요!');
  };

  const norm = (x) => (x ?? '').toString().trim().toLowerCase();
  const isSelected = (bg) => {
    const sel = form.background;
    return !!sel && sel.kind === bg.kind && norm(sel.value) === norm(bg.value);
  };

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h2 className={styles.title}>스터디 만들기</h2>

        <form onSubmit={onSubmit} noValidate>
          {/* 닉네임 */}
          <Input type="nickName" />

          {/* 스터디 이름 */}
          <Input type="studyName" />

          {/* 소개 */}
          <div className={styles.field}>
            <label htmlFor="intro">소개</label>
            <textarea
              id="intro"
              name="intro"
              placeholder="소개 멘트를 작성해 주세요"
              value={form.intro}
              onChange={onIntroChange}
              rows={3}
            />
          </div>

          {/* 배경 선택 */}
          <div className={styles.field}>
            <span className={styles.labelLite}>배경을 선택해주세요</span>

            {/* 1줄: 발바닥 + 파스텔 3개 */}
            <div className={styles.bgGrid}>
              {colorTiles.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.bgTile} ${
                    isSelected({ kind: 'color', value: t.value }) ? styles.selected : ''
                  }`}
                  style={{ backgroundColor: t.value }}
                  onClick={() => selectBackground({ kind: 'color', value: t.value })}
                  aria-label="색상 배경 선택"
                >
                  {isSelected({ kind: 'color', value: t.value }) && (
                    <img className={styles.tileIcon} src={pawSelected} alt="" />
                  )}
                </button>
              ))}
            </div>

            {/* 2줄: 사진 4개 */}
            <div className={styles.bgGrid}>
              {imageTiles.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.bgTile} ${
                    isSelected({ kind: 'image', value: t.value }) ? styles.selected : ''
                  }`}
                  style={{
                    backgroundImage: t.value,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => selectBackground({ kind: 'image', value: t.value })}
                  aria-label="이미지 배경 선택"
                >
                  {isSelected({ kind: 'image', value: t.value }) && (
                    <img className={styles.tileIcon} src={pawSelected} alt="" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 비밀번호 */}
          <Input type="password" />

          <div className={styles.btnRow}>
            <button className={styles.submitBtn} type="submit">
              <span className={styles.btnText}>만들기</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
