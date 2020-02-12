package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Movie;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MovieService {

    List<Movie> listAllMovies();

    Movie createMovie(String name, String director, String runningTime,String plot, LocalDateTime releaseInformation, String originalLanguage, Integer Likes, List<String> actors, List<String> genres);

    Movie createMovieWithImage(String name, String director, String runningTime,String plot, LocalDateTime releaseInformation, String originalLanguage, Integer Likes, byte[] file, List<String> actors, List<String> genres);

    Movie editMovie(String name, String director, String runningTime,String plot, LocalDateTime releaseInformation, String originalLanguage, Integer Likes, List<String> actors, List<String> genres);

    Movie editMovieWithImage(String name, String director, String runningTime, String plot,LocalDateTime releaseInformation, String originalLanguage, Integer Likes, byte[] image, List<String> actors, List<String> genres);

    void deleteMovie(Long id);

    Optional<Movie> findMovieById(Long id);

    Movie findMovieByName(String name);

}
