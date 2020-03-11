package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.pagination.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MovieService {

    Page<Movie> listAllMovies(int page, int size);

    List<Movie> listAllMovies();

    Optional<Movie> findMovieById(Long id);

    Movie findMovieByName(String name);

    List<Actor> getMoviesActors(Long id);

    List<Genre> getMoviesGenres(Long id);

    List<Actor> getActorsByMovie(String name);

    List<Movie> searchMovies(String term);


    Movie saveFavourite(Boolean flag, Long id);

    Movie createMovie(String name, String director, String runningTime, String plot, LocalDate releaseInformation, String originalLanguage, byte[] file, List<String> actors, List<String> genres, String user);

    Movie editMovie(Long id,String name, String director, String runningTime,String plot, LocalDate releaseInformation, String originalLanguage);

    void deleteMovie(Long id);



}
