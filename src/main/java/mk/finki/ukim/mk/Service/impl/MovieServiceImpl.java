package mk.finki.ukim.mk.Service.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.User;
import mk.finki.ukim.mk.Model.exceptions.MovieAlreadyExists;
import mk.finki.ukim.mk.Repository.MovieRepository;
import mk.finki.ukim.mk.Repository.UserRepository;
import mk.finki.ukim.mk.Service.MovieService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    private final UserRepository userRepository;

    public MovieServiceImpl(MovieRepository movieRepository, UserRepository userRepository) {
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Movie> listAllMovies() {
        return movieRepository.getAllMovies();
    }

    @Override
    public Movie createMovie(String name, String director, String runningTime,String plot, LocalDateTime releaseInformation, String originalLanguage, Integer Likes, List<String> actors, List<String> genres) {

        List<Actor> movieActors = this.movieRepository.checkActors(actors);
        List<Genre> movieGenres = this.movieRepository.checkGenres(genres);

        Movie movie = new Movie();
        movie.setName(name);
        movie.setDirector(director);
        movie.setRunningTime(runningTime);
        movie.setReleaseInformation(releaseInformation);
        movie.setOriginalLanguage(originalLanguage);
        movie.setLikes(Likes);
        movie.setPlot(plot);
        movie.setActors(movieActors);
        movie.setGenres(movieGenres);

        return movieRepository.save(movie);
    }

    @Override
    @Transactional
    public Movie createMovieWithImage(String name, String director, String runningTime,String plot,LocalDateTime releaseInformation, String originalLanguage, Integer Likes, byte[] file, List<String> actors, List<String> genres,String user) {

        Movie movie=this.movieRepository.checkIfMovieExists(name);

        if(movie==null){


            List<Actor> movieActors = this.movieRepository.checkActors(actors);
            List<Genre> movieGenres = this.movieRepository.checkGenres(genres);

            User USER = this.userRepository.findByUsername(user);


            movie = new Movie();
            movie.getId();
            movie.setName(name);
            movie.setDirector(director);
            movie.setRunningTime(runningTime);
            movie.setReleaseInformation(releaseInformation);
            movie.setOriginalLanguage(originalLanguage);
            movie.setLikes(Likes);
            movie.setPlot(plot);
            movie.setActors(movieActors);
            movie.setGenres(movieGenres);
            movie.setFile(file);
            movie.setUser(USER);
            return movieRepository.saveAndFlash(movie);

        }
        try {
            throw new MovieAlreadyExists("Movie with this name already exists");
        } catch (MovieAlreadyExists movieAlreadyExists) {
            movieAlreadyExists.getMessage();
        }
        return null;

    }

    @Override
    public Movie editMovie(String name, String director, String runningTime, String plot,LocalDateTime releaseInformation, String originalLanguage, Integer Likes, List<String> actors, List<String> genres) {
        Movie movie = this.movieRepository.findByName(name);

        List<Actor> movieActors = this.movieRepository.checkActors(actors);
        List<Genre> movieGenres = this.movieRepository.checkGenres(genres);

        movie.setDirector(director);
        movie.setRunningTime(runningTime);
        movie.setReleaseInformation(releaseInformation);
        movie.setOriginalLanguage(originalLanguage);
        movie.setLikes(Likes);
        movie.setPlot(plot);
        movie.setActors(movieActors);
        movie.setGenres(movieGenres);

        return movieRepository.save(movie);
    }


    @Override
    public Movie editMovieWithImage(String name, String director, String runningTime, String plot,LocalDateTime releaseInformation, String originalLanguage, Integer Likes, byte[] image, List<String> actors, List<String> genres) {

        Movie movie = this.movieRepository.findByName(name);

        List<Actor> movieActors = this.movieRepository.checkActors(actors);
        List<Genre> movieGenres = this.movieRepository.checkGenres(genres);

        movie.setDirector(director);
        movie.setRunningTime(runningTime);
        movie.setReleaseInformation(releaseInformation);
        movie.setOriginalLanguage(originalLanguage);
        movie.setLikes(Likes);
        movie.setPlot(plot);
        movie.setActors(movieActors);
        movie.setGenres(movieGenres);
        movie.setFile(image);

        return movieRepository.save(movie);

    }

    @Override
    public void deleteMovie(Long id) {
        this.movieRepository.delete(id);
    }

    @Override
    public Optional<Movie> findMovieById(Long id) {

        return this.movieRepository.findById(id);
    }

    @Override
    public Movie findMovieByName(String name) {
        return this.movieRepository.findByName(name);
    }

    @Override
    public List<Actor> getMoviesActors(Long id) {
        return this.movieRepository.getMoviesActor(id);
    }

    @Override
    public List<Genre> getMoviesGenres(Long id) {
        return this.movieRepository.getMoviesGenres(id);
    }

    @Override
    public List<Movie> searchMovies(String term) {
        return this.movieRepository.searchMovies(term);
    }
}
