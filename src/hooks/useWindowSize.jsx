import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      // 디바운싱으로 성능 최적화
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        // 값이 실제로 변경되었을 때만 상태 업데이트
        setWindowSize((prevSize) => {
          if (prevSize.width !== newWidth || prevSize.height !== newHeight) {
            return {
              width: newWidth,
              height: newHeight,
            };
          }
          return prevSize;
        });
      }, 100); // 100ms 디바운싱
    };

    // 초기값 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // 윈도우 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 디바이스 타입 감지 (SCSS 분기점과 정확히 일치)
  const getDeviceType = () => {
    const { width } = windowSize;

    if (width <= 480) {
      return 'mobile';
    } else if (width >= 481 && width <= 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  // 각 디바이스 타입별 boolean 값 (SCSS 분기점과 정확히 일치)
  const isMobile = windowSize.width <= 480;
  const isTablet = windowSize.width >= 481 && windowSize.width <= 1024;
  const isDesktop = windowSize.width >= 1025;

  return {
    width: windowSize.width,
    height: windowSize.height,
    deviceType: getDeviceType(),
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useWindowSize;
