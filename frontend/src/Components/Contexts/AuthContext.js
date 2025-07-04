import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const AuthContext = createContext();

// Provider 컴포넌트
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 앱이 시작될 때 localStorage에서 사용자 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그인 함수
  const login = (email) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
