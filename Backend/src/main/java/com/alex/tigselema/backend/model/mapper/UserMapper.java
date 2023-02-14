package com.alex.tigselema.backend.model.mapper;

import com.alex.tigselema.backend.model.entity.User;
import com.alex.tigselema.backend.model.response.UserResponseDTO;
import com.alex.tigselema.backend.security.model.UserPrincipal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserPrincipal userPrincipalFromUser(User user);

    @Mapping(target = "status", expression = "java(user.getStatus() ? \"ACTIVE\" : \"NOT ACTIVE\")")
    UserResponseDTO userResponseDtoFromUser(User user);
}
