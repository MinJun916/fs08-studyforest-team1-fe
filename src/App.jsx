import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout.jsx';
import Home from '@pages/Home.jsx';
import ToastDemo from '@pages/ToastDemo.jsx';
import CreateStudyPage from '@pages/CreateStudyPage.jsx';
import Workshop from '@pages/Workshop.jsx';
import Emoji from './components/Emoji/Emoji';
import '@/styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="toast" element={<ToastDemo />} />
          <Route path="/study/new" element={<CreateStudyPage />} />
          <Route path="/emoji" element={<Emoji />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
