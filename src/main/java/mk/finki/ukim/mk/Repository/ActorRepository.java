package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;

import java.util.List;
import java.util.Optional;

public interface ActorRepository {

    List<Actor> getAllActors();

    Actor save(Actor actor);

    List<Movie> checkMovies(List<String> movies);

    void delete(Long id);

    Optional<Actor> findById(Long id);

    Actor findByName(String name);

    String findBySameName(String name);

}
