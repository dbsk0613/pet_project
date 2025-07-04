<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <title>User List</title>
</head>
<body>
  <h2>회원 목록</h2>
  <c:forEach var="user" items="${users}">
    <p>${user.username}</p>
  </c:forEach>
</body>
</html>
