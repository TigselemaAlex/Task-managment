package com.alex.tigselema.backend.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String email;
    private String password;
    private String name;
    @Column(name = "last_name")
    private String lastName;
    private String phone;
    @Column(name = "registered_at")
    private Date registeredAt;
    private String image;
    private Boolean status;
    @PrePersist
    private void prePersist(){
        registeredAt = new Date();
        status = true;
    }
}
