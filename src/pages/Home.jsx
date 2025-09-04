// CardsDemo
import React from 'react';
import Input from '@components/input/Input.jsx';
import PasswordInput from '@components/input/PasswordInput.jsx';
import AuthForm from '@components/auth/AuthForm.jsx';
import CardsDemo from '@components/card/card.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  // const navigate = useNavigate();
  // const [password, setPassword] = useState("");
  // const [pwError, setPwError] = useState("");

  // const canSubmit = password && !pwError;

  return (
    <>
      {/* <AuthForm /> */}
      <Link to="http://localhost:5173/workshop">Workshop 페이지로 이동</Link>
      <PasswordInput
      // value={password}
      // onChange={setPassword} // ← 여기서 값이 저장됨
      // onValidate={setPwError} // ← 에러 메시지 수신(옵션)
      // required
      // rules={{ minLen: 8, requireLetter: true, requireNumber: true }}
      // hint="영문+숫자 포함, 8자 이상"
      />
      {/* <Input /> */}
      {/* <CardsDemo /> */}
    </>
  );
}

// // pages/Home.jsx (테스트용 일부만 예시)
// import React, { useState } from "react";
// import NicknameInput from "@/component/input/NicknameInput.jsx";
// import SearchInput from "@/component/input/SearchInput.jsx";
// import BioTextarea from "@/component/input/BioTextarea.jsx";
// import StudyNameInput from "@/component/input/StudyNameInput.jsx";

// export default function Home() {
//   const [nickname, setNickname] = useState("");
//   const [keyword, setKeyword] = useState("");
//   const [bio, setBio] = useState("");
//   const [studyName, setStudyName] = useState("");

//   return (
//     <div style={{ padding: 24, maxWidth: 648, margin: "0 auto" }}>
//       <NicknameInput value={nickname} onChange={setNickname} />
//       <SearchInput
//         value={keyword}
//         onChange={setKeyword}
//         onSearch={() => alert(`검색: ${keyword}`)}
//       />
//       <BioTextarea value={bio} onChange={setBio} />
//       <StudyNameInput value={studyName} onChange={setStudyName} />
//     </div>
//   );
// }

// //popup
// import React, { useState } from "react";
// // import AuthForm from "@/component/auth/AuthForm.jsx";
// // import CardsDemo from "@/component/card/card.jsx";
// import Popup from "@/component/popup/popup.jsx";

// export default function Home() {
//   const [openAlert, setOpenAlert] = useState(true); // 켜진 상태로 시작 (상단 예시)
//   const [openConfirm, setOpenConfirm] = useState(true); // 켜진 상태로 시작 (하단 예시)

//   return (
//     <>
//       {/* 데모를 위해 버튼 두 개: 필요 없으면 삭제 */}
//       <div style={{ display: "flex", gap: 12, padding: 24 }}>
//         <button onClick={() => setOpenAlert(true)}>Alert 열기</button>
//         <button onClick={() => setOpenConfirm(true)}>Confirm 열기</button>
//       </div>

//       {/* 1) 메시지 + 확인 버튼 팝업 */}
//       <Popup
//         open={openAlert}
//         variant="alert"
//         size="md"
//         message="팝업 관련 메세지가 들어갑니다."
//         confirmText="확인"
//         onConfirm={() => console.log("alert confirm")}
//         onClose={() => setOpenAlert(false)}
//       />

//       {/* 2) 정말 나가시겠습니까? + 취소/확인 버튼 팝업 */}
//       <Popup
//         open={openConfirm}
//         variant="confirm"
//         size="md"
//         message="정말 나가시겠습니까?"
//         cancelText="취소"
//         confirmText="확인"
//         onCancel={() => console.log("confirm cancel")}
//         onConfirm={() => console.log("confirm ok")}
//         onClose={() => setOpenConfirm(false)}
//       />
//     </>
//   );
// }

// // src/pages/Home.jsx (발췌)
// import React, { useState } from "react";
// import PasswordGateModal from "@/component/modal/PasswordGateModal.jsx";
// import HabitsEditModal from "@/component/modal/HabitsEditModal.jsx";

// export default function Home() {
//   const [openPw, setOpenPw] = useState(false);
//   const [openHabits, setOpenHabits] = useState(false);

//   return (
//     <>
//       <button onClick={() => setOpenPw(true)}>비밀번호 모달</button>
//       <button onClick={() => setOpenHabits(true)}>습관 편집 모달</button>

//       <PasswordGateModal
//         open={openPw}
//         onClose={() => setOpenPw(false)}
//         onSubmit={(pw) => console.log("입력 PW:", pw)}
//       />

//       <HabitsEditModal
//         open={openHabits}
//         initialHabits={[
//           "미라클모닝 6시 기상",
//           "아침 챙겨 먹기",
//           "React 스터디 책 1챕터 읽기",
//         ]}
//         onSubmit={(list) => console.log("제출 habits:", list)}
//         onClose={() => setOpenHabits(false)}
//       />
//     </>
//   );
// }
