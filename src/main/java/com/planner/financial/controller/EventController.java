package com.planner.financial.controller;

import com.planner.financial.model.Event;
import com.planner.financial.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

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
    public void insertEvent(@RequestBody Event event) {
        this.eventService.insertEvent(event);
    }

    @GetMapping(path = "/bydate/{date}")
    public List<Event> getAllEventsByDate(@PathVariable("date") Date date) {
        return this.eventService.getAllEventsByDate(date);
    }

    @GetMapping(path = "{date}")
    public Double getTotalValueOfEventsByMoth(@PathVariable("date") @DateTimeFormat(pattern = "MM.yyyy") Date date) {
        return this.eventService.getTotalValueByDate(date);
    }
}
