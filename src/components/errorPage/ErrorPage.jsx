import { useNavigate } from 'react-router-dom';
import styles from '@styles/components/errorPage/ErrorPage.module.scss';

const ErrorPage = ({ type = 'network' }) => {
  const navigate = useNavigate();
  const getErrorCode = () => {
    switch (type) {
      case 'network':
        return 'NET';
      case 'notFound':
        return '404';
      case 'permission':
        return '403';
      case 'server':
        return '500';
      case 'data':
        return 'DATA';
      default:
        return 'ERR';
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'network':
        return '네트워크 연결 오류';
      case 'notFound':
        return '페이지를 찾을 수 없습니다';
      case 'permission':
        return '접근 권한이 없습니다';
      case 'server':
        return '서버 오류가 발생했습니다';
      case 'data':
        return '데이터를 불러올 수 없습니다';
      default:
        return '오류가 발생했습니다';
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'network':
        return '인터넷 연결을 확인하거나 잠시 후 다시 시도해주세요.';
      case 'notFound':
        return '요청하신 페이지가 존재하지 않거나 삭제되었습니다.';
      case 'permission':
        return '이 페이지에 접근할 권한이 없습니다.';
      case 'server':
        return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      case 'data':
        return '데이터를 불러오는 중 문제가 발생했습니다.';
      default:
        return '예상치 못한 오류가 발생했습니다.';
    }
  };

  const getCanRetry = () => {
    switch (type) {
      case 'network':
      case 'server':
      case 'data':
        return true;
      case 'notFound':
      case 'permission':
      default:
        return false;
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const canRetry = getCanRetry();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>{getErrorCode()}</div>
        <h1 className={styles.title}>{getDefaultTitle()}</h1>
        <p className={styles.description}>{getDefaultMessage()}</p>
        <div className={styles.actions}>
          {canRetry && (
            <button type="button" className={styles.retryButton} onClick={handleRetry}>
              다시 시도
            </button>
          )}
          <button type="button" className={styles.homeButton} onClick={handleGoHome}>
            홈으로 돌아가기
          </button>
          <button type="button" className={styles.backButton} onClick={handleGoBack}>
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
