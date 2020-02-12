package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;


public interface UserService extends UserDetailsService {

    List<User> listAllUsers();

    void deleteUser(Long id);

    Optional<User> findById(Long id);

    User save(User user);

    User findByUsername(String username);

    List<String> findUsers(List<Long> idList);
}
