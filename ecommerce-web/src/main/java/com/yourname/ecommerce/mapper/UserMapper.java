package com.yourname.ecommerce.mapper;

import com.yourname.ecommerce.domain.User;

public interface UserMapper {
    void insertUser(User user);
    User findByUsername(String username);
}
