package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.User;
import mk.finki.ukim.mk.Repository.UserRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Profile("jpa")
@Repository
public class UserRepositoryImpl implements UserRepository {

    private final JpaUserRepository jpaUserRepository;

    public UserRepositoryImpl(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }


    @Override
    public List<User> getAllUsers() {
        return this.jpaUserRepository.findAll();
    }


    @Override
    public User save(User user) {
        return this.jpaUserRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        this.jpaUserRepository.deleteById(id);
    }

    @Override
    public List<Movie> getFavouriteMoviesPerUser(Long id) {
        return this.jpaUserRepository.getFavouriteMoviesPerUser(id);
    }

    @Override
    public Optional<User> findById(Long id) {
        return this.jpaUserRepository.findById(id);
    }

    @Override
    public List<String> findByIdList(List<Long> idList) {
        return this.jpaUserRepository.findByIdList(idList);
    }

    @Override
    public String findUserWithSameUsername(Long id, String username) {
        return this.jpaUserRepository.findUserWithSameUsername(id,username);
    }

    @Override
    public User findByUsername(String username) {
        return this.jpaUserRepository.findByUsername(username);
    }
}
