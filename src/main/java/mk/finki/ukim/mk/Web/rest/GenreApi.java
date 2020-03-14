package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.exceptions.GenreAlreadyExists;
import mk.finki.ukim.mk.Model.exceptions.GenreInvalidId;
import mk.finki.ukim.mk.Service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/genre",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class GenreApi {

    private final GenreService genreService;

    public GenreApi(GenreService genreService) {
        this.genreService = genreService;
    }


    @GetMapping
    public List<Genre> getAllGenres(){
        return  this.genreService.listAllGenres();
    }


    @GetMapping("/{id}")
    public Optional<Genre> getGenre(@PathVariable Long id){
        return this.genreService.findById(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Genre createGenre(@RequestParam(value = "name") String name,
                           @RequestParam(value = "movies", required = false) List<String> movies) throws GenreAlreadyExists {

        Genre newGenre = this.genreService.createGenre(name, movies);
        return newGenre;
    }


    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Genre editGenre(@PathVariable Long id,
                           @RequestParam(value = "name") String name,
                           @RequestParam(value = "movies",required = false) List<String> movies) throws GenreInvalidId {

        Genre editedGenre = this.genreService.editGenre(id,name,movies);
        return editedGenre;
    }


    @DeleteMapping("/{id}")
    public void deleteGenre(@PathVariable Long id) {
        this.genreService.deleteGenre(id);
    }

}
