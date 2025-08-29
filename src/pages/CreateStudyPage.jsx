import { useRef, useState } from "react";
import styles from "./CreateStudyPage.module.scss";

export default function CreateStudyPage() {
  const fileInputRef = useRef(null);

  const colorTiles = [
    { id: "c1", type: "color", value: "#DDE7D5" }, // 연한 연두
    { id: "c2", type: "color", value: "#F8EAB9" }, // 연한 샌드
    { id: "c3", type: "color", value: "#DAEBF0" }, // 연한 민트블루
    { id: "c4", type: "color", value: "#F7DCE1" }, // 연한 핑크
  ];

  // 사진 타일은 우선 그라디언트로 대체(나중에 이미지 경로로 교체하면 됨)
  const imageTiles = [
    {
      id: "g1",
      type: "gradient",
      value:
        "linear-gradient(135deg, #EDEDED 0%, #D9D9D9 100%)", // 데스크 느낌
    },
    {
      id: "g2",
      type: "gradient",
      value:
        "linear-gradient(135deg, #F2E9D9 0%, #E7D6B8 100%)", // 창가/우드 톤
    },
    {
      id: "g3",
      type: "gradient",
      value:
        "linear-gradient(135deg, #9FCAD1 0%, #D9E6E7 100%)", // 타일
    },
    {
      id: "g4",
      type: "gradient",
      value:
        "linear-gradient(135deg, #5F8F68 0%, #9AC39D 100%)", // 몬스테라
    },
  ];

  const [form, setForm] = useState({
    nickname: "",
    title: "",
    intro: "",
    password: "",
    password2: "",
    background: null, // {kind: 'color' | 'image' | 'upload', value: string}
  });

  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const selectBackground = (bg) => {
    setForm((f) => ({ ...f, background: bg }));
  };

  const onPickUpload = () => {
    fileInputRef.current?.click();
  };

  const onUploadFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      selectBackground({ kind: "upload", value: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next = {};
    if (!form.nickname.trim()) next.nickname = "닉네임을 입력해주세요.";
    if (!form.title.trim()) next.title = "스터디 이름을 입력해주세요.";
    if (form.password.length < 1) next.password = "비밀번호를 입력해주세요.";
    if (form.password && form.password.length < 4)
      next.password = "비밀번호를 4자 이상 입력해주세요.";
    if (form.password !== form.password2)
      next.password2 = "비밀번호가 일치하지 않습니다.";
    if (!form.background) next.background = "배경을 선택해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: 실제 API 연결/라우팅 처리
    console.log("payload", form);
    alert("임시: 입력값 콘솔 확인해보세요!");
  };

  // 선택된 배경을 미리보기 스타일로 만들어서 버튼/타일 하이라이트에 사용
  const isSelectedBg = (bg) => {
    const sel = form.background;
    if (!sel) return false;
    return sel.kind === bg.kind && sel.value === bg.value;
  };

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h2 className={styles.title}>스터디 만들기</h2>

        <form onSubmit={onSubmit} noValidate>
          {/* 닉네임 */}
          <div className={styles.field}>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              value={form.nickname}
              onChange={onChange}
              className={errors.nickname ? styles.errorInput : ""}
            />
            {errors.nickname && (
              <p className={styles.errorMsg}>{errors.nickname}</p>
            )}
          </div>

          {/* 스터디 이름 */}
          <div className={styles.field}>
            <label htmlFor="title">스터디 이름</label>
            <input
              id="title"
              name="title"
              placeholder="스터디 이름을 입력해 주세요"
              value={form.title}
              onChange={onChange}
              className={errors.title ? styles.errorInput : ""}
            />
            {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}
          </div>

          {/* 소개 */}
          <div className={styles.field}>
            <label htmlFor="intro">소개</label>
            <textarea
              id="intro"
              name="intro"
              placeholder="소개 멘트를 작성해 주세요"
              value={form.intro}
              onChange={onChange}
              rows={3}
            />
          </div>

          {/* 배경 선택 */}
          <div className={styles.field}>
            <span className={styles.labelLite}>배경을 선택해주세요</span>

            <div className={styles.bgGrid}>
              {/* 업로드 타일 */}
              <button
                type="button"
                className={`${styles.bgTile} ${styles.uploadTile} ${
                  form.background?.kind === "upload" ? styles.selected : ""
                }`}
                onClick={onPickUpload}
                aria-label="배경 이미지 업로드"
              >
                <div className={styles.uploadDot}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onUploadFile}
                  hidden
                />
              </button>

              {/* 파스텔 색 타일 3개 */}
              {colorTiles.slice(1).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.bgTile} ${
                    isSelectedBg({ kind: "color", value: t.value })
                      ? styles.selected
                      : ""
                  }`}
                  style={{ background: t.value }}
                  onClick={() =>
                    selectBackground({ kind: "color", value: t.value })
                  }
                  aria-label="색상 배경 선택"
                />
              ))}
            </div>

            <div className={styles.bgGrid}>
              {imageTiles.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.bgTile} ${
                    isSelectedBg({ kind: "image", value: t.value })
                      ? styles.selected
                      : ""
                  }`}
                  style={{
                    background: t.value,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() =>
                    selectBackground({ kind: "image", value: t.value })
                  }
                  aria-label="이미지 배경 선택"
                />
              ))}
            </div>

            {errors.background && (
              <p className={styles.errorMsg}>{errors.background}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className={styles.field}>
            <label htmlFor="password">비밀번호</label>
            <div className={styles.pwWrap}>
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={form.password}
                onChange={onChange}
                className={errors.password ? styles.errorInput : ""}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 표시"}
              >
                {showPw ? (
                  // eye-off
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      d="M3 3l18 18M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.09A10.45 10.45 0 0112 5c5 0 9.27 3.11 10.5 7.5a10.94 10.94 0 01-3.05 4.77M6.11 6.11A10.94 10.94 0 001.5 12.5a10.89 10.89 0 004.56 5.69"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  // eye
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      d="M1.5 12.5C2.73 8.11 7 5 12 5s9.27 3.11 10.5 7.5C21.27 16.89 17 20 12 20S2.73 16.89 1.5 12.5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="12" cy="12.5" r="3" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className={styles.errorMsg}>{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.field}>
            <label htmlFor="password2">비밀번호 확인</label>
            <input
              id="password2"
              name="password2"
              type="password"
              placeholder="닉네임을 입력해 주세요"
              value={form.password2}
              onChange={onChange}
              className={errors.password2 ? styles.errorInput : ""}
            />
            {errors.password2 && (
              <p className={styles.errorMsg}>{errors.password2}</p>
            )}
          </div>

          {/* 만들기 버튼 */}
          <div className={styles.btnRow}>
            <button className={styles.submitBtn} type="submit">
              만들기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}