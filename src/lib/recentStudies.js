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
  return list; // [{id, studyName, backgroundImg, nickName, description, totalPoints, createdAt, viewedAt}, ...]
}

/**
 * 최근목록에 추가(중복 제거 + 맨앞 삽입 + 사이즈 제한)
 */
export function addRecentStudy(study) {
  // study: { id, studyName, backgroundImg, nickName, description, totalPoints, createdAt }
  // StudyCard가 필요한 모든 props를 저장
  const now = Date.now();
  const prev = readRaw().filter((item) => item.id !== study.id);
  const next = [{ ...study, viewedAt: now }, ...prev].slice(0, MAX_ITEMS);
  writeRaw(next);
}

/** 전체 삭제(옵션) */
export function clearRecentStudies() {
  localStorage.removeItem(STORAGE_KEY);
}
