import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    address: ""
  });

  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "password" || name === "confirmPassword") {
      const password = name === "password" ? value : formData.password;
      const confirm = name === "confirmPassword" ? value : formData.confirmPassword;

      setPasswordMatch(password && confirm && password === confirm);
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecial = /[!@#$%^&*]/.test(password);
      setPasswordValid(hasUppercase && hasSpecial);
    }
  };

  // 아이디 중복 확인 API 호출
  const handleIdCheck = async () => {
    try {
      const response = await fetch(`http://localhost:8080/ecommerce-backend/api/users/idcheck?userId=${formData.userId}`);
      const result = await response.json();
      if (result.exists) {
        setIdCheckMessage("이미 사용중인 아이디입니다.");
      } else {
        setIdCheckMessage("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("중복확인 오류", error);
      setIdCheckMessage("오류가 발생했습니다.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!passwordValid) {
      alert("비밀번호에 대문자와 특수문자를 포함해야 합니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/ecommerce-backend/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
          email: formData.email,
          name: formData.name,
          birth: formData.birth,
          phone: formData.phone,
          address: formData.address,
          role: "USER"
        })
      });

      if (response.ok) {
        alert("회원가입 완료! 로그인 해주세요.");
        navigate("/login");
      } else {
        alert("회원가입 실패: 서버 오류");
      }
    } catch (error) {
      console.error("회원가입 오류", error);
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSignup}>
      <h2>회원가입</h2>

      <input
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="birth"
        placeholder="생년월일"
        value={formData.birth}
        onChange={handleChange}
        min="1900-01-01"
        max="2099-12-31"
        required
/>


      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={formData.userId}
          onChange={handleChange}
          required
          style={{ flex: 1 }}
        />
        <button
          type="button"
          onClick={handleIdCheck}
          style={{
            background: "#f9c784",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            padding: "0.5rem"
          }}
        >
          중복확인
        </button>
      </div>

      {idCheckMessage && (
        <span
          style={{
            color: idCheckMessage.includes("사용") ? "green" : "red",
            fontSize: "0.9rem"
          }}
        >
          {idCheckMessage}
        </span>
      )}

      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <div style={{ color: passwordMatch ? "green" : "red", fontSize: "0.9rem" }}>
          {passwordMatch
            ? "✅ 비밀번호가 일치합니다."
            : "❌ 비밀번호가 일치하지 않습니다."}
        </div>
        <div style={{ color: passwordValid ? "green" : "red", fontSize: "0.9rem" }}>
          {passwordValid
            ? "✅ 비밀번호에 대문자와 특수문자가 포함되어 있습니다."
            : "❌ 비밀번호에 대문자와 특수문자를 포함해야 합니다."}
        </div>
      </div>

      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="휴대폰 번호"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="주소"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignupPage;
