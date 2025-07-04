import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) return <p>로딩 중…</p>;

  return (
    <div>
      <h1>상품 상세 (ID: {product.id})</h1>
      <p><strong>상품명:</strong> {product.name}</p>
      <p><strong>가격:</strong> {product.price}원</p>
      <Link to="/">← 목록으로 돌아가기</Link>
    </div>
  );
}
