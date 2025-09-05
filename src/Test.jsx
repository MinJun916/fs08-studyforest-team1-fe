import '@styles/global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@components/header/Header.jsx';

function Test() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Test;
