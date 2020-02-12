package mk.finki.ukim.mk.Repository;

import mk.finki.ukim.mk.Model.Log;

import java.util.List;
import java.util.Optional;

public interface LogRepository {

    List<Log> getAllLogs();

    Optional<Log> findById(Long id);

    Log save(Log log);

}
