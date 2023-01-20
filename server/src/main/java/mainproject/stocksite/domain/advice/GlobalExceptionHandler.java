package mainproject.stocksite.domain.advice;

import mainproject.stocksite.domain.exception.BusinessLogicException;
import mainproject.stocksite.domain.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ BusinessLogicException.class })
    protected ResponseEntity handleCustomException(BusinessLogicException exception) {
        return new ResponseEntity<>(new ErrorResponse(
                exception.getExceptionCode().getStatus(),
                exception.getExceptionCode().getMessage()),
                HttpStatus.valueOf(exception.getExceptionCode().getStatus()));
    }
}
