package mk.finki.ukim.mk.Service.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Repository.ActorRepository;
import mk.finki.ukim.mk.Service.ActorService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ActorServiceImpl implements ActorService {

    private final ActorRepository actorRepository;

    public ActorServiceImpl(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    @Override
    public List<Actor> listAllActors() {
        return actorRepository.getAllActors();
    }

    @Override
    public Actor findActorByName(String name) {
        return this.actorRepository.findByName(name);
    }

    @Override
    public Actor createActor(String name, String castName, List<String> movies) {

        List<Movie> actorMovies = this.actorRepository.checkMovies(movies);

        Actor actor = new Actor();
        actor.setName(name);
        actor.setCastName(castName);
        actor.setMovies(actorMovies);
        return actorRepository.save(actor);
    }

    @Override
    public Actor createActorWithImage(String name, String castName, List<String> movies, String biography, String placeOfBirth, LocalDate birthDate, byte[] imageActor) {

        List<Movie> actorMovies = this.actorRepository.checkMovies(movies);

        Actor actor = new Actor();
        actor.setName(name);
        actor.setCastName(castName);
        actor.setMovies(actorMovies);
        actor.setImageActor(imageActor);
        actor.setBiography(biography);
        actor.setDateOfBirth(birthDate);
        actor.setPlaceOfBirth(placeOfBirth);

        return actorRepository.save(actor);
    }

    @Override
    public Actor editActor(String name, String castName, List<String> movies, String biography, String placeOfBirth, LocalDate birthDate) {

        Actor actor = this.actorRepository.findByName(name);

        actor.setName(name);
        actor.setCastName(castName);
        actor.setMovies(actor.getMovies());
        actor.setImageActor(actor.getImageActor());
        actor.setBiography(biography);
        actor.setDateOfBirth(birthDate);
        actor.setPlaceOfBirth(placeOfBirth);

        return actorRepository.save(actor);
    }

    @Override
    public Optional<Actor> findById(Long id) {
        return this.actorRepository.findById(id);
    }

    @Override
    public void deleteActor(Long id) {
        this.actorRepository.delete(id);
    }

}
