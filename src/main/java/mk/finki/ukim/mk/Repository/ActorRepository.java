package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.pagination.Page;

import java.util.List;
import java.util.Optional;

public interface ActorRepository {

    List<Actor> getAllActors();

    Page<Actor> getAllActors(int page, int size);

    Optional<Actor> findById(Long id);

    Actor findByName(String name);

    String findBySameName(String name);

    List<Movie> checkMovies(List<String> movies);

    Actor save(Actor actor);

    void delete(Long id);


}
