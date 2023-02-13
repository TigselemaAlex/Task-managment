package com.alex.tigselema.backend.service.user;

import com.alex.tigselema.backend.exception.UserNotFoundException;
import com.alex.tigselema.backend.model.entity.User;
import com.alex.tigselema.backend.model.mapper.UserMapper;
import com.alex.tigselema.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow( ()-> new UserNotFoundException(email));
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow( ()-> new UserNotFoundException(username));
        return UserMapper.INSTANCE.userPrincipalFromUser(user);
    }
}
