package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.pagination.Page;
import mk.finki.ukim.mk.Repository.ActorRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.PageRequest;
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
    public Page<Actor> getAllActors(int page, int size) {
        org.springframework.data.domain.Page<Actor> actorResult =  this.jpaActorRepository.findAll(PageRequest.of(page, size));
        return new Page<>(page,actorResult.getTotalPages(),size,actorResult.getContent());
    }

    @Override
    public List<Actor> getAllActorsPaged() {
        return this.jpaActorRepository.getAllActors();
    }


    @Override
    public Optional<Actor> findById(Long id) {
        return this.jpaActorRepository.findById(id);
    }


    @Override
    public Actor findByName(String name) {
        return this.jpaActorRepository.findByName(name);
    }


    @Override
    public String findBySameName(String name) {
        return this.jpaActorRepository.findBySameName(name);
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
