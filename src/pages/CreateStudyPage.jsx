import { useState } from 'react';
import styles from '@/styles/pages/CreateStudyPage.module.scss';

import imgDesk from '@assets/icons/bg-desk.png';
import imgWindow from '@assets/icons/bg-window.png';
import imgTiles from '@assets/icons/bg-tiles.png';
import imgPlant from '@assets/icons/bg-plant.png';
import pawSelected from '@assets/icons/ic_bg_selected.png';

// 🔁 올려준 컴포넌트로 교체 (경로는 네 프로젝트 구조에 맞게)
import NicknameInput from '@/components/input/NicknameInput.jsx';
import StudyNameInput from '@/components/input/StudyNameInput.jsx';
import BioTextarea from '@/components/input/BioTextarea.jsx';
import PasswordInput from '@/components/input/PasswordInput.jsx';

export default function CreateStudyPage() {
  // 윗줄: 발바닥(기본) + 파스텔 3색 → 4칸
  const colorTiles = [
    { id: 'c1', kind: 'color', value: '#DDE7D5' },
    { id: 'c2', kind: 'color', value: '#F8EAB9' },
    { id: 'c3', kind: 'color', value: '#DAEBF0' },
    { id: 'c4', kind: 'color', value: '#F7DCE1' },
  ];
  const DEFAULT_BG = { kind: 'color', value: colorTiles[0].value }; // "#DDE7D5"

  // 아랫줄: 사진 4개 → 4칸
  const imageTiles = [
    { id: 'g1', kind: 'image', value: `url(${imgDesk})` },
    { id: 'g2', kind: 'image', value: `url(${imgWindow})` },
    { id: 'g3', kind: 'image', value: `url(${imgTiles})` },
    { id: 'g4', kind: 'image', value: `url(${imgPlant})` },
  ];

  const [form, setForm] = useState({
    nickname: '',
    title: '',
    intro: '',
    password: '',
    password2: '',
    background: DEFAULT_BG,
  });
  const [errors, setErrors] = useState({});

  // 컴포넌트별 onChange (값 문자열을 직접 내려주는 컴포넌트용)
  const onNicknameChange = (val) => setForm((f) => ({ ...f, nickname: val }));
  const onTitleChange = (val) => setForm((f) => ({ ...f, title: val }));
  const onIntroChange = (val) => setForm((f) => ({ ...f, intro: val }));

  // PasswordInput은 event 기반 onChange를 요구하므로 공용 핸들러 유지
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const selectBackground = (bg) => setForm((f) => ({ ...f, background: bg }));

  // 컴포넌트의 규칙과 일치(페이지 레벨 검증 메시지와 동기화)
  const NICK_RE = /^[A-Za-z0-9가-힣_-]{2,20}$/;
  const NAME_RE = /^.{2,30}$/;

  const validate = () => {
    const next = {};

    if (!form.nickname.trim()) {
      next.nickname = '닉네임을 입력해주세요.';
    } else if (!NICK_RE.test(form.nickname.trim())) {
      next.nickname = '닉네임 형식을 확인해주세요. (2~20자, 영문/숫자/한글, _와 -만 허용)';
    }

    if (!form.title.trim()) {
      next.title = '스터디 이름을 입력해주세요.';
    } else if (!NAME_RE.test(form.title.trim())) {
      next.title = '스터디 이름은 2~30자까지 입력해주세요.';
    }

    if (!form.background) next.background = '배경을 선택해주세요.';

    if (!form.password) {
      next.password = '비밀번호를 입력해주세요.';
    } else if (form.password.length < 4) {
      next.password = '비밀번호를 4자 이상 입력해주세요.';
    }

    if (form.password !== form.password2) {
      next.password2 = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('payload', form);
    alert('임시: 콘솔에서 값 확인하세요!');
  };

  const norm = (x) => (x ?? '').toString().trim().toLowerCase();
  const isSelected = (bg) => {
    const sel = form.background;
    return !!sel && sel.kind === bg.kind && norm(sel.value) === norm(bg.value);
  };

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h2 className={styles.title}>스터디 만들기</h2>

        <form onSubmit={onSubmit} noValidate>
          {/* 닉네임 */}
          <NicknameInput
            id="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            value={form.nickname}
            onChange={onNicknameChange}
          />
          {errors.nickname && <p className={styles.errorMsg}>{errors.nickname}</p>}

          {/* 스터디 이름 */}
          <StudyNameInput
            id="title"
            label="스터디 이름"
            placeholder="스터디 이름을 입력해 주세요"
            value={form.title}
            onChange={onTitleChange}
          />
          {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}

          {/* 소개 */}
          <BioTextarea
            id="intro"
            label="소개"
            placeholder="소개 멘트를 작성해 주세요"
            value={form.intro}
            onChange={onIntroChange}
            rows={3}
          />

          {/* 배경 선택 */}
          <div className={styles.field}>
            <span className={styles.labelLite}>배경을 선택해주세요</span>

            {/* 1줄: 발바닥 + 파스텔 3개 */}
            <div className={styles.bgGrid}>
              {colorTiles.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.bgTile} ${
                    isSelected({ kind: 'color', value: t.value }) ? styles.selected : ''
                  }`}
                  style={{ backgroundColor: t.value }}
                  onClick={() => selectBackground({ kind: 'color', value: t.value })}
                  aria-label="색상 배경 선택"
                >
                  {isSelected({ kind: 'color', value: t.value }) && (
                    <img className={styles.tileIcon} src={pawSelected} alt="" />
                  )}
                </button>
              ))}
            </div>

            {/* 2줄: 사진 4개 */}
            <div className={styles.bgGrid}>
              {imageTiles.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.bgTile} ${
                    isSelected({ kind: 'image', value: t.value }) ? styles.selected : ''
                  }`}
                  style={{
                    backgroundImage: t.value,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => selectBackground({ kind: 'image', value: t.value })}
                  aria-label="이미지 배경 선택"
                >
                  {isSelected({ kind: 'image', value: t.value }) && (
                    <img className={styles.tileIcon} src={pawSelected} alt="" />
                  )}
                </button>
              ))}
            </div>

            {errors.background && <p className={styles.errorMsg}>{errors.background}</p>}
          </div>

          {/* 비밀번호 */}
          <PasswordInput
            label="비밀번호"
            name="password"
            value={form.password}
            onChange={onChange} // ← event 기반
            required
            placeholder="비밀번호를 입력해 주세요"
          />
          {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}

          {/* 비밀번호 확인 */}
          <PasswordInput
            label="비밀번호 확인"
            name="password2"
            value={form.password2}
            onChange={onChange} // ← event 기반
            placeholder="비밀번호를 다시 입력해 주세요"
          />
          {errors.password2 && <p className={styles.errorMsg}>{errors.password2}</p>}

          <div className={styles.btnRow}>
            <button className={styles.submitBtn} type="submit">
              <span className={styles.btnText}>만들기</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
/*----------------------------------------------------------------------*/
// import { useState } from 'react';
// import styles from '@/styles/pages/CreateStudyPage.module.scss';
// import imgDesk from '@assets/icons/bg-desk.png';
// import imgWindow from '@assets/icons/bg-window.png';
// import imgTiles from '@assets/icons/bg-tiles.png';
// import imgPlant from '@assets/icons/bg-plant.png';
// import eye from '@assets/icons/eye.png';
// import eyeOff from '@assets/icons/eye-off.png';
// import pawSelected from '@assets/icons/ic_bg_selected.png';
// import NicknameInput from '@/components/Input/NicknameInput';
// import PasswordInput from '@/components/Input/PasswordInput';
// import BioTextarea from '@/components/Input/BioTextarea';
// import StudyNameInput from '@/components/Input/StudyNameInput';

// export default function CreateStudyPage() {
//   // 윗줄: 발바닥(기본) + 파스텔 3색  → 4칸
//   const colorTiles = [
//     { id: 'c1', kind: 'color', value: '#DDE7D5' },
//     { id: 'c2', kind: 'color', value: '#F8EAB9' },
//     { id: 'c3', kind: 'color', value: '#DAEBF0' },
//     { id: 'c4', kind: 'color', value: '#F7DCE1' },
//   ];
//   const DEFAULT_BG = { kind: 'color', value: colorTiles[0].value }; // "#DDE7D5"

//   // 아랫줄: 사진 4개 → 4칸
//   const imageTiles = [
//     { id: 'g1', kind: 'image', value: `url(${imgDesk})` },
//     { id: 'g2', kind: 'image', value: `url(${imgWindow})` },
//     { id: 'g3', kind: 'image', value: `url(${imgTiles})` },
//     { id: 'g4', kind: 'image', value: `url(${imgPlant})` },
//   ];

//   const [form, setForm] = useState({
//     nickname: '',
//     title: '',
//     intro: '',
//     password: '',
//     password2: '',
//     background: DEFAULT_BG,
//   });
//   const [showPw, setShowPw] = useState(false);
//   const [showPw2, setShowPw2] = useState(false);
//   const [errors, setErrors] = useState({});

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   const selectBackground = (bg) => setForm((f) => ({ ...f, background: bg }));

//   const validate = () => {
//     const next = {};
//     if (!form.nickname.trim()) next.nickname = '닉네임을 입력해주세요.';
//     if (!form.title.trim()) next.title = '스터디 이름을 입력해주세요.';
//     if (!form.background) next.background = '배경을 선택해주세요.';
//     if (!form.password) next.password = '비밀번호를 입력해주세요.';
//     if (form.password && form.password.length < 4)
//       next.password = '비밀번호를 4자 이상 입력해주세요.';
//     if (form.password !== form.password2) next.password2 = '비밀번호가 일치하지 않습니다.';
//     setErrors(next);
//     return Object.keys(next).length === 0;
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     console.log('payload', form);
//     alert('임시: 콘솔에서 값 확인하세요!');
//   };

//   const norm = (x) => (x ?? '').toString().trim().toLowerCase();
//   const isSelected = (bg) => {
//     const sel = form.background;
//     return !!sel && sel.kind === bg.kind && norm(sel.value) === norm(bg.value);
//   };
//   return (
//     <div className={styles.page}>
//       <main className={styles.card}>
//         <h2 className={styles.title}>스터디 만들기</h2>

//         <form onSubmit={onSubmit} noValidate>
//           <div className={styles.field}>
//             <label htmlFor="nickname">닉네임</label>
//             <input
//               id="nickname"
//               name="nickname"
//               placeholder="닉네임을 입력해 주세요"
//               value={form.nickname}
//               onChange={onChange}
//               className={errors.nickname ? styles.errorInput : ''}
//             />
//             {errors.nickname && <p className={styles.errorMsg}>{errors.nickname}</p>}
//           </div>

//           <div className={styles.field}>
//             <label htmlFor="title">스터디 이름</label>
//             <input
//               id="title"
//               name="title"
//               placeholder="스터디 이름을 입력해 주세요"
//               value={form.title}
//               onChange={onChange}
//               className={errors.title ? styles.errorInput : ''}
//             />
//             {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}
//           </div>

//           <div className={styles.field}>
//             <label htmlFor="intro">소개</label>
//             <textarea
//               id="intro"
//               name="intro"
//               placeholder="소개 멘트를 작성해 주세요"
//               value={form.intro}
//               onChange={onChange}
//               rows={3}
//             />
//           </div>

//           {/* 배경 선택 */}
//           <div className={styles.field}>
//             <span className={styles.labelLite}>배경을 선택해주세요</span>

//             {/* 1줄: 발바닥 + 파스텔 3개 */}
//             <div className={styles.bgGrid}>
//               {colorTiles.map((t) => (
//                 <button
//                   key={t.id}
//                   type="button"
//                   className={`${styles.bgTile} ${
//                     isSelected({ kind: 'color', value: t.value }) ? styles.selected : ''
//                   }`}
//                   style={{ backgroundColor: t.value }}
//                   onClick={() => selectBackground({ kind: 'color', value: t.value })}
//                   aria-label="색상 배경 선택"
//                 >
//                   {isSelected({ kind: 'color', value: t.value }) && (
//                     <img className={styles.tileIcon} src={pawSelected} alt="" />
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* 2줄: 사진 4개 */}
//             <div className={styles.bgGrid}>
//               {imageTiles.map((t) => (
//                 <button
//                   key={t.id}
//                   type="button"
//                   className={`${styles.bgTile} ${
//                     isSelected({ kind: 'image', value: t.value }) ? styles.selected : ''
//                   }`}
//                   style={{
//                     backgroundImage: t.value,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                   }}
//                   onClick={() => selectBackground({ kind: 'image', value: t.value })}
//                   aria-label="이미지 배경 선택"
//                 >
//                   {isSelected({ kind: 'image', value: t.value }) && (
//                     <img className={styles.tileIcon} src={pawSelected} alt="" />
//                   )}
//                 </button>
//               ))}
//             </div>

//             {errors.background && <p className={styles.errorMsg}>{errors.background}</p>}
//           </div>

//           {/* 비밀번호 */}
//           <div className={styles.field}>
//             <label htmlFor="password">비밀번호</label>
//             <div className={styles.pwWrap}>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPw ? 'text' : 'password'}
//                 placeholder="비밀번호를 입력해 주세요"
//                 value={form.password}
//                 onChange={onChange}
//                 className={errors.password ? styles.errorInput : ''}
//               />
//               <button
//                 type="button"
//                 className={styles.eyeBtn}
//                 onClick={() => setShowPw((v) => !v)}
//                 aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
//               >
//                 <img src={showPw ? eyeOff : eye} alt="" width="20" height="20" />
//               </button>
//             </div>
//             {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
//           </div>

//           {/* 비밀번호 확인 */}
//           {/* 비밀번호 확인 */}
//           <div className={styles.field}>
//             <label htmlFor="password2">비밀번호 확인</label>
//             <div className={styles.pwWrap}>
//               <input
//                 id="password2"
//                 name="password2"
//                 type={showPw2 ? 'text' : 'password'}
//                 placeholder="비밀번호를 다시 입력해 주세요"
//                 value={form.password2}
//                 onChange={onChange}
//                 className={errors.password2 ? styles.errorInput : ''}
//                 autoComplete="new-password"
//               />
//               <button
//                 type="button"
//                 className={styles.eyeBtn}
//                 onClick={() => setShowPw2((v) => !v)}
//                 aria-label={showPw2 ? '비밀번호 숨기기' : '비밀번호 표시'}
//               >
//                 <img src={showPw2 ? eyeOff : eye} alt="" width="20" height="20" />
//               </button>
//             </div>
//             {errors.password2 && <p className={styles.errorMsg}>{errors.password2}</p>}
//           </div>

//           <div className={styles.btnRow}>
//             <button className={styles.submitBtn} type="submit">
//               <span className={styles.btnText}>만들기</span>
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }
