import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Toast from '@/components/toast/Toast.jsx';


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

export default function CreateStudyPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();


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

  const [form, setForm] = useState({
    nickName: '',
    studyName: '',
    description: '',
    password: '',
    backgroundImg: 'green',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('point');
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    if (studyId) {
      const fetchStudyData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/studies/${studyId}`);
          const studyData = response.data.data;
          
          setForm(prev => ({
            ...prev,
            nickName: studyData.nickName || '',
            studyName: studyData.studyName || '',
            description: studyData.description || '',
            backgroundImg: studyData.backgroundImg || 'green',
            // password는 비워둠
          }));
        } catch (error) {
          console.error('스터디 데이터 로드 실패:', error);
          showToastMessage('warning', '🚨 스터디 데이터를 불러오는데 실패했습니다.');
          navigate('/');
        } finally {
          setLoading(false);
        }
      };

      fetchStudyData();
    }
  }, [studyId, navigate]);

  const onNickNameChange = (value) => setForm((f) => ({ ...f, nickName: value }));
  const onStudyNameChange = (value) => setForm((f) => ({ ...f, studyName: value }));
  const onDescriptionChange = (value) => setForm((f) => ({ ...f, description: value }));
  const onPasswordChange = (value) => setForm((f) => ({ ...f, password: value }));

  const selectBackground = (bg) => {
    setForm((f) => ({ ...f, backgroundImg: bg?.value || 'green' }));
  };

  const createStudyData = async (formData) => {
    const response = await api.post('/studies', formData);
    return {
      success: true,
      message: '스터디가 성공적으로 생성되었습니다.',
      data: response.data,
    };
  };

  const updateStudyData = async (formData) => {
    const response = await api.patch(`/studies/${studyId}`, formData);
    return {
      success: true,
      message: '스터디가 성공적으로 수정되었습니다.',
      data: response.data,
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!form.studyName.trim() || !form.nickName.trim()) {
      showToastMessage('warning', '🚨 닉네임과 스터디 이름을 입력해주세요.');
      return;
    }

    if (!form.password.trim()) {
      showToastMessage('warning', '🚨 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      let result;
      
      if (studyId) {
        // 수정 모드
        result = await updateStudyData(form);
        showToastMessage('point', '🎉 스터디가 성공적으로 수정되었습니다.');
        setTimeout(() => navigate(`/study/${studyId}`), 1000);
      } else {
        // 생성 모드
        result = await createStudyData(form);
        setTimeout(() => navigate(`/study/${result.data.data.id}`), 1000);
      }
    } catch (error) {
      console.error(studyId ? '스터디 수정 실패' : '스터디 생성 실패', error);
      showToastMessage('warning', studyId ? '🚨 스터디 수정에 실패했습니다. 다시 시도해주세요.' : '🚨 스터디 생성에 실패했습니다. 다시 시도해주세요.');
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
      {showToast && (
        <div className={styles.toast}>
          <Toast
            type={toastType}
            toastStudyText={toastMessage}
          />
        </div>
      )}
      <Header />
      <div className={styles.page}>
        <main className={styles.card}>
          <h2 className={styles.title}>{studyId ? '스터디 수정하기' : '스터디 만들기'}</h2>

          <form onSubmit={onSubmit} noValidate>
            <Input type="nickName" onValueChange={onNickNameChange} value={form.nickName} />
            <Input type="studyName" onValueChange={onStudyNameChange} value={form.studyName} />

            <div className={styles.field}>
              <TextArea onValueChange={onDescriptionChange} value={form.description} />
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

            <Input type={studyId ? "passwordOnly" : "password"} onValueChange={onPasswordChange} />

            <div className={styles.btnRow}>
              <Button childrenType={studyId ? "completeModify" : "create"} type="submit" disabled={isSubmitting} />
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
