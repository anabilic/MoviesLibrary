package mk.finki.ukim.mk.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;


    private String name;


    private String director;


    private String plot;


    private String runningTime;

    @Column
    private Integer deletedFlag;

    @Column(nullable = true)
    private LocalDate releaseInformation;

    private String originalLanguage;

    @JsonIgnore
    @ManyToMany(mappedBy = "favouriteMovies",fetch = FetchType.EAGER)
    private List<User> userFavourites;
    //list of all users that have added the movie to favourites


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
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((Id == null) ? 0 : Id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (!(obj instanceof Movie))
            return false;
        Movie other = (Movie) obj;
        if (Id == null) {
            if (other.Id != null)
                return false;
        } else if (!Id.equals(other.Id))
            return false;
        return true;
    }

}

