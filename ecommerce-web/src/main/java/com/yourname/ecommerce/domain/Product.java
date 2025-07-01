package com.yourname.ecommerce.domain;

public class Product {
    private int id;
    private String name;
    private int price;

    // ① 기본 생성자
    public Product() {}

    // ② 파라미터 3개짜리 생성자 (이게 필요했던 부분)
    public Product(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // ③ getters / setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
}
