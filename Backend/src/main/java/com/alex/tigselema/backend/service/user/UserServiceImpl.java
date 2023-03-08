package com.alex.tigselema.backend.service.user;

import com.alex.tigselema.backend.common.APIResponse;
import com.alex.tigselema.backend.common.ResponseBuilder;
import com.alex.tigselema.backend.exception.UserNotFoundException;
import com.alex.tigselema.backend.model.entity.User;
import com.alex.tigselema.backend.model.mapper.UserMapper;
import com.alex.tigselema.backend.model.response.UserResponseDTO;
import com.alex.tigselema.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ResponseBuilder responseBuilder;
    private final UserMapper userMapper;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ResponseBuilder responseBuilder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.responseBuilder = responseBuilder;
        this.userMapper = userMapper;
    }


    @Override
    public ResponseEntity<APIResponse<?>> findAll(Pageable pageable) {
        Page<UserResponseDTO> responseDTOPage = userRepository.findAll(pageable).map(userMapper.INSTANCE::userResponseDtoFromUser);
        return responseBuilder.buildResponse(HttpStatus.OK.value(), "Listado paginado", responseDTOPage);
    }

    @Override
    public ResponseEntity<APIResponse<?>> save(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
            return responseBuilder.buildResponse(HttpStatus.BAD_REQUEST.value(), "Ya existe un usuario con ese email");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return responseBuilder.buildResponse(HttpStatus.CREATED.value(), "Usuario registrado exitosamente", userRepository.save(user));
    }

    @Override
    public ResponseEntity<APIResponse<?>> findByID(UUID id) {
        User user = userRepository.findById(id).orElseThrow(()-> new UserNotFoundException(id.toString()));
        return responseBuilder.buildResponse(HttpStatus.OK.value(), "Usuario encontrado", userMapper.userResponseDtoFromUser(user));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow( ()-> new UserNotFoundException(username));
        return userMapper.userPrincipalFromUser(user);
    }
}
