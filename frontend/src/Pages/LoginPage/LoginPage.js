import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Contexts/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/ecommerce-backend/api/users")
      .then((res) => res.json())
      .then((users) => {
        const user = users.find(
          (u) => u.userId === userId && u.password === password
        );
        if (user) {
          login(user.userId, user.email);
          navigate("/");
        } else {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
      })
      .catch((err) => {
        console.error("로그인 오류", err);
        alert("로그인 중 오류가 발생했습니다.");
      });
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginPage;
