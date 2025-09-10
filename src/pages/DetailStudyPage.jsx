import styles from '@styles/pages/DetailStudyPage.module.scss';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/axios.js';

import Toast from '@/components/toast/Toast.jsx';
import Emoji from '@/components/emoji/Emoji';
import Tag from '@/components/tag/Tag';
import PasswordModal from '@/components/modal/PasswordModal';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import Header from '@/components/header/Header.jsx';
import { addRecentStudy } from '@/lib/recentStudies';

export default function DetailStudyPage() {
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [habitsState, setHabitsState] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalStudyName, setModalStudyName] = useState('스터디 이름');
  const [modalAction, setModalAction] = useState(null); // 'habit' | 'focus' | 'modify'
  const [modalError, setModalError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const { studyId } = useParams();
  const navigate = useNavigate();

  const isMountedRef = useRef(true);

  const fetchStudy = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/studies/${studyId}`);
      if (isMountedRef.current) {
        setStudy(res.data.data ?? null);
        addRecentStudy({
          id: res.data.data.id,
          studyName: res.data.data.studyName,
          backgroundImg: res.data.data.backgroundImg,
          nickName: res.data.data.nickName,
          description: res.data.data.description,
          totalPoints: res.data.data.totalPoints,
          createdAt: res.data.data.createdAt,
        });
      }
    } catch (err) {
      if (isMountedRef.current) setError(err);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchStudy();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchStudy, studyId]);

  const openPasswordModal = (name, action = 'modify') => {
    setModalStudyName(name ?? study?.studyName ?? '스터디 이름');
    setModalAction(action);
    setModalError(null);
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setModalError(null);
    setShowPasswordModal(false);
  };

  const handlePasswordConfirm = async (password) => {
    setModalError(null);
    if (!password) {
      setModalError('비밀번호를 입력해주세요');
      return;
    }

    try {
      const res = await api.get(`/habits/${studyId}/today?password=${password}`);
      if (res?.data?.success) {
        // if (modalAction === 'focus') navigate(`/focus/${studyId}`); // 페이지 만들면 아래꺼랑 교체
        if (modalAction === 'focus') navigate(`/focus/${studyId}`);
        else {
          navigate(`/habit/${studyId}`, { state: { password: password } });
        }
        setShowPasswordModal(false);
        return;
      }
      setModalError('비밀번호가 일치하지 않습니다');
    } catch (err) {
      setModalError('비밀번호가 일치하지 않습니다');
    }
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: study?.studyName || '스터디',
          text: study?.description || '스터디를 공유합니다',
          url: currentUrl,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          alert('링크가 복사되었습니다!');
        })
        .catch(() => {
          alert('링크 복사에 실패했습니다.');
        });
    }
  };

  const openDeleteModal = () => {
    setDeleteError(null);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteError(null);
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async (password) => {
    setDeleteError(null);
    if (!password) {
      setDeleteError('비밀번호를 입력해주세요');
      return;
    }

    try {
      const res = await api.delete(`/studies/${studyId}`, {
        data: { password },
      });
      alert('스터디가 삭제되었습니다.');
      navigate('/');
      return;
    } catch (err) {
      setDeleteError('비밀번호가 일치하지 않습니다');
    }
  };

  const toggleHabit = async (habitId) => {
    try {
      setLoading(true);
      setError(null);
      await api.post(`/habitChecks/${studyId}/${habitId}/habitCheck/toggle`);
      await fetchStudy();
    } catch (err) {
      setError(err);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const fallbackHabits = [
    { id: 1, title: '미라클모닝 6시 기상', records: [true, false, true, true, false, true, false] },
    { id: 2, title: '아침 챙겨 먹기', records: [false, true, false, false, false, false, false] },
    {
      id: 3,
      title: 'React 스터디 책 1챕터 읽기',
      records: [true, false, false, false, false, false, false],
    },
    { id: 4, title: '스트레칭', records: [false, false, false, false, false, false, false] },
    { id: 5, title: '사이드 프로젝트', records: [false, false, false, false, false, false, false] },
    { id: 6, title: '물 2L 마시기', records: [false, false, false, false, false, false, false] },
  ];

  const habits =
    study?.weeklyHabits
      ?.filter((h) => !h.isDeleted)
      .map((h) => ({
        id: h.habitId,
        title: h.habitName,
        records: h.isCompleted,
      })) ?? fallbackHabits;

  const habitColors = [
    '#D2E869',
    '#B2D570',
    '#99C08E',
    '#97CFD8',
    '#89D5C9',
    '#4CDD84',
    '#73E8F2',
    '#06C0E1',
    '#0189BE',
    '#C7A8DA',
    '#C589DE',
    '#CD69A7',
    '#FDE3A6',
    '#FED054',
    '#FF9E01',
    '#FFA3A5',
    '#F885A7',
    '#E26575',
  ];

  return (
    <>
      <Header />
      <div className={`${styles.overlay} ${showPasswordModal ? styles.active : ''}`}>
        <PasswordModal
          studyName={modalStudyName}
          onClose={closePasswordModal}
          onClick={handlePasswordConfirm}
          btnType={modalAction === 'habit' ? 'habit' : modalAction === 'focus' ? 'focus' : 'modify'}
        />
        {modalError && (
          <div className={styles.toast}>
            <Toast
              type={'study'}
              toastStudyText={'🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.'}
            />
          </div>
        )}
      </div>
      <div className={`${styles.overlay} ${showDeleteModal ? styles.active : ''}`}>
        <DeleteConfirmModal
          studyName={study?.studyName || '스터디 이름'}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          errorMessage={deleteError}
        />
      </div>
      <div className={styles.root}>
        {/* 상단 헤더 영역 */}
        <div className={styles.header}>
          <Emoji studyId={studyId} />
          <div className={styles.adminButtons}>
            <button type="button" onClick={handleShare}>
              공유하기
            </button>
            <button type="button" onClick={() => openPasswordModal(study?.studyName, 'modify')}>
              수정하기
            </button>
            <button type="button" onClick={openDeleteModal}>
              스터디 삭제하기
            </button>
          </div>
        </div>

        {/* 소개 및 포인트 */}
        <section className={styles.intro} aria-label="스터디 소개 및 포인트">
          <div className={styles.top}>
            <h1>{study?.studyName ?? '연우의 개발 공장'}</h1>
            <div className={styles.userButtons}>
              <button type="button" onClick={() => openPasswordModal(study?.studyName, 'habit')}>
                오늘의 습관
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none"
                >
                  <path
                    d="M1 1L6 6.5L1 12"
                    stroke="#818181"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button type="button" onClick={() => openPasswordModal(study?.studyName, 'focus')}>
                오늘의 집중
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none"
                >
                  <path
                    d="M1 1L6 6.5L1 12"
                    stroke="#818181"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <h3>소개</h3>
          <p>{study?.description ?? 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅'}</p>

          <div>
            <h3>현재까지 획득한 포인트</h3>
            <div>
              <Tag
                bgColor={'rgba(255,255,255,0.3)'}
                fontSize={12}
                points={study?.totalPoints ?? 0}
              />
            </div>
          </div>
        </section>

        {/* 습관 기록표(마크업만) */}
        <section className={styles.record} aria-label="습관 기록표">
          <h2>습관 기록표</h2>

          <div>
            {habits.length === 0 ? (
              <p className={styles.habitMsg}>
                아직 습관이 없어요.
                <br /> 오늘의 습관에서 습관을 생성해 보세요
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    {days.map((d) => (
                      <th key={d} scope="col">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {habits.map((habit, hIdx) => (
                    <tr key={habit.id}>
                      <td
                        className={styles.habitTitle}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleHabit(habit.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleHabit(habit.id);
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {habit.title}
                      </td>
                      {habit.records.map((ok, idx) => (
                        <td key={idx} aria-label={`${habit.title}-${days[idx]}`}>
                          <div className={styles.pawCell}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36ZM13.0597 12.5388C13.4071 13.9147 14.3896 14.8309 15.2542 14.5851C16.1187 14.3393 16.5378 13.0247 16.1903 11.6487C15.8429 10.2728 14.8604 9.35658 13.9958 9.60237C13.1313 9.84816 12.7122 11.1628 13.0597 12.5388ZM14.2627 20.8487C15.6007 18.1249 16.2696 16.763 17.2325 16.4385C17.7309 16.2705 18.2691 16.2705 18.7675 16.4385C19.7304 16.763 20.3993 18.1249 21.7373 20.8487L22.4787 22.3582L22.4787 22.3582C22.8243 23.0619 22.9971 23.4137 23.0381 23.6534C23.2078 24.6479 22.472 25.5645 21.4808 25.5934C21.2419 25.6004 20.8688 25.4981 20.1225 25.2936L20.1225 25.2936C19.696 25.1767 19.4828 25.1183 19.2696 25.0751C18.4314 24.9055 17.5686 24.9055 16.7304 25.0751C16.5172 25.1183 16.304 25.1767 15.8775 25.2936L15.8775 25.2936C15.1312 25.4981 14.7581 25.6004 14.5192 25.5934C13.528 25.5645 12.7922 24.6479 12.9619 23.6534C13.0029 23.4137 13.1757 23.0618 13.5213 22.3582L14.2627 20.8487ZM20.7458 14.5851C21.6104 14.8309 22.5929 13.9147 22.9403 12.5388C23.2878 11.1628 22.8687 9.84816 22.0042 9.60237C21.1396 9.35658 20.1571 10.2728 19.8097 11.6487C19.4622 13.0247 19.8813 14.3393 20.7458 14.5851ZM9.73265 18.2507C10.1123 19.2674 11.005 19.885 11.7266 19.6301C12.4481 19.3751 12.7252 18.3442 12.3455 17.3274C11.9658 16.3107 11.0731 15.6931 10.3516 15.9481C9.63006 16.203 9.35296 17.2339 9.73265 18.2507ZM24.2735 19.6301C24.995 19.885 25.8877 19.2674 26.2674 18.2507C26.647 17.2339 26.3699 16.203 25.6484 15.9481C24.9269 15.6931 24.0342 16.3107 23.6545 17.3274C23.2748 18.3442 23.5519 19.3751 24.2735 19.6301Z"
                                fill={ok ? habitColors[hIdx % habitColors.length] : '#EEEEEE'}
                              />
                            </svg>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
