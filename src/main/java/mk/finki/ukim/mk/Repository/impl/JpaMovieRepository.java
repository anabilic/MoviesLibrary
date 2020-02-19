package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaMovieRepository extends JpaRepository<Movie,Long> {

    @Query("select a from Actor a where a.name in :actors")
    List<Actor> checkActor(List<String> actors);

    @Query("select g from Genre g where g.name in :genres")
    List<Genre> checkGenres(List<String> genres);

    @Query(value = "select m from Movie m where m.name=:name")
    Movie findByName(@Param("name") String name);

    @Query("select m from Movie m where m.name like :name")
    Movie checkIfMovieExists(String name);

    @Query(value = "select a from Actor a join a.movies m where m.Id=:id")
    List<Actor> getMoviesActors(@Param("id") Long id);

    @Query(value = "select g from Genre g join g.movies m where m.Id=:id")
    List<Genre> getMoviesGenres(@Param("id") Long id);
}