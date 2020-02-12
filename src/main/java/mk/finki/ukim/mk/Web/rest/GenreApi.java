package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Genre;
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
                           @RequestParam(value = "movies", required = false) List<String> movies) {

        Genre newGenre = this.genreService.createGenre(name, movies);
        return newGenre;
    }

    @PatchMapping("/{name}")
    @ResponseStatus(HttpStatus.CREATED)
    public Genre editGenre(@PathVariable String name,
                           @RequestParam(value = "movies",required = false) List<String> movies) {

        Genre editedGenre = this.genreService.editGenre(name, movies);
        return editedGenre;
    }

    @DeleteMapping("/{id}")
    public void deleteGenre(@PathVariable Long id) {
        this.genreService.deleteGenre(id);
    }
}
