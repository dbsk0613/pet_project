// src/App.js
import { Routes, Route, Link } from 'react-router-dom';
import ProductList   from './ProductList';
import ProductDetail from './ProductDetail';

function App() {
  return (
    <>
      <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
        <h1>NURI</h1>
      </header>
      <nav style={{ padding: '0.5rem' }}>
        <Link to="/">상품 목록</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/"             element={<ProductList />}   />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
