package com.planner.financial.repository;


import com.planner.financial.model.Event;
import com.planner.financial.model.EventType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    default Double getTotalValueByDate(Date date) {
        double total = 0;
        for (Event event : this.getEventsByDate(date)) {
            if (event.getType().equals(EventType.INCOME)) {
                total += event.getValue();
            } else {
                total -= event.getValue();
            }
        }
        return total;
    }

    default List<Event> getEventsByDate(Date date) {
        return this.findAll()
                .stream()
                .filter(event -> {
                    LocalDate referenceDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    LocalDate eventDate = event.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    return sameMonthAndYear(referenceDate, eventDate);
                })
                .collect(Collectors.toList());
    }

    private boolean sameMonthAndYear(LocalDate referenceDate, LocalDate eventDate) {
        return referenceDate.getMonthValue() == eventDate.getMonthValue() && referenceDate.getYear() == eventDate.getYear();
    }
}
