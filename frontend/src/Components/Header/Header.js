import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout } = useContext(AuthContext) || {};

  return (
    <header className="header-container">
      {/* 로고 + 로그인/회원가입 */}
      <div className="header-top">
        {/* 가운데 로고 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginLeft: "9rem" // 필요에 따라 숫자 조정
          }}
        >
          <NavLink to="/" className="logo-link">
            <span className="logo-icon">🐶</span>
            <h1 className="logo-text">NURI PET</h1>
          </NavLink>
        </div>

        {/* 오른쪽 로그인/회원가입 */}
        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            marginRight: "1rem" // 필요에 따라 숫자 조정
          }}
        >
          {user ? (
            <>
              <NavLink
  to="/mypage"
  className={({ isActive }) =>
    isActive
      ? "account-link account-link-active"
      : "account-link"
  }
>
  마이페이지
</NavLink>

              <button
  onClick={logout}
  className="account-link"
  style={{
    background: "transparent",
    border: "none",
    cursor: "pointer"
  }}
>
  로그아웃
</button>

            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "account-link account-link-active"
                    : "account-link"
                }
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "account-link account-link-active"
                    : "account-link"
                }
              >
                회원가입
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* 카테고리 메뉴 */}
      <div className="category-menu">
        {["사료", "간식", "장난감", "패드"].map((category) => (
          <NavLink
            key={category}
            to={`/category/${category}`}
            className={({ isActive }) =>
              isActive
                ? "category-link category-link-active"
                : "category-link"
            }
          >
            {category}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

export default Header;
