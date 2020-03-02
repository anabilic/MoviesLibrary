package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Role;
import mk.finki.ukim.mk.Model.User;
import mk.finki.ukim.mk.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserApi {

    private final UserService userService;

    public UserApi(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/registration")
    public ResponseEntity<?> saveUser(@RequestBody User user){
        if(userService.findByUsername(user.getUsername()) != null){
            //Status code 409
            return  new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        user.setRole(Role.USER);
        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<?> getUser(Principal principal){
        //Principal principal = request.getUserPrincipal();
        if(principal == null || principal.getName() == null){
            //This means; logout will be successful. login?logout
            return new ResponseEntity<>(HttpStatus.OK);
        }
        //username = principal.getName()
        return ResponseEntity.ok(userService.findByUsername(principal.getName()));
    }

    @PatchMapping("/{id}")
    public User editUser(
            @PathVariable(value="id") Long id,
            @RequestParam(value = "username") String userName,
            @RequestParam(value = "name")String name,
            @RequestParam(value = "email")String email,
            @RequestParam(value = "gender")String gender,
            @RequestParam(value = "file",required = false) MultipartFile file) throws IOException {

        if(file==null){
            User user=this.userService.findById(id).get();
            return (this.userService.editUser(id,userName,name,email,gender,user.getFile()));
        }
        return (this.userService.editUser(id,userName,name,email,gender,file.getBytes()));
    }

    @PatchMapping("/edit/{id}")
    public User editUserWithoutImg(
            @PathVariable(value="id") Long id,
            @RequestParam(value = "username") String userName,
            @RequestParam(value = "name")String name,
            @RequestParam(value = "email")String email,
            @RequestParam(value = "gender")String gender) {

        return this.userService.editUserWithoutImg(id,userName,name,email,gender);
    }


    @PostMapping("/names")
    public ResponseEntity<?> getNamesOfUsers(@RequestBody List<Long> idList){
        return ResponseEntity.ok(userService.findUsers(idList));
    }

    @GetMapping(params = "id")
    public Optional<User> getById(@RequestParam Long id){
        return userService.findById(id);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.listAllUsers());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.userService.deleteUser(id);
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("It is working...");
    }

}
