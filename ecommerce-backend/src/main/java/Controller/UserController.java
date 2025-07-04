package Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import Mapper.UserMapper;

@Controller
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @RequestMapping("/users")
    public String getUsers(Model model) {
        model.addAttribute("users", userMapper.getAllUsers());
        return "userList";
    }
}
