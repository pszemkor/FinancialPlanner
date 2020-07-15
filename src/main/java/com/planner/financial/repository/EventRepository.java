package com.planner.financial.repository;


import com.planner.financial.model.Event;
import com.planner.financial.model.EventType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    default Map<String, Double> getTotalValueByDate(Date date) {
        Map<String, Double> monthBalance = new HashMap<>();
        for (Event event : this.getEventsByYear(date)) {
            double total = 0;
            if (event.getType().equals(EventType.INCOME)) {
                total += event.getValue();
            } else {
                total -= event.getValue();
            }
            LocalDate eventDate = getLocalDate(event.getDate());
            double lastResult = monthBalance.getOrDefault(eventDate.getMonth().name(), 0.0);
            monthBalance.put(eventDate.getMonth().name(), Math.round((total + lastResult) * 100.0) / 100.0);
        }
        for (Month month : Month.values()) {
            if (!monthBalance.containsKey(month.name())) {
                monthBalance.put(month.name(), 0.0);
            }
        }
        return monthBalance;
    }

    default List<Event> getEventsByYear(Date date) {
        return this.findAll()
                .stream()
                .filter(event -> {
                    LocalDate referenceDate = getLocalDate(date);
                    LocalDate eventDate = getLocalDate(event.getDate());
                    return referenceDate.getYear() == eventDate.getYear();
                })
                .collect(Collectors.toList());
    }

    default List<Event> getEventsByMonthAndYear(Date date) {
        return this.getEventsByYear(date).stream()
                .filter(event -> {
                    LocalDate referenceDate = getLocalDate(date);
                    LocalDate eventDate = getLocalDate(event.getDate());
                    return sameMonthAndYear(referenceDate, eventDate);
                })
                .collect(Collectors.toList());
    }

    private LocalDate getLocalDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private boolean sameMonthAndYear(LocalDate referenceDate, LocalDate eventDate) {
        return referenceDate.getMonthValue() == eventDate.getMonthValue() && referenceDate.getYear() == eventDate.getYear();
    }
}
