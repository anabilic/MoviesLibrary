package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;

import java.util.List;
import java.util.Optional;

public interface MovieRepository {

    List<Movie> getAllMovies();

    Movie save(Movie movie);

    Movie saveAndFlash(Movie movie);

    void delete(Long id);

    Optional<Movie> findById(Long id);

    List<Actor> checkActors(List<String> actors);

    List<Genre> checkGenres(List<String> genres);

    Movie findByName(String name);

    Movie checkIfMovieExists(String name);

    List<Actor> getMoviesActor(Long id);

    List<Genre> getMoviesGenres(Long id);

}
