import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/ecommerce-backend/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("받은 데이터:", data); // 여기에 콘솔 출력
        setUsers(data);
      })
      .catch((error) => console.error("API 호출 오류:", error));
  }, []);

  return (
    <div>
      <h2>유저 목록</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
