package mk.finki.ukim.mk.Web.rest;

import mk.finki.ukim.mk.Model.Log;
import mk.finki.ukim.mk.Service.LogService;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/log",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class LogApi {

    private final LogService logService;

    public LogApi(LogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public List<Log> getAllLogs(){
        return  this.logService.listAllLogs();
    }

    @GetMapping("/{id}")
    public Optional<Log> getLog(@PathVariable Long id){
        return this.logService.findLogById(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Log createLog(@RequestParam(value = "description") String description){

        Log newLog = this.logService.createLog(description);
        return newLog;
    }
}
