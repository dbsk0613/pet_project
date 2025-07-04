import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();

  // 카테고리별 데이터
  const products = {
    간식: [
      {
        title: "소고기 간식",
        image: "/PNG/beef.png",
        price: "5,000"
      },
      {
        title: "치즈 오리 간식",
        image: "/PNG/che_duck.png",
        price: "6,000"
      },
      {
        title: "밀크 치킨 간식",
        image: "/PNG/milk_chic.png",
        price: "7,500"
      },
      {
        title: "밀크 오리 간식",
        image: "/PNG/milk_duck.png",
        price: "8,000"
      }
    ],
    사료: [
      {
        title: "로얄 골든 사료",
        image: "/KibblePNG/royal_golden.png",
        price: "25,000"
      },
      {
        title: "로얄 저알러지 사료",
        image: "/KibblePNG/royal_hypo.png",
        price: "27,000"
      },
      {
        title: "로얄 푸들 사료",
        image: "/KibblePNG/royal_poodle.png",
        price: "26,000"
      },
      {
        title: "로얄 퍼피 사료",
        image: "/KibblePNG/royal_puppy.png",
        price: "24,000"
      }
    ],
    장난감: [
    {
      title: "삑삑이",
      image: "/Toy/bbikbbik.png",
      price: "3,500"
    },
    {
      title: "치킨 인형",
      image: "/Toy/chicken.png",
      price: "4,000"
    },
    {
      title: "구황작물 노즈워크",
      image: "/Toy/nosework.png",
      price: "6,500"
    },
    {
      title: "티슈 노즈워크크",
      image: "/Toy/tissue.png",
      price: "5,000"
    }
  ],
  패드: [
  {
    title: "마이픽 패드",
    image: "/Pad/mypickpad.png",
    price: "9,000"
  },
  {
    title: "패스룸 패드",
    image: "/Pad/pathroompad.png",
    price: "11,000"
  },
  {
    title: "포우리패드",
    image: "/Pad/pawripad.png",
    price: "10,000"
  },
  {
    title: "펫츠놀로지 패드",
    image: "/Pad/petsnologypad.png",
    price: "12,000"
  }
]

  };

  // 현재 카테고리 상품
  const filtered = products[category] || [];

  return (
    <main>
      <h2 className="category-title">{category} 목록</h2>
      <div className="product-list">
        {filtered.map((product, idx) => (
          <ProductCard
            key={idx}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </main>
  );
}

export default CategoryPage;
