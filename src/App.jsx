import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@pages/Home.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import DetailStudyPage from '@pages/DetailStudyPage.jsx';
import Habit from '@/pages/Habit';
import Focus from '@pages/Focus.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="study">
          <Route path="new" element={<CreateStudyPage />} />
          <Route path="update/:studyId" element={<CreateStudyPage />} />
          <Route path=":studyId" element={<DetailStudyPage />} />
        </Route>

        <Route path="habit">
          <Route path=":studyId" element={<Habit />} />
        </Route>

        <Route path="focus">
          <Route path=":studyId" element={<Focus />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
