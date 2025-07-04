import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Contexts/AuthContext";
import "./MyPage.css";

function MyPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
    birth: "",
    phone: "",
    address: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/ecommerce-backend/api/users/idcheck?userId=${userId}`)
      .then((res) => res.json())
      .then((exists) => {
        if (!exists) {
          alert("유저 정보를 찾을 수 없습니다.");
          navigate("/");
        } else {
          fetch(`http://localhost:8080/ecommerce-backend/api/users`)
            .then((res) => res.json())
            .then((data) => {
              const myInfo = data.find((u) => u.userId === userId);
              if (!myInfo) {
                alert("유저 정보를 찾을 수 없습니다.");
                navigate("/");
                return;
              }
              setFormData({
                password: "",
                email: myInfo.email || "",
                name: myInfo.name || "",
                birth: myInfo.birth || "",
                phone: myInfo.phone || "",
                address: myInfo.address || "",
                profileImage: null,
              });
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        console.error("조회 오류", err);
        alert("오류가 발생했습니다.");
        navigate("/");
      });
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    fetch(`http://localhost:8080/ecommerce-backend/api/users/${userId}`, {
      method: "PUT",
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          alert("회원정보가 수정되었습니다.");
          window.location.reload();
        } else {
          alert("수정 실패");
        }
      })
      .catch((err) => {
        console.error("수정 오류", err);
      });
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <form onSubmit={handleUpdate} className="mypage-form" encType="multipart/form-data">
        <div className="top-section">
          <div className="left-fields">
            <div className="form-group short">
              <label>아이디</label>
              <input type="text" value={userId} disabled />
            </div>
            <div className="form-group short">
              <label>비밀번호 (수정시 입력)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="profile-upload">
            <label>프로필 사진</label>
            {imagePreview ? (
              <img src={imagePreview} alt="프로필 미리보기" className="profile-preview" />
            ) : (
              <div className="profile-placeholder">미리보기 없음</div>
            )}
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>생년월일</label>
          <input type="text" name="birth" value={formData.birth} disabled />
        </div>
        <div className="form-group">
          <label>휴대폰번호</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
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
