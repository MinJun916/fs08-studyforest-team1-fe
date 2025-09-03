import React, { useMemo, useState } from "react";
import Input from "@/component/input/Input";
import styles from "./AuthForm.module.scss";

export default function AuthForm() {
  const [values, setValues] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    search: "",
  });
  const [showPw, setShowPw] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!values.id.trim()) e.id = "닉네임을 입력해 주세요";
    if (values.password.length < 6) e.password = "비밀번호를 입력해 주세요";
    if (values.passwordConfirm !== values.password)
      e.passwordConfirm = "비밀번호가 일치하지 않아요.";
    return e;
  }, [values]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      alert("폼을 다시 확인해주세요.");
      return;
    }
    alert(JSON.stringify(values, null, 2));
  };

  const togglePw = () => setShowPw((s) => !s);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      alert(`검색: ${values.search}`);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>인풋 컴포넌트 데모</div>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          label="아이디"
          name="id"
          value={values.id}
          onChange={onChange}
          placeholder="닉네임을 입력해 주세요"
          error={errors.id}
          inputProps={{ autoComplete: "username" }}
        />

        <div className={styles.inline}>
          <Input
            label="비밀번호"
            name="password"
            type={showPw ? "text" : "password"}
            value={values.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해 주세요"
            error={errors.password}
            inputProps={{ autoComplete: "new-password" }}
          />
          <button
            type="button"
            className={`${styles.btn} ${showPw ? styles.hide : styles.show}`}
            onClick={togglePw}
          ></button>
        </div>

        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type={showPw ? "text" : "password"}
          value={values.passwordConfirm}
          onChange={onChange}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          error={errors.passwordConfirm}
          inputProps={{ autoComplete: "new-password" }}
        />

        <Input
          label="검색"
          name="search"
          type="search"
          value={values.search}
          onChange={onChange}
          placeholder="검색어를 입력하세요"
          hint="Enter 입력 시 검색 알림"
          inputProps={{ onKeyDown: onSearchKeyDown }}
        />

        <Input
          label="스터디 이름"
          name="search"
          type="search"
          value={values.search}
          onChange={onChange}
          placeholder="스터디 이름을 입력해주세요"
          hint="*스터디 이름을 입력해주세요"
          inputProps={{ onKeyDown: onSearchKeyDown }}
        />

        <Input
          label="소개"
          name="search"
          type="search"
          value={values.search}
          onChange={onChange}
          placeholder="소개 멘트를 작성해 주세요"
          inputProps={{ onKeyDown: onSearchKeyDown }}
        />

        <button type="submit" className={styles.btn}>
          제출
        </button>
      </form>
    </div>
  );
}
