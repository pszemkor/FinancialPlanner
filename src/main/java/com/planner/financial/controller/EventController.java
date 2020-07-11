package com.planner.financial.controller;

import com.planner.financial.model.Event;
import com.planner.financial.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAll() {
        return eventService.getAllEvents();
    }

    @PostMapping
    public void insertEvent(@RequestBody Event event) {
        this.eventService.insertEvent(event);
    }
}
