package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaGenreRepository extends JpaRepository<Genre,Long> {

    @Query("select m from Movie m where m.name in :movies")
    List<Movie> checkMovies(List<String> movies);

    @Query(value = "select g from Genre g where g.name=:name")
    Genre findByName(@Param("name") String name);

    @Query(value = "select g.name from Genre g where g.name like :name")
    String findBySameName(String name);

}
