package mk.finki.ukim.mk.Service;

import mk.finki.ukim.mk.Model.Log;

import java.util.List;
import java.util.Optional;

public interface LogService {

    List<Log> listAllLogs();

    Log createLog(String description);

    Optional<Log> findLogById(Long id);

}
