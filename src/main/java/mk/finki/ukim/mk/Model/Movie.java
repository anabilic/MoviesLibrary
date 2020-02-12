package mk.finki.ukim.mk.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    private LocalDateTime releaseInformation;

    private String originalLanguage;

    private Integer Likes;

    private Boolean deleted = false;

    @Lob
    @JsonIgnore
    private byte[] file;

    @JsonIgnore
    @ManyToMany(mappedBy = "movies")
    private List<Actor> actors;

    @JsonIgnore
    @ManyToMany(mappedBy = "movies")
    private List<Genre>  genres;

    @JsonIgnore
    @ManyToOne()
    private User user;

}

