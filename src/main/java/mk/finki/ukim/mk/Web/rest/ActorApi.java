package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.exceptions.ActorAlreadyExists;
import mk.finki.ukim.mk.Model.exceptions.ActorIdInvalid;
import mk.finki.ukim.mk.Model.pagination.Page;
import mk.finki.ukim.mk.Service.ActorService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/actor",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ActorApi {

    private final ActorService actorService;

    public ActorApi(ActorService actorService) {
        this.actorService = actorService;
    }


    @GetMapping
    public List<Actor> getAllActors() {
        return this.actorService.listAllActors();
    }

    @GetMapping("/paginate")
    public Page<Actor> getAllActors(@RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                    @RequestHeader(name = "page-size", defaultValue = "10", required = false) int size){
        return  this.actorService.listAllActors(page,size);
    }

    @GetMapping("/id/{id}")
    public Optional<Actor> getActorById(@PathVariable Long id){
        return this.actorService.findById(id);
    }


    @GetMapping("/name/{name}")
    public Actor getActorByName(@PathVariable String name){
        return this.actorService.findActorByName(name);
    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Actor createActor(@RequestParam(value = "name") String name,
                                      @RequestParam(value = "castName", required = false) String castName,
                                      @RequestParam(value = "movies", required = false) List<String> movies,
                                      @RequestParam(value = "dateOfBirth",required = false) String dateOfBirth,
                                      @RequestParam(value = "placeOfBirth",required = false) String placeOfBirth,
                                      @RequestParam(value = "biography",required = false) String biography,
                                      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException, ActorAlreadyExists {

        LocalDate birthDate = LocalDate.parse(dateOfBirth);

        Actor newActor = this.actorService.createActor(name,castName,movies,biography,placeOfBirth,birthDate,file.getBytes());
        return newActor;
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Actor editActor(@PathVariable Long id,
                           @RequestParam(value = "name", required = false) String name,
                           @RequestParam(value = "castName", required = false) String castName,
                           @RequestParam(value = "movies", required = false) List<String> movies,
                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String dateOfBirth,
                           @RequestParam(value = "placeOfBirth",required = false) String placeOfBirth,
                           @RequestParam(value = "biography",required = false) String biography) throws ActorIdInvalid {

        LocalDate birthDate = LocalDate.parse(dateOfBirth);

        Actor editedActor = this.actorService.editActor(id,name,castName,movies,biography,placeOfBirth,birthDate);
        return editedActor;
    }


    @DeleteMapping("/{id}")
    public void deleteActor(@PathVariable Long id) {
        this.actorService.deleteActor(id);
    }

}