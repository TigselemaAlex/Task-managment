package com.alex.tigselema.backend.controller;

import com.alex.tigselema.backend.common.APIResponse;
import com.alex.tigselema.backend.model.entity.User;
import com.alex.tigselema.backend.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity
            <APIResponse<?>> findAll(@RequestParam(value = "page", defaultValue = "0") final int page){
        Pageable pageable = PageRequest.of(page, 10);
        return userService.findAll(pageable);
    }

    @PostMapping
    public
    ResponseEntity
            <APIResponse<?>> save(@RequestBody final User user){
        return userService.save(user);
    }
}
