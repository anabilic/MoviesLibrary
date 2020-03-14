package mk.finki.ukim.mk.Service.impl;

import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.exceptions.GenreInvalidId;
import mk.finki.ukim.mk.Model.exceptions.InvalidGenreName;
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
    public Optional<Genre> findById(Long id) {
        return genreRepository.findById(id);
    }


    @Override
    public Genre createGenre(String name, List<String> movies) {

        List<Movie> genresMovies = this.genreRepository.checkMovies(movies);

        Genre genre = new Genre();
        genre.setName(name);
        genre.setMovies(genresMovies);
        genre.setDeletedFlag(0);

        if(name.equals(this.genreRepository.findBySameName(name))){
            throw new InvalidGenreName();
        }else{
            return genreRepository.save(genre);
        }
    }


    @Override
    public Genre editGenre(Long id,String name, List<String> movies) {

        Genre genre = this.genreRepository.findById(id).orElseThrow(GenreInvalidId::new);

        List<Movie> genreMovies = this.genreRepository.checkMovies(movies);

        genre.setName(name);
        genre.setMovies(genreMovies);
        genre.setDeletedFlag(genre.getDeletedFlag());

        return genreRepository.save(genre);

    }


    @Override
    public void deleteGenre(Long id) {

        Genre genre =this.genreRepository.findById(id).orElseThrow(GenreInvalidId::new);
        genre.setDeletedFlag(1);
        this.genreRepository.save(genre);

    }

}
