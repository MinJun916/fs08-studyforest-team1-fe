import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios.js';
import styles from '@/styles/pages/CreateStudyPage.module.scss';

import pawSelected from '@assets/icons/ic_bg_selected.png';

// 이미지 import
import alvaroImg from '@assets/backgroundImg/alvaro-reyes-zvmZiw3vdsQ-unsplash.jpg';
import mikeyImg from '@assets/backgroundImg/mikey-harris-kw0z6RyvC0s-unsplash.jpg';
import andrewImg from '@assets/backgroundImg/andrew-ridley-jR4Zf-riEjI-unsplash.jpg';
import chrisImg from '@assets/backgroundImg/chris-lee-70l1tDAI6rM-unsplash.jpg';

import Input from '@/components/input/Input.jsx';
import TextArea from '@/components/input/TextArea.jsx';
import Button from '@/components/button/Button.jsx';
import Header from '@/components/header/Header.jsx';

export default function CreateStudyPage() {
  const navigate = useNavigate();

  const colorMapping = {
    green: '#DDE7D5',
    yellow: '#F8EAB9',
    blue: '#DAEBF0',
    pink: '#F7DCE1',
  };

  const imageMapping = {
    alvaro: alvaroImg,
    mikey: mikeyImg,
    andrew: andrewImg,
    chris: chrisImg,
  };

  const getRenderStyle = (bg) => {
    if (!bg || !bg.kind || !bg.value) return {};

    if (bg.kind === 'color') {
      return { backgroundColor: colorMapping[bg.value] || bg.value };
    } else if (bg.kind === 'image') {
      return {
        backgroundImage: `url(${imageMapping[bg.value]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {};
  };

  const colorTiles = [
    { id: 'c1', kind: 'color', value: 'green' },
    { id: 'c2', kind: 'color', value: 'yellow' },
    { id: 'c3', kind: 'color', value: 'blue' },
    { id: 'c4', kind: 'color', value: 'pink' },
  ];

  const imageTiles = [
    { id: 'g1', kind: 'image', value: 'alvaro' },
    { id: 'g2', kind: 'image', value: 'mikey' },
    { id: 'g3', kind: 'image', value: 'andrew' },
    { id: 'g4', kind: 'image', value: 'chris' },
  ];

  const [form, setForm] = useState({
    nickName: '',
    studyName: '',
    description: '',
    password: '',
    backgroundImg: 'green',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onNickNameChange = (value) => setForm((f) => ({ ...f, nickName: value }));
  const onStudyNameChange = (value) => setForm((f) => ({ ...f, studyName: value }));
  const onDescriptionChange = (value) => setForm((f) => ({ ...f, description: value }));
  const onPasswordChange = (value) => setForm((f) => ({ ...f, password: value }));

  const selectBackground = (bg) => {
    setForm((f) => ({ ...f, backgroundImg: bg?.value || 'green' }));
  };

  const submitStudyData = async (formData) => {
    const response = await api.post('/studies', formData);
    return {
      success: true,
      message: '스터디가 성공적으로 생성되었습니다.',
      data: response.data,
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!form.studyName.trim() || !form.nickName.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await submitStudyData(form);
      navigate(`/study/${result.data.data.id}`);
    } catch (error) {
      console.error('스터디 생성 실패', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const norm = (x) => (x ?? '').toString().trim().toLowerCase();
  const isSelected = (bg) => {
    if (!bg || !bg.value) return false;
    const sel = form.backgroundImg;
    return !!sel && norm(sel) === norm(bg.value);
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <main className={styles.card}>
          <h2 className={styles.title}>스터디 만들기</h2>

          <form onSubmit={onSubmit} noValidate>
            <Input type="nickName" onValueChange={onNickNameChange} />
            <Input type="studyName" onValueChange={onStudyNameChange} />

            <div className={styles.field}>
              <TextArea onValueChange={onDescriptionChange} />
            </div>

            <div className={styles.field}>
              <span className={styles.labelLite}>배경을 선택해주세요</span>
              <div className={styles.bgGrid}>
                {colorTiles.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.bgTile} ${isSelected(t) ? styles.selected : ''}`}
                    style={getRenderStyle({ kind: 'color', value: t.value })}
                    onClick={() => selectBackground({ kind: 'color', value: t.value })}
                    aria-label="색상 배경 선택"
                  >
                    {isSelected(t) && <img className={styles.tileIcon} src={pawSelected} alt="" />}
                  </button>
                ))}
              </div>

              <div className={styles.bgGrid}>
                {imageTiles.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.bgTile} ${isSelected(t) ? styles.selected : ''}`}
                    style={getRenderStyle({ kind: 'image', value: t.value })}
                    onClick={() => selectBackground({ kind: 'image', value: t.value })}
                    aria-label="이미지 배경 선택"
                  >
                    {isSelected(t) && <img className={styles.tileIcon} src={pawSelected} alt="" />}
                  </button>
                ))}
              </div>
            </div>

            <Input type="password" onValueChange={onPasswordChange} />

            <div className={styles.btnRow}>
              <Button childrenType="create" type="submit" disabled={isSubmitting} />
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
