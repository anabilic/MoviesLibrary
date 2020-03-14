package mk.finki.ukim.mk.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column
    private String name;


    @Column(unique = true)
    private String username;


    private String password;


    private String email;


    @Lob
    @Column(nullable = true)
    private byte[] file;


    private String gender;


    @Enumerated(value = EnumType.STRING)
    private Role role;


    @JsonIgnore
    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
    private List<Movie> movies;


    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Movie> favouriteMovies;
    //List of all movies that user have added to favourites
    //cascade = {CascadeType.REMOVE,CascadeType.PERSIST,CascadeType.MERGE}

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (!(obj instanceof User))
            return false;
        User other = (User) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }


}
