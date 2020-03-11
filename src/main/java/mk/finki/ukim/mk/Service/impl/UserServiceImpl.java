package mk.finki.ukim.mk.Service.impl;

import mk.finki.ukim.mk.Model.Movie;
import mk.finki.ukim.mk.Model.User;
import mk.finki.ukim.mk.Model.exceptions.UserAlreadyExists;
import mk.finki.ukim.mk.Model.exceptions.UserIdInvalid;
import mk.finki.ukim.mk.Model.pagination.Page;
import mk.finki.ukim.mk.Repository.UserRepository;
import mk.finki.ukim.mk.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> listAllUsers() {
        return this.userRepository.getAllUsers();
    }

    @Override
    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

    @Override
    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Override
    public List<String> findUsers(List<Long> idList){
        return userRepository.findByIdList(idList);
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }

    @Override
    public User save(User user){
         user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
         return userRepository.save(user);

    }

    @Override
    public User editUser(Long id, String username, String name, String email, String gender, byte[] file) {

        User user=this.userRepository.findById(id).orElseThrow(UserIdInvalid::new);

        if((this.userRepository.findUserWithSameUsername(id,username))==null) {
            user.setUsername(username);
            user.setName(name);
            user.setRole(user.getRole());
            user.setPassword(user.getPassword());
            user.setEmail(email);
            user.setId(id);
            user.setGender(gender);
            if (file != null) {
                user.setFile(file);
            } else {
                user.setFile(user.getFile());
            }
            return this.userRepository.save(user);
        }else{
            throw new UserAlreadyExists();
        }

    }

    @Override
    public User editUserWithoutImg(Long id, String username, String name, String email, String gender) {

        User user=this.userRepository.findById(id).orElseThrow(UserIdInvalid::new);

        if((this.userRepository.findUserWithSameUsername(id,username))==null) {
            user.setUsername(username);
            user.setName(name);
            user.setRole(user.getRole());
            user.setPassword(user.getPassword());
            user.setEmail(email);
            user.setId(id);
            user.setGender(gender);
            user.setFile(user.getFile());

            return this.userRepository.save(user);
        }else{
            throw new UserAlreadyExists();
        }
    }

    @Override
    public void deleteUser(Long id) {
        this.userRepository.delete(id);
    }

    @Override
    public User addFavouriteMovie(User user) {



        return this.userRepository.save(user);
    }

    @Override
    public List<Movie> getFavouriteMoviesPerUser(Long id) {
        return this.userRepository.getFavouriteMoviesPerUser(id);
    }


}
