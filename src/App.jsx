import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout.jsx';

import Home from '@pages/Home.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import Workshop from '@pages/Workshop.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import Focus from '@pages/Focus.jsx';

/* 아래는 테스트 페이지입니다 나중에 삭제요망 */
import ButtonsDemo from '@pages/ButtonsDemo.jsx';
import ToastDemo from '@pages/ToastDemo.jsx';


/* 위는 테스트 페이지입니다 나중에 삭제요망 */

import '@/styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="study">
            <Route path="new" element={<CreateStudyPage />} />
            <Route path="detail" element={<DetailStudyPage />} />{/*미구현*/}
          </Route>
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/focus" element={<Focus />} />{/*미구현*/}

          {/* 아래는 테스트 페이지입니다 나중에 삭제요망 */}
          <Route path="test">
            <Route path="toast" element={<ToastDemo />} />
            <Route path="buttons" element={<ButtonsDemo />} />

          </Route>
          {/* 위는 테스트 페이지입니다 나중에 삭제요망 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
