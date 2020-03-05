package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Actor;
import mk.finki.ukim.mk.Model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaActorRepository extends JpaRepository<Actor,Long> {

    @Query("select m from Movie m where m.name in :movies")
    List<Movie> checkMovies(List<String> movies);

    @Query(value = "select a from Actor a where a.name=:name")
    Actor findByName(@Param("name") String name);

    @Query(value = "select a.name from Actor a where a.name like :name")
    String findBySameName(String name);


}
