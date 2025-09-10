import { useState } from 'react';
import Eye from '@assets/icons/Ic_eye.svg';
import EyeOff from '@assets/icons/Ic_eyeOff.svg';
import styles from '@styles/components/input/Input.module.scss';
import Ic_search from '@assets/icons/Ic_search.svg';

function Input({ type = 'search', onValueChange }) {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onValueChange(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    onValueChange(value);
  };

  const handleCheckPasswordChange = (e) => {
    const value = e.target.value;
    setCheckPassword(value);
    onValueChange(value);
  };

  // 렌더링 코드
  switch (type) {
    case 'nickName':
      return (
        <div className={styles.inputWrapper}>
          <div className={styles.inputTitle}>닉네임</div>
          <input
            className={styles.input}
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="username"
          ></input>
        </div>
      );

    case 'studyName':
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
              autoComplete="off"
            ></input>
          </div>
          {!inputValue && <div className={styles.error}>*스터디 이름을 입력해주세요</div>}
        </div>
      );

    case 'password':
      return (
        <div className={styles.passwordWrapper}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputTitle}>비밀번호</div>
            <div className={styles.passwordInputWrapper}>
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              ></input>
              <button
                type="button"
                className={styles.passwordToggleButton}
                onClick={() => setShowPassword(!showPassword)}
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
                  className={`${styles.input} ${checkPassword ? '' : styles.errorInput}`}
                  type={showCheckPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  value={checkPassword}
                  onChange={handleCheckPasswordChange}
                  autoComplete="new-password"
                ></input>
                <button
                  type="button"
                  className={styles.passwordToggleButton}
                  onClick={() => setShowCheckPassword(!showCheckPassword)}
                >
                  <img
                    src={showCheckPassword ? Eye : EyeOff}
                    alt={showCheckPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    className={styles.passwordToggleIcon}
                  />
                </button>
              </div>
            </div>
            {password !== checkPassword && (
              <div className={styles.error}>*비밀번호가 일치하지 않습니다</div>
            )}
          </div>
        </div>
      );

    case 'passwordOnly':
      return (
        <div className={styles.inputWrapper}>
          <div className={styles.inputTitle}>비밀번호</div>
          <div className={styles.passwordInputWrapper}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            ></input>
            <button
              type="button"
              className={styles.passwordToggleButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? Eye : EyeOff}
                alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                className={styles.passwordToggleIcon}
              />
            </button>
          </div>
        </div>
      );

    case 'search':
      return (
        <div className={styles.searchWrapper}>
          <img src={Ic_search} alt="검색" className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="검색"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
      );

    default:
      return (
        <div className={styles.inputWrapper}>
          <div className={styles.inputTitle}>입력</div>
          <input
            className={styles.input}
            type="text"
            placeholder="입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
          ></input>
        </div>
      );
  }
}

export default Input;
