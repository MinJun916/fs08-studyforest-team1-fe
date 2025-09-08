import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@pages/Home.jsx";
import CreateStudyPage from "@pages/CreateStudyPage.jsx";
import Workshop from "@pages/Workshop.jsx";
import DetailStudyPage from "@pages/DetailStudyPage.jsx";
import Focus from "@pages/Focus.jsx";

/* 테스트 */
import ButtonsDemo from "@pages/ButtonsDemo.jsx";

import "@/styles/global.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<Home />} />

        {/* 스터디 */}
        <Route path="study/new" element={<CreateStudyPage />} />
        <Route path="study/detail" element={<DetailStudyPage />} />

        {/* 기타 */}
        <Route path="workshop" element={<Workshop />} />
        <Route path="focus" element={<Focus />} />

        {/* 테스트 */}
        <Route path="test/buttons" element={<ButtonsDemo />} />

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 40 }}>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}