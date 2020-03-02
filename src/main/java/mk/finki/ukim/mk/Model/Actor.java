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
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String castName;

    private String biography;

    private String placeOfBirth;

    @Column(nullable = true)
    private LocalDate dateOfBirth;

    @Lob
    @Column(nullable = true)
    private byte[] imageActor;

    @JsonIgnore
    @ManyToMany(mappedBy = "actors")
    private List<Movie> movies;
}
