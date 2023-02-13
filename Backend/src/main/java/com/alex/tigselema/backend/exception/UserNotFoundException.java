package com.alex.tigselema.backend.exception;

import java.text.MessageFormat;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message){
        super(MessageFormat.format("User not found {0}", message));
    }
}
