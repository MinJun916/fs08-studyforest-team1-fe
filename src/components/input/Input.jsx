import { useState } from 'react';
import Eye from '@assets/icons/Ic_eye.svg';
import EyeOff from '@assets/icons/Ic_eyeOff.svg';
import styles from '@styles/components/input/Input.module.scss';
import Ic_search from '@assets/icons/Ic_search.svg';

function Input({ type = 'search', onValueChange }) {
  // 공통화된 상태 관리
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  // 공통 핸들러 함수
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onValueChange?.(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleCheckPasswordVisibility = () => {
    setShowCheckPassword((prev) => !prev);
  };

  // 렌더링 코드
  if (type === 'nickName') {
    return (
      <div className={styles.inputWrapper}>
        <div className={styles.inputTitle}>닉네임</div>
        <input
          className={styles.input}
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </div>
    );
  }

  if (type === 'studyName') {
    return (
      <div className={styles.inputErrorWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputTitle}>스터디 이름</div>
          <input
            className={`${styles.input} ${inputValue ? '' : styles.errorInput}`}
            type="text"
            placeholder="스터디 이름을 입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
          ></input>
        </div>
        {!inputValue && <div className={styles.error}>*스터디 이름을 입력해주세요</div>}
      </div>
    );
  }

  if (type === 'password') {
    return (
      <div className={styles.passwordWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputTitle}>비밀번호</div>
          <div className={styles.passwordInputWrapper}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={inputValue}
              onChange={handleInputChange}
            ></input>
            <button
              type="button"
              className={styles.passwordToggleButton}
              onClick={togglePasswordVisibility}
            >
              <img
                src={showPassword ? Eye : EyeOff}
                alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                className={styles.passwordToggleIcon}
              />
            </button>
          </div>
        </div>
        <div className={styles.inputErrorWrapper}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputTitle}>비밀번호 확인</div>
            <div className={styles.passwordInputWrapper}>
              <input
                className={`${styles.input} ${inputValue ? '' : styles.errorInput}`}
                type={showCheckPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={inputValue}
                onChange={handleInputChange}
              ></input>
              <button
                type="button"
                className={styles.passwordToggleButton}
                onClick={toggleCheckPasswordVisibility}
              >
                <img
                  src={showCheckPassword ? Eye : EyeOff}
                  alt={showCheckPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  className={styles.passwordToggleIcon}
                />
              </button>
            </div>
          </div>
          {!inputValue && <div className={styles.error}>*비밀번호가 일치하지 않습니다</div>}
        </div>
      </div>
    );
  }

  if (type === 'search') {
    return (
      <div className={styles.searchWrapper}>
        <img src={Ic_search} alt="검색" className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="검색"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    );
  }
}

export default Input;
