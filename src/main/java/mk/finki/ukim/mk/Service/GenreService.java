package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Genre;

import java.util.List;
import java.util.Optional;

public interface GenreService {

    List<Genre> listAllGenres();

    Optional<Genre> findById(Long id);

    Genre createGenre(String name, List<String> movies);

    Genre editGenre(Long id,String name, List<String> movies);

    void deleteGenreById(Long id);

    void deleteGenre(Long id);
}
