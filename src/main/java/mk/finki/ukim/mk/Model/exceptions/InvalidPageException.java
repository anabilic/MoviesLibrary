package mk.finki.ukim.mk.Model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public
class InvalidPageException extends RuntimeException{
}