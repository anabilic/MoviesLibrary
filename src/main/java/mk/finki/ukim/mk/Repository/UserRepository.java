package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.User;

import java.util.List;
import java.util.Optional;


public interface UserRepository {

    List<User> getAllUsers();

    User findByUsername(String username);

    Optional<User> findById(Long id);

    String findUserWithSameUsername(Long id,String username);

    List<String> findByIdList(List<Long> idList);

    List<Movie> getFavouriteMoviesPerUser(Long id);

    List<User> getUserPerFavouriteMovie(Long id);

    User save(User user);

    void delete(Long id);


}
