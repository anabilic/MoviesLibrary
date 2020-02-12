package mk.finki.ukim.mk.Service.impl;

import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Repository.GenreRepository;
import mk.finki.ukim.mk.Service.GenreService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    public GenreServiceImpl(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Override
    public List<Genre> listAllGenres() {
        return genreRepository.getAllGenres();
    }

    @Override
    public Genre createGenre(String name, List<String> movies) {

        List<Movie> genresMovies = this.genreRepository.checkMovies(movies);

        Genre genre = new Genre();
        genre.setName(name);
        genre.setMovies(genresMovies);

        return genreRepository.save(genre);
    }

    @Override
    public Genre editGenre(String name, List<String> movies) {

        Genre genre = this.genreRepository.findByName(name);

        List<Movie> genreMovies = this.genreRepository.checkMovies(movies);

        genre.setMovies(genreMovies);

        return genreRepository.save(genre);
    }

    @Override
    public Optional<Genre> findById(Long id) {
        return genreRepository.findById(id);
    }

    @Override
    public void deleteGenre(Long id) {
        this.genreRepository.delete(id);
    }
}
