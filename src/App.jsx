import { Routes, Route } from "react-router-dom";
import InputPlayground from "@/pages/InputPlayground.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InputPlayground />} />
    </Routes>
  );
}
