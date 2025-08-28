//CardsDemo
// import React from "react";
// import AuthForm from "@/component/auth/AuthForm.jsx";
// import CardsDemo from "@/component/card/card.jsx";

// export default function Home() {
//   return (
//     <>
//       {/* <AuthForm /> */}
//       <CardsDemo />
//     </>
//   );
// }

//popup
import React, { useState } from "react";
// import AuthForm from "@/component/auth/AuthForm.jsx";
// import CardsDemo from "@/component/card/card.jsx";
import Popup from "@/component/popup/popup.jsx";

export default function Home() {
  const [openAlert, setOpenAlert] = useState(true); // 켜진 상태로 시작 (상단 예시)
  const [openConfirm, setOpenConfirm] = useState(true); // 켜진 상태로 시작 (하단 예시)

  return (
    <>
      {/* 데모를 위해 버튼 두 개: 필요 없으면 삭제 */}
      <div style={{ display: "flex", gap: 12, padding: 24 }}>
        <button onClick={() => setOpenAlert(true)}>Alert 열기</button>
        <button onClick={() => setOpenConfirm(true)}>Confirm 열기</button>
      </div>

      {/* 1) 메시지 + 확인 버튼 팝업 */}
      <Popup
        open={openAlert}
        variant="alert"
        size="md"
        message="팝업 관련 메세지가 들어갑니다."
        confirmText="확인"
        onConfirm={() => console.log("alert confirm")}
        onClose={() => setOpenAlert(false)}
      />

      {/* 2) 정말 나가시겠습니까? + 취소/확인 버튼 팝업 */}
      <Popup
        open={openConfirm}
        variant="confirm"
        size="md"
        message="정말 나가시겠습니까?"
        cancelText="취소"
        confirmText="확인"
        onCancel={() => console.log("confirm cancel")}
        onConfirm={() => console.log("confirm ok")}
        onClose={() => setOpenConfirm(false)}
      />
    </>
  );
}
