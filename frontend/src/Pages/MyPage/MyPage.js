import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
    birth: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // 유저 정보 불러오기
  useEffect(() => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/ecommerce-backend/api/users/idcheck?userId=${userId}`)
      .then(res => res.json())
      .then(exists => {
        if (!exists) {
          alert("유저 정보를 찾을 수 없습니다.");
          navigate("/");
        } else {
          fetch(`http://localhost:8080/ecommerce-backend/api/users`)
            .then(res => res.json())
            .then(data => {
              const myInfo = data.find(u => u.userId === userId);
              setUser(myInfo);
              setFormData({
                password: "",
                email: myInfo.email || "",
                name: myInfo.name || "",
                birth: myInfo.birth || "",
                phone: myInfo.phone || "",
                address: myInfo.address || ""
              });
              setLoading(false);
            });
        }
      })
      .catch(err => {
        console.error("조회 오류", err);
        alert("오류가 발생했습니다.");
        navigate("/");
      });
  }, [userId, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    fetch(`http://localhost:8080/ecommerce-backend/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          alert("회원정보가 수정되었습니다.");
          window.location.reload();
        } else {
          alert("수정 실패");
        }
      })
      .catch(err => {
        console.error("수정 오류", err);
      });
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <form onSubmit={handleUpdate} className="mypage-form">
        <div>
          <label>아이디</label>
          <input type="text" value={user.userId} disabled />
        </div>
        <div>
          <label>비밀번호 (수정시 입력)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>생년월일</label>
          <input
            type="text"
            name="birth"
            value={formData.birth}
            disabled
          />
        </div>
        <div>
          <label>휴대폰번호</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default MyPage;
