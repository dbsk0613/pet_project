import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Header from "./Components/Header/Header";
import MyPage from "./Pages/MyPage/MyPage";
import UserList from "./Components/UserList/UserList";
import { AuthProvider } from "./Components/Contexts/AuthContext";

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
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
