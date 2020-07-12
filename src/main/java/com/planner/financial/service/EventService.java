package com.planner.financial.service;

import com.planner.financial.model.Event;
import com.planner.financial.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public void insertEvent(Event event) {
        this.eventRepository.save(event);
    }

    public Map<String, Double> getTotalValueByDate(Date date) {
        return this.eventRepository.getTotalValueByDate(date);
    }

    public List<Event> getAllEventsByDate(Date date) {
        return this.eventRepository.getEventsByMonthAndYear(date);
    }
}
