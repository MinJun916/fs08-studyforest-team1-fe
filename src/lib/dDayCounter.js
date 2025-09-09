import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const dDayCounter = (startDate) => {
  // UTC 날짜 문자열을 KST 날짜 문자열로 변환
  const kstDate = dayjs.utc(startDate).tz('Asia/Seoul').startOf('day');

  // 오늘 KST 날짜 (00:00:00) 기준
  const kstToday = dayjs().tz('Asia/Seoul').startOf('day');

  // 디데이 계산 (당일을 1일로 카운트)
  const dDay = kstToday.diff(kstDate, 'day') + 1;

  return dDay;
};

export default dDayCounter;
