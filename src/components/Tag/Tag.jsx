import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/components/tag/tag.module.scss';

// props: bgColor?: string, fontSize?: number|string, studyId?: string
function Tag({ bgColor, fontSize, studyId }) {
  // only set inline styles when props are provided so default CSS remains in effect
  const containerStyle = bgColor ? { backgroundColor: bgColor  } : undefined;
  const textStyle = fontSize
    ? { fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize }
    : undefined;

  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studyId) return;
    let mounted = true;
    const host = 'https://studyforest-n1at.onrender.com';
    const urlByQuery = `${host}/points?studyId=${studyId}`;
    setLoading(true);
    setError(null);

    (async () => {
      let handled = false;
      try {
        const res = await axios.get(urlByQuery);
        if (mounted) {
          const json = res?.data;
          if (json && json.success && Array.isArray(json.data)) {
            // find matching studyId (backend may return multiple entries)
            const match = json.data.find((it) => it && it.studyId === studyId) || json.data[0];
            if (match && typeof match.point !== 'undefined') {
              setPoints(match.point);
              handled = true;
            }
          }
          if (!handled) {
            setError(new Error('unexpected response'));
          }
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [studyId]);

  return (
    <div className={styles.tag} style={containerStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" width={fontSize} height={fontSize} viewBox="0 0 14 14" fill="none" style={textStyle}>
      <g clip-path="url(#clip0_1_37953)">
      <path d="M11.1952 0.24152C10.7063 0.00155102 8.22806 0.275645 6.44044 1.98977C3.62513 4.80158 3.69272 8.50458 3.69272 8.50458C3.69272 8.50458 3.59997 8.88587 3.20316 8.33308C2.33516 7.2273 2.78994 4.68236 2.84069 4.32755C2.91244 3.82858 2.59416 3.81327 2.46138 3.97864C-0.674405 8.33286 2.15775 11.8987 4.01253 13.0305C6.18341 14.3551 10.4668 14.3546 12.1732 10.5963C14.2975 5.91568 11.8075 0.541864 11.1952 0.24152Z" fill="#79AC6A"/>
      <path d="M11.1468 4.37136C11.3645 2.91164 11.3658 1.50552 11.1868 0.238518C10.6815 0.0048925 8.21949 0.284017 6.44084 1.98983C3.62552 4.80164 3.69312 8.50464 3.69312 8.50464C3.69312 8.50464 3.60037 8.88593 3.20355 8.33314C2.33555 7.22736 2.79034 4.68242 2.84109 4.32761C2.91284 3.82864 2.59455 3.81333 2.46177 3.9787C0.566524 6.61027 0.85243 8.95264 1.78365 10.6451C2.71574 11.6459 3.77646 12.3037 4.75887 12.4502C7.55887 12.868 10.4184 9.25102 11.1468 4.37136Z" fill="#CAE5C2"/>
      <path d="M11.1465 4.37132C11.3641 2.9116 11.3654 1.50548 11.1865 0.238475C10.6812 0.00485003 8.7201 0.816412 6.94123 2.52266C4.12592 5.33426 3.69279 8.5046 3.69279 8.5046C3.69279 8.5046 3.60004 8.88588 3.20323 8.3331C2.33523 7.22732 2.6336 5.31698 2.68457 4.96238C2.75654 4.46319 2.43804 4.4481 2.30526 4.61348C0.410229 7.24504 0.852323 8.95282 1.78376 10.6451C2.71585 11.6459 3.77657 12.3036 4.75898 12.4502C7.55854 12.868 10.418 9.25098 11.1465 4.37132Z" fill="#99C08E"/>
      </g>
      <defs>
      <clipPath id="clip0_1_37953">
      <rect width="14" height="14" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      <span style={textStyle}>
        {loading && '로딩중...'}
        {error && '조회 불러오기 실패'}
        {!loading && !error && (points !== null ? `${points}P 획득` : '310P 획득')}
      </span>
    </div>
  );
}

export default Tag;