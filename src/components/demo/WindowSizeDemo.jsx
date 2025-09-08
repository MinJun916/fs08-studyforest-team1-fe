import useWindowSize from '@/hooks/useWindowSize.jsx';

const WindowSizeDemo = () => {
  const { width, height, deviceType, isMobile, isTablet, isDesktop } = useWindowSize();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>윈도우 크기 감지 데모</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>현재 윈도우 크기:</h3>
        <p>너비: {width}px</p>
        <p>높이: {height}px</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>디바이스 타입:</h3>
        <p
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: isMobile ? '#e74c3c' : isTablet ? '#f39c12' : '#27ae60',
          }}
        >
          {deviceType.toUpperCase()}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>디바이스 타입별 상태:</h3>
        <p style={{ color: isMobile ? '#e74c3c' : '#95a5a6' }}>
          📱 모바일: {isMobile ? 'YES' : 'NO'}
        </p>
        <p style={{ color: isTablet ? '#f39c12' : '#95a5a6' }}>
          📱 태블릿: {isTablet ? 'YES' : 'NO'}
        </p>
        <p style={{ color: isDesktop ? '#27ae60' : '#95a5a6' }}>
          💻 데스크톱: {isDesktop ? 'YES' : 'NO'}
        </p>
      </div>

      <div
        style={{
          padding: '10px',
          backgroundColor: isMobile ? '#ffe6e6' : isTablet ? '#fff3cd' : '#e6ffe6',
          borderRadius: '5px',
          border: `2px solid ${isMobile ? '#e74c3c' : isTablet ? '#f39c12' : '#27ae60'}`,
        }}
      >
        <p>
          <strong>현재 디바이스에 맞는 스타일이 적용되었습니다!</strong>
        </p>
        <p>브라우저 창 크기를 조절해보세요. 실시간으로 감지됩니다.</p>
      </div>
    </div>
  );
};

export default WindowSizeDemo;
