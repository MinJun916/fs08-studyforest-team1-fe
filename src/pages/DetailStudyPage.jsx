import styles from '@styles/pages/DetailStudyPage.module.scss';
import React from 'react';

import Emoji from '@/components/emoji/Emoji';
// import pawIcon from '@/assets/icons/paw.svg';

export default function DetailStudyPage() {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const habits = [
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

  return (
    <main>
      {/* 상단 헤더 영역 */}
      <div className={styles.background}>
        <div>
          <Emoji studyId="6b78c2cd-cc98-44ea-810e-2c68d46ab6a4" />
          <h1 className={styles.title}>연우의 개발공장</h1>
        </div>

        <div>
          <div>
            <button type="button">공유하기</button>
            <button type="button">수정하기</button>
            <button type="button">스터디 삭제하기</button>
          </div>
          <div>
            <button type="button">오늘의 습관</button>
            <button type="button">오늘의 집중</button>
          </div>
        </div>
      </div>

      {/* 소개 및 포인트 */}
      <section>
        <h2>소개</h2>
        <p>Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)</p>

        <div>
          <h3>현재까지 획득한 포인트</h3>
          <div>
            <strong>310P 획득</strong>
          </div>
        </div>
      </section>

      {/* 습관 기록표(마크업만) */}
      <section aria-label="습관 기록표">
        <h2>습관 기록표</h2>

        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">습관</th>
                {days.map((d) => (
                  <th key={d} scope="col">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {habits.map((habit) => (
                <tr key={habit.id}>
                  <td>{habit.title}</td>
                  {habit.records.map((ok, idx) => (
                    <td key={idx} aria-label={`${habit.title}-${days[idx]}`}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
