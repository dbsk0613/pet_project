package Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Mapper.UserMapper;
import DTO.UserDTO;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private UserMapper userMapper;

    // 모든 유저 조회
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userMapper.getAllUsers();
    }

    // 유저 생성
    @PostMapping
    public void createUser(@RequestBody UserDTO user) {
        userMapper.insertUser(user);
    }

    // 아이디 중복 확인
    @GetMapping("/idcheck")
    public boolean checkUserId(@RequestParam("userId") String userId) {
        UserDTO user = userMapper.getUserByUserId(userId);
        return user != null;
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO inputUser) {
        UserDTO user = userMapper.getUserByUserId(inputUser.getUserId());
        if (user != null && user.getPassword().equals(inputUser.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }



}
