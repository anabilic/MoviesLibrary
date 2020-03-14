package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface JpaUserRepository extends JpaRepository<User,Long> {


    @Query("select u from User u where u.username=:username")
    User findByUsername(String username);

    @Query("select u.name from User u where u.id  in (:pIdList)")
    List<String> findByIdList(@Param("pIdList") List<Long> idList);

    @Query("select u.username from User u where u.id<>:id and  u.username like :username")
    String findUserWithSameUsername(Long id,String username);


    @Query(value = "select u.favouriteMovies from User u  where u.id=:id")
    List<Movie> getFavouriteMoviesPerUser(@Param("id") Long id);

    @Query(value = "select m.userFavourites from Movie m  where m.Id=:id")
    List<User> getUserPerFavouriteMovie(@Param("id") Long id);

}
