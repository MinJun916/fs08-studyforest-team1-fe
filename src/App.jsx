import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from '@/components/header/Header';
import Home from '@pages/Home.jsx';
import Workshop from '@pages/Workshop.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import Focus from '@pages/Focus.jsx';
import ButtonsDemo from '@pages/ButtonsDemo.jsx';
import ToastDemo from '@pages/ToastDemo.jsx';

/* 아래는 테스트 페이지입니다 나중에 삭제요망 */
import ButtonsDemo from "@pages/ButtonsDemo.jsx";
import Emoji from '@/components/emoji/emoji';
import DropDown from '@/components/dropdown/dropdown';
import Tag from '@/components/tag/Tag';
/* 위는 테스트 페이지입니다 나중에 삭제요망 */

/* 아래는 리팩토링 페이지입니다 나중에 삭제요망 */
import Card from '@/components/card/Card.jsx';
/* 위는 리팩토링 페이지입니다 나중에 삭제요망 */

import '@/styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<Header />} />

        {/* 스터디 */}
        <Route path="study/new" element={<CreateStudyPage />} />
        <Route path="study/detail" element={<DetailStudyPage />} />

        {/* 기타 */}
        <Route path="workshop" element={<Workshop />} />
        <Route path="focus" element={<Focus />} />

        {/* 테스트 */}
        <Route path="test">
          <Route path="buttons" element={<ButtonsDemo />} />
          <Route path="emoji" element={<Emoji studyId="6b78c2cd-cc98-44ea-810e-2c68d46ab6a4" />} />
          <Route path="dropdown" element={<DropDown />} />
          <Route
            path="tag"
            element={
              <Tag
                bgColor="rgba(0,0,0,0.5)"
                fontSize={12}
                studyId="6b78c2cd-cc98-44ea-810e-2c68d46ab6a4"
              />
            }
          />
        </Route>

        {/* 리팩토링 임시 */}
        <Route path="refactor">
          <Route index element={<HabitModal />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 40 }}>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}