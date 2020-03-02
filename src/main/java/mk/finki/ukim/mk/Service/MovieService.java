package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.pagination.Page;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MovieService {

    Page<Movie> listAllMovies(int page, int size);

    List<Movie> listAllMovies();

    Movie createMovie(String name, String director, String runningTime, String plot, LocalDate releaseInformation, String originalLanguage, Integer Likes, byte[] file, List<String> actors, List<String> genres, String user);

    Movie editMovie(Long id,String name, String director, String runningTime,String plot, LocalDate releaseInformation, String originalLanguage, Integer Likes, List<String> actors, List<String> genres);

    void deleteMovie(Long id);

    Optional<Movie> findMovieById(Long id);

    Movie findMovieByName(String name);

    List<Actor> getMoviesActors(Long id);

    List<Genre> getMoviesGenres(Long id);

    List<Movie> searchMovies(String term);

    List<Actor> getActorsByMovie(String name);

}
