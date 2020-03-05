package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.User;

import java.util.List;
import java.util.Optional;


public interface UserRepository {

    List<User> getAllUsers();

    User findByUsername(String username);

    Optional<User> findById(Long id);

    List<String> findByIdList(List<Long> idList);

    String findUserWithSameUsername(Long id,String username);

    User save(User user);

    void delete(Long id);


}
