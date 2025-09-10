import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@/components/header/Header.jsx';
import Workshop from '@pages/Workshop.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import Focus from '@pages/Focus.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';

/* 테스트 페이지 */
import TimerDemo from '@/pages/TimerDemo.jsx';

import Emoji from '@/components/emoji/emoji';
import DropDown from '@/components/dropdown/dropdown';
import Tag from '@/components/tag/Tag.jsx';

/* 리팩토링 페이지 */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<Header />} />

        {/* 스터디 관련 라우트 */}
        <Route path="study">
          <Route path="new" element={<CreateStudyPage />} />
          <Route path=":id" element={<DetailStudyPage />} />
        </Route>

        {/* 기타 */}
        <Route path="workshop" element={<Workshop />} />
        <Route path="focus" element={<Focus />} />

        {/* 리팩토링 임시 */}
        <Route path="refactor" element={<Home />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
