<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>상품 목록</title>
  <style>
    table { border-collapse: collapse; width: 50%; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #eee; }
  </style>
</head>
<body>
  <h1>상품 목록</h1>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>상품명</th>
        <th>가격(원)</th>
      </tr>
    </thead>
    <tbody>
      <c:forEach var="product" items="${products}">
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
        </tr>
      </c:forEach>
    </tbody>
  </table>
</body>
</html>
