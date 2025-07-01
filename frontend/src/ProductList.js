import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')         // 백엔드에 매핑한 경로
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1>상품 목록</h1>
      <table>
        <thead>
          <tr><th>ID</th><th>상품명</th><th>가격(원)</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <Link to={`/products/${p.id}`}>{p.name}</Link>
              </td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
