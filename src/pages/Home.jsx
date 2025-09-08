// src/pages/Home.jsx
import React, { useMemo, useState, useEffect } from 'react';
import Input from '@components/input/Input.jsx'; // 별칭(@components) 사용 중이면 그대로 두세요.
import { StudyCard } from '@components/card/card.jsx';
import styles from '@styles/pages/Home.module.scss';

// 더미 데이터 (실제 API 연동 시 교체)
const RECENT_STUDIES = [
  {
    id: 'r1',
    variant: 'dark',
    title: 'UI/UX 기초 스터디',
    daysText: '23일째 진행 중',
    subtitle: '매일 1시간씩 UI/UX 감상문',
    points: 120,
    thumbnail:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
    stats: { members: 12, heat: 5, likes: 8 },
  },
  {
    id: 'r2',
    variant: 'light',
    title: '리액트 입문 스터디',
    daysText: '12일째 진행 중',
    subtitle: '컴포넌트/훅 기본기 다지기',
    points: 90,
    stats: { members: 21, heat: 9, likes: 10 },
  },
  {
    id: 'r3',
    variant: 'light',
    title: '타입스크립트 한 걸음',
    daysText: '5일째 진행 중',
    subtitle: 'TS 기본 타입 & 제네릭',
    points: 55,
    stats: { members: 8, heat: 3, likes: 2 },
  },
];

const BROWSE_STUDIES = [
  {
    id: 'b1',
    variant: 'dark',
    title: '이유디의 UX 스터디',
    daysText: '62일째 진행 중',
    subtitle: 'Slow And Steady Wins The Race!!',
    points: 310,
    thumbnail:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
    stats: { members: 37, heat: 26, likes: 14 },
  },
  {
    id: 'b2',
    variant: 'light',
    title: '프론트엔드 크루 스터디',
    daysText: '41일째 진행 중',
    subtitle: '문서화 & 코드리뷰 습관화',
    points: 250,
    stats: { members: 18, heat: 17, likes: 9 },
  },
  {
    id: 'b3',
    variant: 'light',
    title: '알고리즘 30제',
    daysText: '10일째 진행 중',
    subtitle: '매일 1문제',
    points: 70,
    stats: { members: 45, heat: 32, likes: 20 },
  },
  {
    id: 'b4',
    variant: 'light',
    title: '디자인 시스템 맛보기',
    daysText: '3일째 진행 중',
    subtitle: '토큰/컴포넌트/패턴',
    points: 30,
    stats: { members: 9, heat: 7, likes: 4 },
  },
  {
    id: 'b5',
    variant: 'light',
    title: '리덕스 기초',
    daysText: '7일째 진행 중',
    subtitle: '상태관리 첫걸음',
    points: 48,
    stats: { members: 16, heat: 12, likes: 6 },
  },
  {
    id: 'b6',
    variant: 'light',
    title: '네이밍 컨벤션 연구회',
    daysText: '15일째 진행 중',
    subtitle: '읽기 쉬운 이름이 생산성',
    points: 100,
    stats: { members: 6, heat: 2, likes: 1 },
  },
];

export default function Home() {
  // 검색 키워드
  const [keyword, setKeyword] = useState('');

  // "둘러보기" 초기 노출 개수
  const INITIAL_VISIBLE = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // 검색 필터
  const filteredBrowse = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return BROWSE_STUDIES;
    return BROWSE_STUDIES.filter(
      (s) => s.title.toLowerCase().includes(k) || s.subtitle.toLowerCase().includes(k),
    );
  }, [keyword]);

  // 현재 표시되는 카드 리스트
  const visibleBrowse = useMemo(
    () => filteredBrowse.slice(0, visibleCount),
    [filteredBrowse, visibleCount],
  );

  // 더보기 표시 여부
  const canShowMore = filteredBrowse.length > visibleCount;

  // 더보기 클릭 → 아래로 확장(전부 표시)
  const handleShowAll = () => setVisibleCount(filteredBrowse.length);

  // 검색 키워드가 바뀔 때마다 표시 개수 초기화
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [keyword]);

  // Input.jsx가 이벤트/값 둘 다 올 수 있어 안전 처리
  const handleKeywordChange = (vOrEvt) => {
    const next = typeof vOrEvt === 'string' ? vOrEvt : (vOrEvt?.target?.value ?? '');
    setKeyword(next);
  };

  return (
    <main className={styles.page}>
      {/* 바깥 직사각형 프레임 */}

      {/* 1) 최근 조회한 스터디 */}
      <section className={styles.sectionBox}>
        <h2 className={styles.title}>최근 조회한 스터디</h2>

        <div className={styles.grid}>
          {RECENT_STUDIES.map((s) => (
            <StudyCard key={s.id} {...s} />
          ))}
        </div>
      </section>

      {/* 2) 스터디 둘러보기 */}
      <section className={`${styles.sectionBox} ${styles.sectionGap}`}>
        <h2 className={styles.title}>스터디 둘러보기</h2>

        {/* 검색창 + 드롭다운 (자리만 확보) */}
        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Input
              name="study-search"
              label={null}
              type="search"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="스터디 검색(제목/부제목)"
              required={false}
            />
          </div>

          <div className={styles.dropdownPlaceholder}>드롭다운 (제작 예정)</div>
        </div>

        {/* 카드 리스트 */}
        <div className={styles.grid}>
          {visibleBrowse.map((s) => (
            <StudyCard key={s.id} {...s} />
          ))}
        </div>

        {/* 검색 결과 없음 */}
        {filteredBrowse.length === 0 && <p className={styles.empty}>검색 결과가 없습니다.</p>}

        {/* 더보기 (더 보여줄 카드 없으면 자동 숨김) */}
        {canShowMore && (
          <div className={styles.moreWrap}>
            <button type="button" className={styles.moreBtn} onClick={handleShowAll}>
              더보기
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
