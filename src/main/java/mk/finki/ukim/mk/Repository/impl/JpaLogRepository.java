package mk.finki.ukim.mk.Repository.impl;

import mk.finki.ukim.mk.Model.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaLogRepository extends JpaRepository<Log,Long> {
}
