package mk.finki.ukim.mk.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Where(clause = "deleted=false")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String name;

    private String director;

    private String plot;

    private String runningTime;

    private Boolean favourite;

    @Column(nullable = true)
    private LocalDate releaseInformation;

    private String originalLanguage;

    @JsonIgnore
    @ManyToMany(mappedBy = "favouriteMovies")
    private List<User> userFavourites;
    //list of all users that have added the movie to favourites

    private Boolean deleted = false;


    @Lob
    @Column(nullable=true)
    private byte[] file;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "actors_movies",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id"))
    private List<Actor> actors;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "genres_movies",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre>  genres;

    @JsonIgnore
    @ManyToOne()
    private User user;

}

