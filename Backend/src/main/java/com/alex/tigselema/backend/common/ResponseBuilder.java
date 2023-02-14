package com.alex.tigselema.backend.common;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ResponseBuilder {

    public ResponseEntity<APIResponse<?>> buildResponse(Integer httpStatusCode, String message){
        return new APIResponse.APIResponseBuilder<>(httpStatusCode, message).build();
    }

    public ResponseEntity<APIResponse<?>> buildResponse(Integer httpStatusCode, String message, Object data){
        return new APIResponse.APIResponseBuilder<>(httpStatusCode, message).data(data).build();
    }
}
