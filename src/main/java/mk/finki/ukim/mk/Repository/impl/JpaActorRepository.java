package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaActorRepository extends JpaRepository<Actor,Long> {

    @Query("select m from Movie m where m.name in :movies")
    List<Movie> checkMovies(List<String> movies);

}
