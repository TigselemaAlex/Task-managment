package com.alex.tigselema.backend.model.mapper;

import com.alex.tigselema.backend.model.entity.User;
import com.alex.tigselema.backend.security.model.UserPrincipal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    @Mapping(source="email", target = "email")
    @Mapping(source = "id", target = "id")
    @Mapping(source = "password", target = "password")
    @Mapping(source = "status", target = "status")
    UserPrincipal userPrincipalFromUser(User user);
}
