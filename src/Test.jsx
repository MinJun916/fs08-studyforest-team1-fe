import '@styles/global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@components/layout/Layout.jsx';
import Home from '@pages/Home.jsx';
import Workshop from '@pages/Workshop.jsx';
import ToastDemo from '@pages/ToastDemo.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';

function Test() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="toast" element={<ToastDemo />} />
          <Route path="/study/new" element={<CreateStudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Test;
