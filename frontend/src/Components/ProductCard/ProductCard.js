// src/Components/ProductCard.js
import React from "react";
import "./ProductCard.css";

function ProductCard({ title, image, price }) {
  return (
       <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h3>{title}</h3>
      <p style={{ color: "#f4978e" }}>₩ {price}</p>
      <div className="buttons">
        <button className="cart-button">장바구니 담기</button>
        <button className="buy-button">바로 구매</button>
      </div>
    </div>
  );
}

export default ProductCard;
