import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Header from "./Components/Header/Header";
import { AuthProvider } from "./Components/Contexts/AuthContext";

// ✅ UserList 컴포넌트 임포트
import UserList from "./Components/UserList/UserList";

function App() {
  return (
    <AuthProvider>
      <Header />

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <div>마이페이지 (로그인한 사용자만 볼 수 있어요)</div>
              </PrivateRoute>
            }
          />
          {/* ✅ 유저 목록 화면 라우트 */}
          <Route path="/users" element={<UserList />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
