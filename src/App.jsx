import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@/components/header/Header';
import Workshop from '@pages/Workshop.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import Focus from '@pages/Focus.jsx';
import ButtonsDemo from '@pages/ButtonsDemo.jsx';

/* 아래는 테스트 페이지입니다 나중에 삭제요망 */
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
        <Route index element={<Header />} />
        <Route path="study">
          <Route path="new" element={<CreateStudyPage />} />
          <Route path="detail" element={<DetailStudyPage />} />
          {/*미구현*/}
        </Route>
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/focus" element={<Focus />} />
        {/*미구현*/}

        <Route path="buttons" element={<ButtonsDemo />} />

        {/* 아래는 테스트 페이지입니다 나중에 삭제요망 */}
        <Route path="test">
          <Route path="emoji" element={<Emoji studyId="6b78c2cd-cc98-44ea-810e-2c68d46ab6a4" />} />
          <Route path="dropdown" element={<DropDown />} />
          <Route
            path="tag"
            element={
              <Tag
                bgColor={'rgba(0,0,0,0.5)'}
                fontSize={12}
                studyId={'6b78c2cd-cc98-44ea-810e-2c68d46ab6a4'}
              />
            }
          />
        </Route>
        {/* 위는 테스트 페이지입니다 나중에 삭제요망 */}

        {/* 아래는 리팩토링 페이지입니다 나중에 삭제요망 */}
        <Route path="refactor">
          <Route index element={<Card />} />
        </Route>
        {/* 위는 리팩토링 페이지입니다 나중에 삭제요망 */}
      </Routes>
    </BrowserRouter>
  );
}
