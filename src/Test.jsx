import '@styles/global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PasswordGateModal from '@/components/modal/PasswordGetModal';

function Test() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PasswordGateModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Test;
