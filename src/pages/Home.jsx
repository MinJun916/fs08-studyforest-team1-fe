import Header from '@/components/header/Header';
import styles from '@styles/pages/Home.module.scss';
import Input from '@/components/input/Input';
import DropDown, { SORTOPTIONS } from '@/components/dropDown/DropDown';
import RecentStudies from '@/components/organisms/RecentStudies';
import StudyCard from '@/components/card/StudyCard';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';
// ===== 테스트용 import 시작 =====
import { addTestRecentStudies } from '@/lib/recentStudies';
// ===== 테스트용 import 끝 =====

function Home() {
  const [hasRecentStudies, setHasRecentStudies] = useState(false);

  const [allStudies, setAllStudies] = useState([]);
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [displayedStudies, setDisplayedStudies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const LIMIT = 6; // 총 6개로 고정
  const [displayCount, setDisplayCount] = useState(LIMIT);

  // ===== 테스트용 자동 데이터 로드 시작 =====
  // 페이지 로드 시 자동으로 테스트 데이터 추가 (실제 배포 시 제거)
  if (!hasRecentStudies) {
    addTestRecentStudies();
    setHasRecentStudies(true);
  }
  // ===== 테스트용 자동 데이터 로드 끝 =====

  const fetchAllStudies = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const params = {
        offset: 0,
        limit: 100,
        order: sortOrder,
      };

      const res = await api.get('/studies', { params });
      const studies = res.data.data || [];
      setAllStudies(studies);
    } catch (error) {
      console.error('스터디 목록 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterStudies = (studies, keyword) => {
    if (!keyword.trim()) return studies;

    const lowerKeyword = keyword.toLowerCase();
    return studies.filter(
      (study) =>
        study.studyName?.toLowerCase().includes(lowerKeyword) ||
        study.nickName?.toLowerCase().includes(lowerKeyword) ||
        study.description?.toLowerCase().includes(lowerKeyword),
    );
  };

  const sortStudies = (studies, order) => {
    const sorted = [...studies];

    switch (order) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'points':
      case 'points_desc':
        return sorted.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
      case 'points_asc':
        return sorted.sort((a, b) => (a.totalPoints || 0) - (b.totalPoints || 0));
      default:
        return sorted;
    }
  };

  const updateDisplayedStudies = () => {
    const filtered = filterStudies(allStudies, searchKeyword);
    setFilteredStudies(filtered);

    const sorted = sortStudies(filtered, sortOrder);

    const displayed = sorted.slice(0, displayCount);
    setDisplayedStudies(displayed);

    setHasMore(displayed.length < sorted.length);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + LIMIT);
  };

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setDisplayCount(LIMIT);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setDisplayCount(LIMIT);
  };

  useEffect(() => {
    fetchAllStudies();
  }, []);

  useEffect(() => {
    if (allStudies.length > 0) {
      updateDisplayedStudies();
    }
  }, [allStudies, searchKeyword, sortOrder, displayCount]);

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.recentStudies}>
          <div className={`${styles.title} ${styles.recentStudiesTitle}`}>최근 조회한 스터디</div>
          <RecentStudies onDataChange={setHasRecentStudies} />
        </div>
        <div className={styles.discoverStudies}>
          <div className={styles.contentsWrapper}>
            <div className={styles.title}>스터디 둘러보기</div>
            <div className={styles.controlsWrapper}>
              <Input type="search" className={styles.search} onValueChange={handleSearchChange} />
              <DropDown
                className={styles.dropdown}
                options={SORTOPTIONS}
                value={sortOrder}
                onChange={handleSortChange}
              />
            </div>
            <div className={styles.studyCardContainer}>
              {displayedStudies.length > 0
                ? displayedStudies.map((study) => <StudyCard key={study.id} studyId={study.id} />)
                : !loading && <div className={styles.empty}>스터디가 없습니다.</div>}
              {loading && <div className={styles.loading}>로딩 중...</div>}
            </div>
          </div>
          {hasMore && (
            <div className={styles.moreBtnWrapper}>
              <button
                type="button"
                className={styles.moreBtn}
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? '로딩 중...' : '더보기'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
