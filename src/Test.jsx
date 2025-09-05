import '@styles/global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Toast from '@/components/toast/Toast';

function Test() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Toast />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Test;
