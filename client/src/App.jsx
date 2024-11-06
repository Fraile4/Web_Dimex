import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import TasksPage from "./pages/TasksPage"
import PaPPage from "./pages/PaPPage"
import CCPage from "./pages/CCPage"

import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Dimex</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/Pap" element={<PaPPage />} />
            <Route path="/CC" element={<CCPage />} />
          </Route>
        
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
