package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Actor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ActorService {

    List<Actor> listAllActors();

    Actor findActorByName(String name);

    Actor createActor(String name, String castName, List<String> movies);

    Actor createActorWithImage(String name, String castName, List<String> movies, String biography, String placeOfBirth, LocalDate birthDate, byte[] file);

    Actor editActor(String name, String castName, List<String> movies, String biography, String placeOfBirth, LocalDate birthDate);

    Optional<Actor> findById(Long id);

    void deleteActor(Long id);


}
