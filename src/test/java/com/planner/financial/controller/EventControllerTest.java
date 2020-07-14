package com.planner.financial.controller;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Iterables;
import com.planner.financial.model.Event;
import com.planner.financial.model.EventType;
import com.planner.financial.service.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class EventControllerTest {
    private EventService eventService;

    @BeforeEach
    void setUp() {
        eventService = mock(EventService.class);
        List<Event> events = new LinkedList<>();
        Date testDate = new Date(2020, Calendar.SEPTEMBER, 15);

        Event event1 = new Event(testDate, EventType.INCOME, 1.0, "someName1", "");
        events.add(event1);
        Event event2 = new Event(new Date(2020, Calendar.OCTOBER, 12), EventType.EXPENDITURE, 10.0, "someName2", "");
        events.add(event2);
        Event event3 = new Event(new Date(2021, Calendar.MARCH, 1), EventType.EXPENDITURE, 2.0, "someName3", "");
        events.add(event3);
        Event event4 = new Event(new Date(2020, Calendar.OCTOBER, 11), EventType.INCOME, 200.0, "someName4", "");
        events.add(event4);

        when(eventService.getAllEvents()).thenReturn(events);
        when(eventService.getAllEventsByDate(testDate)).thenReturn(Collections.singletonList(event1));
        when(eventService.getTotalValueByDate(testDate)).thenReturn(ImmutableMap.of("OCTOBER", 190.0, "SEPTEMBER", 1.0, "JANUARY", 0.0));
    }

    @Test
    void getAll() {
        EventController eventController = new EventController(eventService);

        List<Event> all = eventController.getAll();
        List<String> eventNames = all.stream()
                .map(Event::getName)
                .collect(Collectors.toList());

        assertEquals(4, all.size());
        assertThat(eventNames).containsOnly("someName1", "someName2", "someName3", "someName4");
    }

    @Test
    void getAllEventsByDate() {
        EventController eventController = new EventController(eventService);
        Date referenceDate = new Date(2020, Calendar.SEPTEMBER, 15);

        List<Event> allEventsByDate = eventController.getAllEventsByDate(referenceDate);

        assertEquals(1, allEventsByDate.size());
        assertEquals(referenceDate, Iterables.getOnlyElement(allEventsByDate).getDate());
    }

    @Test
    void getTotalValueOfEventsByMoth() {
        EventController eventController = new EventController(eventService);
        Date referenceDate = new Date(2020, Calendar.SEPTEMBER, 15);

        Map<String, Double> totalValueByDate = eventController.getTotalValueOfEventsByMoth(referenceDate);

        assertEquals(190.0, totalValueByDate.get("OCTOBER"));
        assertEquals(1.0, totalValueByDate.get("SEPTEMBER"));
        assertEquals(0.0, totalValueByDate.get("JANUARY"));
    }
}