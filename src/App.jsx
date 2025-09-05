import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout.jsx';

import Home from '@pages/Home.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import Workshop from '@pages/Workshop.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import Focus from '@pages/Focus.jsx';

/* 아래는 테스트 페이지입니다 나중에 삭제요망 */
import ToastDemo from '@pages/ToastDemo.jsx';
import Emoji from './components/Emoji/Emoji';
import DropDown from './components/DropDown/DropDown';
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
            <Route path="emoji" element={<Emoji studyId='6b78c2cd-cc98-44ea-810e-2c68d46ab6a4'/>} />
            <Route path="dropdown" element={<DropDown />} />
          </Route>
          {/* 위는 테스트 페이지입니다 나중에 삭제요망 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
