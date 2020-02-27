package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Service.ActorService;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Actor createActor(@RequestParam(value = "name") String name,
                             @RequestParam(value = "castName", required = false) String castName,
                             @RequestParam(value = "movies", required = false) List<String> movies) {

        Actor newActor = this.actorService.createActor(name, castName, movies);
        return newActor;
    }

    @PostMapping("/image")
    @ResponseStatus(HttpStatus.CREATED)
    public Actor createActorWithImage(@RequestParam(value = "name") String name,
                                      @RequestParam(value = "castName", required = false) String castName,
                                      @RequestParam(value = "movies", required = false) List<String> movies,
                                      @RequestParam(value = "dateOfBirth",required = false) String dateOfBirth,
                                      @RequestParam(value = "placeOfBirth",required = false) String placeOfBirth,
                                      @RequestParam(value = "biography",required = false) String biography,
                                      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        LocalDate birthDate = LocalDate.parse(dateOfBirth);

        Actor newActor = this.actorService.createActorWithImage(name,castName,movies,biography,placeOfBirth,birthDate,file.getBytes());
        return newActor;
    }

    @DeleteMapping("/{id}")
    public void deleteActor(@PathVariable Long id) {
        this.actorService.deleteActor(id);
    }

}