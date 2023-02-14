package com.alex.tigselema.backend.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

@Getter
@JsonPropertyOrder({ "httpStatus", "message", "data" })
public class APIResponse<T> {
    private final Integer httpStatus;
    private final String message;
    private final T data;

    private APIResponse(APIResponseBuilder<T> apiResponseBuilder){
        this.httpStatus = apiResponseBuilder.httpStatus;
        this.message = apiResponseBuilder.message;
        this.data = apiResponseBuilder.data;
    }

    public static class APIResponseBuilder<T>{
        private final Integer httpStatus;
        private final String message;
        private T data;

        public APIResponseBuilder(Integer httpStatus, String message){
            this.httpStatus = httpStatus;
            this.message = message;
        }

        public APIResponseBuilder<T> data (T data){
            this.data = data;
            return this;
        }

        public ResponseEntity<APIResponse<?>> build(){
            APIResponse<T> apiResponse = new APIResponse<>(this);
            return new ResponseEntity<>(apiResponse, HttpStatusCode.valueOf(apiResponse.getHttpStatus()));
        }
    }

}
