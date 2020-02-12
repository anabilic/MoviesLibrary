package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Genre;

import java.util.List;
import java.util.Optional;

public interface GenreService {

    List<Genre> listAllGenres();

    Genre createGenre(String name, List<String> movies);

    Genre editGenre(String name, List<String> movies);

    Optional<Genre> findById(Long id);

    void deleteGenre(Long id);

}
