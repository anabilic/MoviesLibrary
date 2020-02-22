package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Genre;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Service.GenreService;
import mk.finki.ukim.mk.Service.MovieService;
import mk.finki.ukim.mk.Service.UserService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/movie",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class MovieApi {

    private final MovieService movieService;

    private final GenreService genreService;

    private final UserService userService;

    public MovieApi(MovieService movieService, GenreService genreService, UserService userService) {
        this.movieService = movieService;
        this.genreService = genreService;
        this.userService = userService;
    }

    @GetMapping("/id/{id}")
    public Optional<Movie> getMovie(@PathVariable Long id){ return this.movieService.findMovieById(id); }

    @GetMapping("/name/{name}")
    public Movie getMovieByName(@PathVariable String name){
        return this.movieService.findMovieByName(name);
    }

    @GetMapping
    public List<Movie> getAllMovies(){
        return  this.movieService.listAllMovies();
    }

    @GetMapping(params = "term")
    public List<Movie> searchMovie(@RequestParam String term) {
        return movieService.searchMovies(term);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Movie createMovie(@RequestParam(value = "name") String name,
                             @RequestParam(value = "director",required = false) String director ,
                             @RequestParam(value = "runningTime" , required = false) String runningTime,
                             @RequestParam(value="plot",required=false) String plot,
                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime releaseInformation,
                             @RequestParam(value = "originalLanguage",required = false) String originalLanguage,
                             @RequestParam(value = "likes",required = false) Integer likes,
                             @RequestParam(value="actors",required = false) List<String> actors,
                             @RequestParam(value = "genres",required = false) List<String> genres){



        Movie newMovie = this.movieService.createMovie(name,director,runningTime,plot,releaseInformation,originalLanguage,likes,actors,genres);
        return newMovie;
    }

    @PostMapping(value="/image")
    @ResponseStatus(HttpStatus.CREATED)
    public Movie createMovieWithImage(@RequestParam(value = "name") String name,
                                      @RequestParam(value = "director",required = false) String director ,
                                      @RequestParam(value = "runningTime" , required = false) String runningTime,
                                      @RequestParam(value="plot",required=false) String plot,
                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String releaseInformation,
                                      @RequestParam(value = "originalLanguage",required = false)  String originalLanguage,
                                      @RequestParam(value = "likes",required = false) Integer likes,
                                      @RequestParam(value="actors",required = false) ArrayList<String> actors,
                                      @RequestParam(value = "genres",required = false) ArrayList<String> genres,
                                      @RequestParam(value = "user",required = false) String user,
                                      @RequestParam(value = "file",required = false) MultipartFile file) throws IOException {

        LocalDateTime localDate = LocalDateTime.parse(releaseInformation);

        Movie newMovie = this.movieService.createMovieWithImage(name,director,runningTime,plot,localDate,originalLanguage,likes,file.getBytes(),actors,genres,user);
        return newMovie;
    }

    @PatchMapping("/{name}/image")
    @ResponseStatus(HttpStatus.CREATED)
    public Movie editMovieWithImage(@PathVariable String name,
                                    @RequestParam(value = "director",required = false) String director ,
                                    @RequestParam(value = "runningTime" , required = false) String runningTime,
                                    @RequestParam(value="plot",required=false) String plot,
                                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime releaseInformation,
                                    @RequestParam(value = "originalLanguage",required = false)  String originalLanguage,
                                    @RequestParam(value = "likes",required = false) Integer likes,
                                    @RequestParam(value="actors",required = false) List<String> actors,
                                    @RequestParam(value = "genres",required = false) List<String> genres,
                                    @RequestParam("image") MultipartFile image) throws IOException{

        Movie editedMovie = this.movieService.editMovieWithImage(name,director,runningTime,plot,releaseInformation,originalLanguage,likes,image.getBytes(),actors,genres);
        return editedMovie;
    }

    @PatchMapping("/{name}")
    @ResponseStatus(HttpStatus.CREATED)
    public Movie editMovie(@PathVariable String name,
                           @RequestParam(value = "director",required = false) String director ,
                           @RequestParam(value = "runningTime" , required = false) String runningTime,
                           @RequestParam(value="plot",required=false) String plot,
                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String releaseInformation,
                           @RequestParam(value = "originalLanguage",required = false)  String originalLanguage,
                           @RequestParam(value = "likes",required = false) Integer likes,
                           @RequestParam(value="actors",required = false) List<String> actors,
                           @RequestParam(value = "genres",required = false) List<String> genres){

        LocalDateTime localDate = LocalDateTime.parse(releaseInformation);

        Movie editedMovie = this.movieService.editMovie(name,director,runningTime,plot,localDate,originalLanguage,likes,actors,genres);
        return editedMovie;
    }


    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        this.movieService.deleteMovie(id);
    }

    @GetMapping("/{id}/actors")
    public List<Actor> getMoviesActors(@PathVariable Long id){
        return this.movieService.getMoviesActors(id);
    }

    @GetMapping("/{id}/genres")
    public List<Genre> getMoviesGenres(@PathVariable Long id){
        return this.movieService.getMoviesGenres(id);
    }

    @GetMapping("/{name}/movie")
    public List<Actor> getActorsByMovie(@PathVariable String name){
        return this.movieService.getActorsByMovie(name);
    }
}
