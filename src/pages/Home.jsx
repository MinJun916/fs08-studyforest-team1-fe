import Header from '@/components/header/Header';
import styles from '@styles/pages/Home.module.scss';
import Input from '@/components/input/Input';
import DropDown, { SORTOPTIONS } from '@/components/dropDown/DropDown';
import RecentStudies from '@/components/card/RecentStudies';
import StudyCard from '@/components/card/StudyCard';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';

function Home() {
  const [hasRecentStudies, setHasRecentStudies] = useState(false);

  const [allStudies, setAllStudies] = useState([]);
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [displayedStudies, setDisplayedStudies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [totalCount, setTotalCount] = useState(0);
  const LIMIT = 6; // 총 6개로 고정
  const [displayCount, setDisplayCount] = useState(LIMIT);

  const fetchStudies = async (offset = 0, limit = LIMIT) => {
    if (loading) return { studies: [], totalCount: 0 };

    setLoading(true);
    try {
      const params = {
        offset,
        limit,
        order: sortOrder,
      };

      const res = await api.get('/studies', { params });
      const studies = res.data.data || [];
      const totalCount = res.data.totalCount || 0;

      return { studies, totalCount };
    } catch (error) {
      console.error('스터디 목록 가져오기 실패:', error);
      return { studies: [], totalCount: 0 };
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStudies = async () => {
    // 초기에는 필요한 만큼만 가져오기 (LIMIT * 2 정도로 충분)
    const initialLimit = Math.min(LIMIT * 2, 20); // 최대 20개까지만
    const { studies, totalCount } = await fetchStudies(0, initialLimit);
    setAllStudies(studies);
    setTotalCount(totalCount);
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

    // totalCount를 활용해서 hasMore 계산
    setHasMore(displayed.length < totalCount);
  };

  const handleLoadMore = async () => {
    if (loading) return;

    // 현재 표시된 개수가 totalCount보다 적으면 더 가져오기
    if (displayedStudies.length < totalCount) {
      const { studies } = await fetchStudies(displayedStudies.length, LIMIT);
      if (studies.length > 0) {
        setAllStudies((prev) => [...prev, ...studies]);
        setDisplayCount((prev) => prev + LIMIT);
      }
    }
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
  }, [sortOrder]);

  useEffect(() => {
    if (allStudies.length > 0) {
      updateDisplayedStudies();
    }
  }, [allStudies, searchKeyword, sortOrder, displayCount, totalCount]);

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
                ? displayedStudies.map((study) => (
                    <StudyCard
                      key={study.id}
                      studyId={study.id}
                      nickName={study.nickName}
                      studyName={study.studyName}
                      description={study.description}
                      backgroundImg={study.backgroundImg}
                      totalPoints={study.totalPoints}
                      createdAt={study.createdAt}
                      emojis={study.emojis || []}
                    />
                  ))
                : !loading && <div className={styles.empty}>아직 둘러 볼 스터디가 없어요</div>}
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
