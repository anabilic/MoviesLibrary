package mk.finki.ukim.mk.Service.impl;


import mk.finki.ukim.mk.Model.Log;
import mk.finki.ukim.mk.Repository.LogRepository;
import mk.finki.ukim.mk.Service.LogService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogServiceImpl implements LogService {

    private final LogRepository logRepository;


    public LogServiceImpl(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Override
    public List<Log> listAllLogs() {
        return logRepository.getAllLogs();
    }

    @Override
    public Log createLog(String description) {

        Log log = new Log();
        log.setLogDescription(description);

        return logRepository.save(log);
    }


    @Override
    public Optional<Log> findLogById(Long id) {
        return logRepository.findById(id);
    }
}
