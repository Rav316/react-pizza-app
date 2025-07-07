package ru.alex.http.handler;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.alex.dto.error.ErrorResponse;

import java.time.Instant;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundExceptions(EntityNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, NOT_FOUND);
    }
}
