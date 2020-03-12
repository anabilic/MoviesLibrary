package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.pagination.Page;
import mk.finki.ukim.mk.Repository.MovieRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Profile("jpa")
@Repository
public class MovieRepositoryImpl implements MovieRepository {

    private final JpaMovieRepository jpaMovieRepository;


    public MovieRepositoryImpl(JpaMovieRepository jpaMovieRepository) {
        this.jpaMovieRepository = jpaMovieRepository;
    }


    @Override
    public Page<Movie> getAllMovies(int page, int size) {
        org.springframework.data.domain.Page<Movie> movieResult =  this.jpaMovieRepository.findAll(PageRequest.of(page, size));
        return new Page<>(page, movieResult.getTotalPages(), size, movieResult.getContent());
    }


    @Override
    public List<Movie> getAllMovies() {
        return this.jpaMovieRepository.findAll();
    }


    @Override
    public Movie save(Movie movie) {
        return this.jpaMovieRepository.save(movie);
    }


    @Override
    public Movie saveAndFlash(Movie movie) {
        return this.jpaMovieRepository.saveAndFlush(movie);
    }


    @Override
    public void delete(Long id) {
        this.jpaMovieRepository.deleteById(id);
    }


    @Override
    public Optional<Movie> findById(Long id) {
        return this.jpaMovieRepository.findById(id);
    }


    @Override
    public List<Actor> checkActors(List<String> actors) {
        return this.jpaMovieRepository.checkActor(actors);
    }


    @Override
    public List<Genre> checkGenres(List<String> genres) {
        return this.jpaMovieRepository.checkGenres(genres);
    }


    @Override
    public Movie findByName(String name) {
        return this.jpaMovieRepository.findByName(name);
    }


    @Override
    public Movie checkIfMovieExists(String name) {
        return this.jpaMovieRepository.checkIfMovieExists(name);
    }


    @Override
    public List<Actor> getMoviesActor(Long id) {
        return this.jpaMovieRepository.getMoviesActors(id);
    }


    @Override
    public List<Genre> getMoviesGenres(Long id) {
        return this.jpaMovieRepository.getMoviesGenres(id);
    }


    @Override
    public List<Movie> searchMovies(String term) {
        return this.jpaMovieRepository.searchMovies(term);
    }


    @Override
    public List<Actor> getActorsByMovie(String name) {
        return this.jpaMovieRepository.getActorsByMovie(name);
    }


    @Override
    public Movie getMovieById(Long id, Long userId) {
        return this.jpaMovieRepository.getMovieById(id, userId);
    }

}
