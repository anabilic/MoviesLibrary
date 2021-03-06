package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.pagination.Page;

import java.util.List;
import java.util.Optional;

public interface MovieRepository {

    Page<Movie> getAllMovies(int page, int size);

    List<Movie> getAllMovies();

    List<Movie> getAllMoviesPaged();

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

    List<Movie> searchMovies(String term);

    List<Actor> getActorsByMovie(String name);

    Movie getMovieById(Long id, Long userId);

}
