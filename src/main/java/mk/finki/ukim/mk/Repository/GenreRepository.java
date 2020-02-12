package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;

import java.util.List;
import java.util.Optional;

public interface GenreRepository {

    List<Genre> getAllGenres();

    Optional<Genre> findById(Long id);

    Genre save(Genre genre);

    List<Movie> checkMovies(List<String> movies);

    Genre findByName(String name);

    void delete(Long id);

}
