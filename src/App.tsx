import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import CoursesPage from "./pages/CoursesPage";

/**
 * Root Application Component
 * Configures client-side routing with React Router DOM for the 4 core views:
 * - / (Dashboard Overview)
 * - /students (Student CRUD Management)
 * - /teachers (Teacher CRUD Management)
 * - /courses (Course CRUD Management)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* Fallback route redirects unknown paths to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
