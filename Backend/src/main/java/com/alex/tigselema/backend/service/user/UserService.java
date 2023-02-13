package com.alex.tigselema.backend.service.user;

import com.alex.tigselema.backend.model.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User findByEmail(String email);
}
