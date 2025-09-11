import { useState, useEffect } from 'react';
import StudyCard from '@/components/card/StudyCard';
import Input from '@/components/input/Input';
import DropDown, { SORTOPTIONS } from '@/components/dropDown/DropDown';
import RecentStudies from '@/components/card/RecentStudies';
import Spinner from '@/components/spinner/Spinner';

import api from '@/lib/axios';
import styles from '@styles/pages/Home.module.scss';

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
  const [displayCount, setDisplayCount] = useState(6);

  const fetchStudies = async (offset = 0, limit = displayCount) => {
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

  /**
   * 초기 스터디 데이터를 로드하는 함수
   * 성능 최적화를 위해 필요한 만큼만 가져옴
   */
  const fetchAllStudies = async () => {
    const initialLimit = Math.min(displayCount * 2, 20);
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

  /**
   * 스터디 목록을 정렬하는 함수
   */
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

  /**
   * 필터링, 정렬, 페이징을 적용하여 표시할 스터디 목록을 업데이트하는 함수
   */
  const updateDisplayedStudies = () => {
    const filtered = filterStudies(allStudies, searchKeyword);
    setFilteredStudies(filtered);

    const sorted = sortStudies(filtered, sortOrder);

    const displayed = sorted.slice(0, displayCount);
    setDisplayedStudies(displayed);

    setHasMore(displayed.length < totalCount);
  };

  /**
   * 더 많은 스터디를 로드하는 함수
   * 무한 스크롤 방식으로 동작
   */
  const handleLoadMore = async () => {
    if (loading) return;

    if (displayedStudies.length < totalCount) {
      const { studies } = await fetchStudies(displayedStudies.length, displayCount);
      if (studies.length > 0) {
        setAllStudies((prev) => [...prev, ...studies]);
        setDisplayCount((prev) => prev + displayCount);
      }
    }
  };

  /**
   * 검색 키워드 변경 핸들러
   * 검색 시 표시 개수를 초기화하여 첫 페이지부터 보여줌
   */
  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setDisplayCount(displayCount);
  };

  /**
   * 정렬 기준 변경 핸들러
   * 정렬 변경 시 표시 개수를 초기화하여 첫 페이지부터 보여줌
   */
  const handleSortChange = (value) => {
    setSortOrder(value);
    setDisplayCount(displayCount);
  };

  // 정렬 기준이 변경될 때마다 스터디 목록을 다시 가져옴
  useEffect(() => {
    fetchAllStudies();
  }, [sortOrder]);

  // 스터디 데이터나 필터 조건이 변경될 때마다 표시 목록을 업데이트
  useEffect(() => {
    if (allStudies.length > 0) {
      updateDisplayedStudies();
    }
  }, [allStudies, searchKeyword, sortOrder, displayCount, totalCount]);

  return (
    <div>
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
              {loading && <Spinner loading={loading} overlay={true} />}
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
                {loading ? <Spinner loading={loading} size={12} /> : '더보기'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
