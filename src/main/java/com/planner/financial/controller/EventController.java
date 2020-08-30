package com.planner.financial.controller;

import com.planner.financial.model.Event;
import com.planner.financial.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/all")
    public List<Event> getAll() {
        return eventService.getAllEvents();
    }

    @PostMapping
    public Event insertEvent(@RequestBody Event event) {
        return this.eventService.insertEvent(event);
    }

    @GetMapping(path = "/bydate/{date}")
    public List<Event> getAllEventsByMonthAndYear(@PathVariable("date") @DateTimeFormat(pattern = "MM.yyyy") Date date) {
        return this.eventService.getAllEventsByMonthAndYear(date);
    }

    @GetMapping(path = "/balance/{date}")
    public Map<String, Double> getTotalBalanceForTheYear(@PathVariable("date") @DateTimeFormat(pattern = "yyyy") Date date) {
        return this.eventService.getTotalBalanceForTheYear(date);
    }

    @GetMapping(path = "/browse/{query}")
    List<Event> getAllEventsContainingString(@PathVariable("query") String query) {
        return this.eventService.getAllEventsContainingString(query);
    }

    @DeleteMapping(path = "/{id}")
    public Map<String, String> deleteEvent(@PathVariable("id") String id) {
        this.eventService.deleteEvent(id);
        return Collections.singletonMap("id",id);
    }
}
