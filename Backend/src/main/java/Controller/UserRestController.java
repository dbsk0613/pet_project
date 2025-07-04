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

    /** 모든 유저 조회 */
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userMapper.getAllUsers();
    }

    /** 회원가입 */
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserDTO user) {
        userMapper.insertUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
    }

    /** 아이디 중복 확인 */
    @GetMapping("/idcheck")
    public boolean checkUserId(@RequestParam("userId") String userId) {
        UserDTO user = userMapper.getUserByUserId(userId);
        return user != null;
    }

    /** 회원정보 수정 */
    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(
        @PathVariable("userId") String userId,
        @RequestBody UserDTO updatedUser
    ) {
        updatedUser.setUserId(userId);
        userMapper.updateUser(updatedUser);
        return ResponseEntity.ok("회원정보가 수정되었습니다.");
    }

    /** 로그인 */
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO inputUser) {
        UserDTO user = userMapper.getUserByUserId(inputUser.getUserId());
        if (user != null && user.getPassword().equals(inputUser.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
