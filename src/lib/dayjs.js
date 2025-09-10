import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export const kstTimeNow = () => {
  const time = dayjs().tz('Asia/Seoul').format('YYYY-MM-DD A h:mm');
  return time.replace('AM', '오전').replace('PM', '오후');
};
