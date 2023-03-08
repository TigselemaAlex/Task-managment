package com.alex.tigselema.backend.model.request;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequestDTO {
    private String email;
    private String password;
}
