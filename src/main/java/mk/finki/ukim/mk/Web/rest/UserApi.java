package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.Role;
import mk.finki.ukim.mk.Model.User;
import mk.finki.ukim.mk.Model.exceptions.InvalidMovieId;
import mk.finki.ukim.mk.Model.exceptions.MovieAlreadyAddedToFavourites;
import mk.finki.ukim.mk.Model.exceptions.UserIdInvalid;
import mk.finki.ukim.mk.Model.pagination.Page;
import mk.finki.ukim.mk.Service.MovieService;
import mk.finki.ukim.mk.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserApi {

    private final UserService userService;

    private final MovieService movieService;


    public UserApi(UserService userService, MovieService movieService) {
        this.userService = userService;
        this.movieService = movieService;
    }


    //Method for registration of user
    @PostMapping("/registration")
    public ResponseEntity<?> saveUser(@RequestBody User user){
        if(userService.findByUsername(user.getUsername()) != null){
            //Status code 409
            return  new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        user.setRole(Role.USER);
        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
    }

    //Method for login
    @GetMapping("/login")
    public ResponseEntity<?> getUser(Principal principal){
        //Principal principal = request.getUserPrincipal();
        if(principal == null || principal.getName() == null){
            //This means; logout will be successful. login?logout
            return new ResponseEntity<>(HttpStatus.OK);
        }
        //username = principal.getName()
        return ResponseEntity.ok(userService.findByUsername(principal.getName()));
    }


    //Method for editing user with adding picture
    @PatchMapping("/{id}")
    public User editUser(
            @PathVariable(value="id") Long id,
            @RequestParam(value = "username") String userName,
            @RequestParam(value = "name")String name,
            @RequestParam(value = "email")String email,
            @RequestParam(value = "gender")String gender,
            @RequestParam(value = "file",required = false) MultipartFile file) throws IOException {

        if(file==null){
            User user=this.userService.findById(id).get();
            return (this.userService.editUser(id,userName,name,email,gender,user.getFile()));
        }
        return (this.userService.editUser(id,userName,name,email,gender,file.getBytes()));
    }

    //Method for editing user without adding picture
    @PatchMapping("/edit/{id}")
    public User editUserWithoutImg(
            @PathVariable(value="id") Long id,
            @RequestParam(value = "username") String userName,
            @RequestParam(value = "name")String name,
            @RequestParam(value = "email")String email,
            @RequestParam(value = "gender")String gender) {

        return this.userService.editUserWithoutImg(id,userName,name,email,gender);
    }

    //Method for adding movie to favourites by user
    @PatchMapping(path = "/addFavourite/{idUser}/{idMovie}")
    public User userAddFavourite(@PathVariable(value="idUser") Long idUser, @PathVariable(value = "idMovie") Long idMovie){

        User user=this.userService.findById(idUser).orElseThrow(UserIdInvalid::new);

        Movie movie=this.movieService.findMovieById(idMovie).orElseThrow(InvalidMovieId::new);


        List<Movie> moviesAddedToFavourites = userService.getFavouriteMoviesPerUser(idUser);

        boolean check = moviesAddedToFavourites.stream().anyMatch(x -> x.getId().equals(idMovie));

        if(check){
            throw new MovieAlreadyAddedToFavourites();
        }

        moviesAddedToFavourites.add(movie);
        movieService.saveFavourite(true,idMovie);
        user.setFavouriteMovies(moviesAddedToFavourites);

        return this.userService.addFavouriteMovie(user);
    }

    //Method for finding all the favourite movies per user
    @GetMapping("/favouritesPerUser/{id}")
    public List<Movie> getFavouriteMoviesPerUser(@PathVariable(value="id") Long id){
        return userService.getFavouriteMoviesPerUser(id);
    }

    //Method for finding all the favourite movies per user with pagination
    @GetMapping(path = "/favouritesPerUserPaginate/{id}")
    public Page<Movie> getFavouriteMoviesPerUserPaginate(@PathVariable(value = "id")Long id,
                                                         @RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                                         @RequestHeader(name = "page-size", defaultValue = "10", required = false)int size){
        return this.userService.getFavouriteMoviesPerUserPaginate(id,page,size);
    }

    @PostMapping("/names")
    public ResponseEntity<?> getNamesOfUsers(@RequestBody List<Long> idList){
        return ResponseEntity.ok(userService.findUsers(idList));
    }

    //Method for getting user by id
    @GetMapping(params = "id")
    public Optional<User> getById(@RequestParam Long id){
        return userService.findById(id);
    }

    //Method for listing all the users
    @GetMapping
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.listAllUsers());
    }

    //Method for deleting favourite book of user
    @PostMapping(path = "/deleteFavouriteBookByUser/{idUser}/{idMovie}")
    public void deleteFavBook(@PathVariable(value ="idUser")Long idUser,
                              @PathVariable(value ="idMovie")Long idMovie){

        this.userService.deleteFavouriteBook(idUser,idMovie);

    }

    //Method for deleting user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.userService.deleteUser(id);
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("It is working...");
    }

}
