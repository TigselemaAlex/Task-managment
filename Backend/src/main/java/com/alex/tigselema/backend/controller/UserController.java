package com.alex.tigselema.backend.controller;

import com.alex.tigselema.backend.common.APIResponse;
import com.alex.tigselema.backend.common.ResponseBuilder;
import com.alex.tigselema.backend.model.entity.User;
import com.alex.tigselema.backend.model.request.UserLoginRequestDTO;
import com.alex.tigselema.backend.security.jwt.JWTProvider;
import com.alex.tigselema.backend.security.jwt.JWTResponse;
import com.alex.tigselema.backend.security.model.UserPrincipal;
import com.alex.tigselema.backend.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping(value = "/users")
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final JWTProvider jwtProvider;

    private final ResponseBuilder responseBuilder;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JWTProvider jwtProvider, ResponseBuilder responseBuilder) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.responseBuilder = responseBuilder;
    }

    @GetMapping
    public ResponseEntity
            <APIResponse<?>> findAll(@RequestParam(value = "page", defaultValue = "0") final int page){
        Pageable pageable = PageRequest.of(page, 10);
        return userService.findAll(pageable);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<APIResponse<?>> findById(@PathVariable final UUID id){
        return userService.findByID(id);
    }

    @PostMapping
    public
    ResponseEntity
            <APIResponse<?>> save(@RequestBody final User user){
        return userService.save(user);
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<APIResponse<?>> signin(@RequestBody final UserLoginRequestDTO requestDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestDTO.getEmail(), requestDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        JWTResponse jwtResponse = new JWTResponse(jwt, userPrincipal.getId(), userPrincipal.getAuthorities());
        return responseBuilder.buildResponse(HttpStatus.OK.value(), "Usuario logeado exitosamente", jwtResponse);
    }
}
