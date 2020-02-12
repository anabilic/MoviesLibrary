package mk.finki.ukim.mk.Service.impl;

import mk.finki.ukim.mk.Model.User;
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
        return null;
    }

    @Override
    public void deleteUser(Long id) {

    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.empty();
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
    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Override
    public List<String> findUsers(List<Long> idList){
        return userRepository.findByIdList(idList);
    }

}
