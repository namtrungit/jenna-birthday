import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, MemoriesPage, QuestionsPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
