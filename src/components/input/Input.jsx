import { useState } from 'react';
import Eye from '@assets/icons/Ic_eye.svg';
import EyeOff from '@assets/icons/Ic_eyeOff.svg';
import styles from '@styles/components/input/Input.module.scss';

function Input({ type = 'password' }) {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleCheckPasswordChange = (e) => {
    setCheckPassword(e.target.value);
    console.log(checkPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCheckPasswordVisibility = () => {
    setShowCheckPassword(!showCheckPassword);
  };

  const isPasswordValid = password === checkPassword;

  // 렌더링 코드
  if (type === 'nickName') {
    return (
      <div className={styles.inputWrapper}>
        <div className={styles.inputTitle}>닉네임</div>
        <input
          className={styles.input}
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={value}
          onChange={handleChange}
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
            className={`${styles.input} ${value ? '' : styles.errorInput}`}
            type="text"
            placeholder="스터디 이름을 입력해주세요"
            value={value}
            onChange={handleChange}
          ></input>
        </div>
        {!value && <div className={styles.error}>*스터디 이름을 입력해주세요</div>}
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
              value={password}
              onChange={handlePasswordChange}
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
                className={`${styles.input} ${isPasswordValid ? '' : styles.errorInput}`}
                type={showCheckPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={checkPassword}
                onChange={handleCheckPasswordChange}
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
          {!isPasswordValid && <div className={styles.error}>*비밀번호가 일치하지 않습니다</div>}
        </div>
      </div>
    );
  }
}

export default Input;
