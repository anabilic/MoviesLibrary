package mk.finki.ukim.mk.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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

    @Lob
    private byte[] imageActor;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Movie> movies;
}
