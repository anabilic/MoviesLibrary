package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.User;
import mk.finki.ukim.mk.Model.pagination.Page;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;


public interface UserService extends UserDetailsService {

    List<User> listAllUsers();

    Optional<User> findById(Long id);

    User findByUsername(String username);

    List<String> findUsers(List<Long> idList);

    User save(User user);

    User editUser(Long id,String userName,String name, String email,String gender, byte [] file);

    User editUserWithoutImg(Long id,String userName,String name, String email,String gender);

    void deleteUser(Long id);

    void deleteFavouriteBook(Long id,Movie movie);

    User addFavouriteMovie(User user);

    List<Movie> getFavouriteMoviesPerUser(Long id);

    Page<Movie> getFavouriteMoviesPerUserPaginate(Long id,int page,int size);

}
