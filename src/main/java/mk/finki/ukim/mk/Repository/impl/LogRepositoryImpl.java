package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Log;
import mk.finki.ukim.mk.Repository.LogRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Profile("jpa")
@Repository
public class LogRepositoryImpl implements LogRepository {

    private final JpaLogRepository jpaLogRepository;


    public LogRepositoryImpl(JpaLogRepository jpaLogRepository) {
        this.jpaLogRepository = jpaLogRepository;
    }

    @Override
    public List<Log> getAllLogs() {
        return jpaLogRepository.findAll();
    }

    @Override
    public Optional<Log> findById(Long id) {
        return this.jpaLogRepository.findById(id);
    }

    @Override
    public Log save(Log log) {
        return this.jpaLogRepository.save(log);
    }
}
