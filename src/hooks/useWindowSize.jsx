import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 윈도우 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 디바이스 타입 감지
  const getDeviceType = () => {
    const { width } = windowSize;

    if (width <= 768) {
      return 'mobile';
    } else if (width <= 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  // 각 디바이스 타입별 boolean 값
  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width > 768 && windowSize.width <= 1024;
  const isDesktop = windowSize.width > 1024;

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
