import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ToastDemo from "./pages/ToastDemo.jsx";
import CreateStudyPage from "./pages/CreateStudyPage";
import './styles/fonts.scss';
import "./styles/global.scss";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />   {/* / 경로 */}
        <Route path="toast" element={<ToastDemo />} />
        <Route path="/study/new" element={<CreateStudyPage />} />
      </Route>
    </Routes>
  );
}