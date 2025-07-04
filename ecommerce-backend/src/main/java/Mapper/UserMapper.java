package Mapper;

import java.util.List;
import DTO.UserDTO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    List<UserDTO> getAllUsers();
    void insertUser(UserDTO user);
	UserDTO getUserByUserId(String userId);
}
