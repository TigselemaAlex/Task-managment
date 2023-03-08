package com.alex.tigselema.backend.service.user;

import com.alex.tigselema.backend.common.APIResponse;
import com.alex.tigselema.backend.model.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.UUID;

public interface UserService extends UserDetailsService {
    ResponseEntity<APIResponse<?>> findAll(Pageable pageable);
    ResponseEntity<APIResponse<?>> save(User user);
    ResponseEntity<APIResponse<?>> findByID(UUID id);
}
