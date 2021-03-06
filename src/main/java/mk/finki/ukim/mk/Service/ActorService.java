package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.pagination.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ActorService {

    List<Actor> listAllActors();

    Page<Actor> listAllActors(int page, int size);

    Optional<Actor> findById(Long id);

    Actor findActorByName(String name);

    Page<Actor> searchActor(String term,int page,int size);

    Actor createActor(String name, String castName, List<String> movies, String biography, String placeOfBirth, LocalDate birthDate, byte[] file);

    Actor editActor(Long id,String name, String castName, List<String> movies, String biography, String placeOfBirth, LocalDate birthDate);

    void deleteActorById(Long id);

    void deleteActor(Long id);
}
