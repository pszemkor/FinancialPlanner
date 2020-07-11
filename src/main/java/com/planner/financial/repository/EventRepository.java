package com.planner.financial.repository;


import com.planner.financial.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    Event getEventById(String id);

    List<Event> getAll();

    List<Event> getMostRecentEvents(int amount);

    List<Event> getEventsByDate(Date date);

    List<Event> getEventsByYear(int year);

}
