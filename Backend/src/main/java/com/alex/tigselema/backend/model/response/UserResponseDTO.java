package com.alex.tigselema.backend.model.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private String id;
    private String email;
    private String name;
    private String lastName;
    private String phone;
    private Date registeredAt;
    private String image;
    private String status;
}
