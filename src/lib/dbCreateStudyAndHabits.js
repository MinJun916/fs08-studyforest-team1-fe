// 실행 맥락: 프론트(React/Vite)나 간단한 node 스크립트 어디서든 동작
import api from '@/lib/axios';

async function createStudyAndHabits() {
  // 1) 스터디 생성 (이름은 내가 지어줄게)
  const studyName = `민준의 집중 스터디 테스트33`;

  // 스웨거에 맞춰 필드명은 프로젝트마다 다를 수 있음:
  // 예시: { studyName, description, backgroundImg, password }
  const studyRes = await api.post('/studies', {
    nickName: '민준',
    studyName,
    description: '자동 생성된 스터디입니다.',
    backgroundImg: 'blue',
    password: '1234',
  });

  // API 응답 구조 확인
  console.log('API 응답:', studyRes.data);

  // 응답 형태에 따라 안전하게 처리
  const study = studyRes.data.data.studyName || studyRes.data.data.name;
  const studyId = studyRes.data.data.id;

  console.log('생성된 스터디 ID:', studyId);
  console.log('생성된 스터디 이름:', study);

  // 2) 습관 5개 생성
  const habitNames = [
    '자료구조 문제 1개 풀기',
    '운동 1시간',
    '독서 30분',
    '영어 단어 20개',
    '코딩 1커밋',
  ];

  const createdHabits = [];

  for (const habitName of habitNames) {
    try {
      const habitRes = await api.post(`/habits/create/${studyId}`, {
        name: habitName,
      });

      console.log(`${habitName} 생성 응답:`, habitRes.data);

      const createdName = habitRes.data.data?.name || habitRes.data.name || habitName;
      createdHabits.push(createdName);
      console.log('생성된 습관:', createdName);
    } catch (habitError) {
      console.error(`${habitName} 생성 실패:`, habitError.response?.data || habitError.message);
      // 개별 습관 생성 실패해도 계속 진행
    }
  }

  console.log('전체 생성된 습관:', createdHabits);
  return { studyId, habits: createdHabits };
}

// 실제 실행
createStudyAndHabits()
  .then(({ studyId, habits }) => {
    console.log('완료 ✅', { studyId, habitsCount: habits.length });
  })
  .catch((err) => {
    console.error('실패 ❌', err?.response?.status, err?.response?.data || err.message);
  });
