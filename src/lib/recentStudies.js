// src/lib/recentStudies.js
const STORAGE_KEY = 'recent_studies';
const MAX_ITEMS = 8; // 원하는 개수로 조절
const TTL_MS = 1000 * 60 * 60 * 24 * 14; // 14일 유효(원하면 0으로 꺼도 됨)

function readRaw() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

function writeRaw(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * 최근목록 조회 (만료된 아이템 자동 제거)
 */
export function getRecentStudies() {
  const now = Date.now();
  const list = readRaw().filter((item) => {
    if (!TTL_MS) return true;
    return now - item.viewedAt <= TTL_MS;
  });
  // 만료 제거 후 저장 동기화
  if (list.length !== readRaw().length) writeRaw(list);
  return list; // [{id, name, cover, viewedAt}, ...]
}

/**
 * 최근목록에 추가(중복 제거 + 맨앞 삽입 + 사이즈 제한)
 */
export function addRecentStudy(study) {
  // study: { id, name, cover } 최소 이 3가지만 넣어도 충분
  const now = Date.now();
  const prev = readRaw().filter((item) => item.id !== study.id);
  const next = [{ ...study, viewedAt: now }, ...prev].slice(0, MAX_ITEMS);
  writeRaw(next);
}

/** 전체 삭제(옵션) */
export function clearRecentStudies() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 테스트용 임시 데이터 추가
 */
export function addTestRecentStudies() {
  const testStudies = [
    {
      id: '430a8f4e-9810-4e95-9df1-7295e7fcbe0d',
      name: '스터디 생성 페이지 테스트 44',
      cover: 'mikey',
      viewedAt: Date.now() - 1000 * 60 * 30, // 30분 전
    },
    {
      id: '32a3b878-5f3f-49de-bbbd-8f5f23570e29',
      name: '스터디 생성 테스트 중 33',
      cover: 'mikey',
      viewedAt: Date.now() - 1000 * 60 * 60 * 2, // 2시간 전
    },
    {
      id: '6c9362f2-b02d-422f-896b-3c4d0bd6c3de',
      name: '테스트 생성 페이지 테스트 22',
      cover: 'alvaro',
      viewedAt: Date.now() - 1000 * 60 * 60 * 24, // 1일 전
    },
  ];

  writeRaw(testStudies);
  return testStudies;
}
