package com.planner.financial.service;

import com.google.common.collect.Iterables;
import com.planner.financial.model.Event;
import com.planner.financial.model.EventType;
import com.planner.financial.repository.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import java.util.*;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
class EventServiceTest {
    EventRepository eventRepository;

    @BeforeEach
    void setUp() {
        eventRepository = mock(EventRepository.class);
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

        when(eventRepository.findAll()).thenReturn(events);
        when(eventRepository.getEventsByMonthAndYear(testDate)).thenReturn(Collections.singletonList(event1));
        when(eventRepository.getEventsByYear(testDate)).thenReturn(Arrays.asList(event1, event2, event4));
        when(eventRepository.getTotalValueByDate(testDate)).thenCallRealMethod();
    }

    @Test
    void shouldReturnAllEventsWhenRequested() {
        EventService eventService = new EventService(eventRepository);

        List<Event> allEvents = eventService.getAllEvents();
        Set<String> eventNames = allEvents.stream()
                .map(Event::getName)
                .collect(Collectors.toSet());

        assertEquals(4, allEvents.size());
        assertThat(eventNames).containsOnly("someName1", "someName2", "someName3", "someName4");
    }

    @Test
    void shouldCallSaveMethod() {
        EventService eventService = new EventService(eventRepository);
        Event newEvent = new Event(new Date(0), EventType.INCOME, 100.0, "new", "new one!");

        eventService.insertEvent(newEvent);

        verify(eventRepository, times(1)).save(newEvent);
    }

    @Test
    void getTotalValueByDate() {
        EventService eventService = new EventService(eventRepository);
        Date referenceDate = new Date(2020, Calendar.SEPTEMBER, 15);

        Map<String, Double> totalValueByDate = eventService.getTotalValueByDate(referenceDate);

        assertEquals(190.0, totalValueByDate.get("OCTOBER"));
        assertEquals(1.0, totalValueByDate.get("SEPTEMBER"));
        assertEquals(0.0, totalValueByDate.get("JANUARY"));
    }

    @Test
    void shouldGetAllEventsByDate() {
        EventService eventService = new EventService(eventRepository);
        Date referenceDate = new Date(2020, Calendar.SEPTEMBER, 15);

        List<Event> allEventsByDate = eventService.getAllEventsByDate(referenceDate);

        assertEquals(1, allEventsByDate.size());
        assertEquals(referenceDate, Iterables.getOnlyElement(allEventsByDate).getDate());
    }

}