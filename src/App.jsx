import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@/components/header/Header.jsx';
import Workshop from '@pages/Workshop.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import Focus from '@pages/Focus.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';
import Home from '@pages/Home.jsx';
import RecentStudies from '@components/organisms/RecentStudies.jsx';

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
          <Route path="recent" element={<RecentStudies />} />
        </Route>

        {/* 기타 */}
        <Route path="workshop" element={<Workshop />} />
        <Route path="focus" element={<Focus />} />
        <Route path="home" element={<Home />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
