package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Repository.ActorRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Profile("jpa")
@Repository
public class ActorRepositoryImpl implements ActorRepository {

    private final JpaActorRepository jpaActorRepository;

    public ActorRepositoryImpl(JpaActorRepository jpaActorRepository) {
        this.jpaActorRepository = jpaActorRepository;
    }

    @Override
    public List<Actor> getAllActors() {
        return jpaActorRepository.findAll();
    }

    @Override
    public Optional<Actor> findById(Long id) {
        return this.jpaActorRepository.findById(id);
    }

    @Override
    public Actor save(Actor actor) {
        return jpaActorRepository.save(actor);
    }

    @Override
    public List<Movie> checkMovies(List<String> movies) {
        return this.jpaActorRepository.checkMovies(movies);
    }

    @Override
    public void delete(Long id) {
        this.jpaActorRepository.deleteById(id);
    }

}
