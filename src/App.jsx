import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ToastDemo from "./pages/ToastDemo.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />   {/* / 경로 */}
        <Route path="toast" element={<ToastDemo />} />
      </Route>
    </Routes>
  );
}