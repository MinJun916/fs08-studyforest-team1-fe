import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Eye from '@assets/icons/Ic_eye.svg';
import EyeOff from '@assets/icons/Ic_eyeOff.svg';
import styles from '@styles/components/input/Input.module.scss';
import Ic_search from '@assets/icons/Ic_search.svg';
import clsx from 'clsx';

const Input = forwardRef(
  (
    { type = 'search', onValueChange, onKeyDown, value, showError: initialShowError = true },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [password, setPassword] = useState(value || '');
    const [checkPassword, setCheckPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [showError, setShowError] = useState(initialShowError);

    // value prop이 변경되면 내부 상태 업데이트
    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);
        setPassword(value);
      }
    }, [value]);

    // showError prop이 변경되면 내부 상태 업데이트
    useEffect(() => {
      setShowError(initialShowError);
    }, [initialShowError]);

    // 외부에서 value prop이 전달되면 해당 값을 사용
    const currentPassword = value !== undefined ? value : password;
    const currentInputValue = value !== undefined ? value : inputValue;

    const handleInputChange = (e) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInputValue(newValue);
      }
      onValueChange(newValue);
    };

    const handlePasswordChange = (e) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setPassword(newValue);
      }
      onValueChange(newValue);
    };

    const handleCheckPasswordChange = (e) => {
      const value = e.target.value;
      setCheckPassword(value);
      onValueChange(value);
    };

    // 유효성 검사 공통 함수들
    const validateInput = (value, type) => {
      switch (type) {
        case 'studyName':
          if (value.trim() === '') {
            return { error: true, message: '*스터디 이름을 입력해주세요' };
          }
          if (value.length > 40) {
            return { error: true, message: '*스터디 이름을 40자 이하로 입력해주세요' };
          }
          return { error: false, message: '' };

        case 'nickName':
          if (value.trim() === '') {
            return { error: true, message: '*닉네임을 입력해주세요' };
          }
          if (value.length > 15) {
            return { error: true, message: '*닉네임을 15자 이하로 입력해주세요' };
          }
          return { error: false, message: '' };

        case 'password':
          if (value.trim() === '') {
            return { error: true, message: '*비밀번호를 입력해주세요' };
          }
          if (value.length < 4 || value.length > 255) {
            return { error: true, message: '*비밀번호를 4자 이상 255자 이하로 입력해주세요' };
          }
          return { error: false, message: '' };

        case 'passwordOnly':
          if (value.trim() === '') {
            return { error: true, message: '*비밀번호를 입력해주세요' };
          }
          if (value.length < 4 || value.length > 255) {
            return { error: true, message: '*비밀번호를 4자 이상 255자 이하로 입력해주세요' };
          }
          return { error: false, message: '' };
        default:
          return { error: false, message: '' };
      }
    };

    const validatePasswordMatch = (password, checkPassword) => {
      return password === checkPassword;
    };

    // 외부에서 validation 함수를 호출할 수 있도록 노출
    useImperativeHandle(ref, () => ({
      validateInput: (value, inputType) => {
        const result = validateInput(value, inputType);
        // 에러가 있으면 showError를 true로 설정
        if (result.error) {
          setShowError(true);
        }
        return result;
      },
      getCurrentValue: () => {
        switch (type) {
          case 'nickName':
          case 'studyName':
            return currentInputValue;
          case 'password':
          case 'passwordOnly':
            return currentPassword;
          default:
            return inputValue;
        }
      },
    }));

    const getClassName = (value, type) => {
      // showError가 false이면 에러 스타일을 적용하지 않음
      if (!showError) {
        return styles.input;
      }

      if (type === 'password') {
        return clsx(styles.input, {
          [styles.errorInput]: !validatePasswordMatch(password, checkPassword),
        });
      } else if (type === 'passwordCheck') {
        return clsx(styles.input, {
          [styles.errorInput]: !validatePasswordMatch(password, checkPassword) && checkPassword,
        });
      } else {
        const isError = validateInput(value, type).error;
        return clsx(styles.input, {
          [styles.errorInput]: isError,
        });
      }
    };

    // 렌더링 코드
    switch (type) {
      case 'nickName':
        return (
          <div className={styles.inputErrorWrapper}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputTitle}>닉네임</div>
              <input
                className={getClassName(currentInputValue, 'nickName')}
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={currentInputValue}
                onChange={handleInputChange}
                autoComplete="username"
              ></input>
            </div>
            {showError && validateInput(currentInputValue, 'nickName').error && (
              <div className={styles.error}>
                {validateInput(currentInputValue, 'nickName').message}
              </div>
            )}
          </div>
        );

      case 'studyName':
        return (
          <div className={styles.inputErrorWrapper}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputTitle}>스터디 이름</div>
              <input
                className={getClassName(currentInputValue, 'studyName')}
                type="text"
                placeholder="스터디 이름을 입력해주세요"
                value={currentInputValue}
                onChange={handleInputChange}
                autoComplete="off"
              ></input>
            </div>
            {showError && validateInput(currentInputValue, 'studyName').error && (
              <div className={styles.error}>
                {validateInput(currentInputValue, 'studyName').message}
              </div>
            )}
          </div>
        );

      case 'password':
        return (
          <div className={styles.passwordWrapper}>
            <div className={styles.inputErrorWrapper}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputTitle}>비밀번호</div>
                <div className={styles.passwordInputWrapper}>
                  <input
                    className={getClassName(currentPassword, 'password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력해주세요"
                    value={currentPassword}
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
              {showError && validateInput(currentPassword, 'password').error && (
                <div className={styles.error}>
                  {validateInput(currentPassword, 'password').message}
                </div>
              )}
            </div>
            <div className={styles.inputErrorWrapper}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputTitle}>비밀번호 확인</div>
                <div className={styles.passwordInputWrapper}>
                  <input
                    className={getClassName(checkPassword, 'passwordCheck')}
                    type={showCheckPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 한 번 입력해주세요"
                    value={checkPassword}
                    onChange={handleCheckPasswordChange}
                    autoComplete="off"
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
              {showError && !validatePasswordMatch(password, checkPassword) && checkPassword && (
                <div className={styles.error}>*비밀번호가 일치하지 않습니다</div>
              )}
            </div>
          </div>
        );

      case 'passwordOnly':
        return (
          <div className={styles.inputErrorWrapper}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputTitle}>비밀번호</div>
              <div className={styles.passwordInputWrapper}>
                <input
                  className={getClassName(currentPassword, 'passwordOnly')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요"
                  value={currentPassword}
                  onChange={handlePasswordChange}
                  onKeyDown={onKeyDown}
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
            {showError && validateInput(currentPassword, 'passwordOnly').error && (
              <div className={styles.error}>
                {validateInput(currentPassword, 'passwordOnly').message}
              </div>
            )}
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
          <div className={styles.inputErrorWrapper}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputTitle}>입력</div>
              <input
                className={getClassName(inputValue, 'default')}
                type="text"
                placeholder="입력해주세요"
                value={inputValue}
                onChange={handleInputChange}
                autoComplete="off"
              ></input>
            </div>
            {showError && validateInput(inputValue, 'default').error && (
              <div className={styles.error}>{validateInput(inputValue, 'default').message}</div>
            )}
          </div>
        );
    }
  },
);

export default Input;
