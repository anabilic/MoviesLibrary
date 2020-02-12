package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Actor;

import java.util.List;
import java.util.Optional;

public interface ActorService {

    List<Actor> listAllActors();

    Actor createActor(String name, String castName, List<String> movies);

    Actor createActorWithImage(String name,String castName,List<String> movies,byte[] imageActor);

    Optional<Actor> findById(Long id);

    void deleteActor(Long id);

}
