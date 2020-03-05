package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Repository.GenreRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Profile("jpa")
@Repository
public class GenreRepositoryImpl implements GenreRepository {

    private final JpaGenreRepository jpaGenreRepository;

    public GenreRepositoryImpl(JpaGenreRepository jpaGenreRepository) {
        this.jpaGenreRepository = jpaGenreRepository;
    }

    @Override
    public List<Genre> getAllGenres() {
        return jpaGenreRepository.findAll();
    }

    @Override
    public Optional<Genre> findById(Long id) {
        return this.jpaGenreRepository.findById(id);
    }

    @Override
    public Genre save(Genre genre) {
        return this.jpaGenreRepository.save(genre);
    }

    @Override
    public List<Movie> checkMovies(List<String> movies) {
        return this.jpaGenreRepository.checkMovies(movies);
    }

    @Override
    public Genre findByName(String name) {
        return this.jpaGenreRepository.findByName(name);
    }

    @Override
    public void delete(Long id) {
        this.jpaGenreRepository.deleteById(id);
    }

    @Override
    public String findBySameName(String name) {
        return this.jpaGenreRepository.findBySameName(name);
    }
}
