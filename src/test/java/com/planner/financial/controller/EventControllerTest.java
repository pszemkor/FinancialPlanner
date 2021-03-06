package com.planner.financial.controller;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Iterables;
import com.planner.financial.model.Event;
import com.planner.financial.model.EventType;
import com.planner.financial.service.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = EventController.class)
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
class EventControllerTest {
    @MockBean
    private EventService eventService;
    @Autowired
    protected MockMvc mvc;

    @BeforeEach
    void setUp() {
        List<Event> events = new LinkedList<>();
        Date testDate = new Date(2020, Calendar.SEPTEMBER, 15);

        Event event1 = new Event(testDate, EventType.INCOME, 1.0, "someName1", "");
        events.add(event1);
        Event event2 = new Event(new Date(2020, Calendar.OCTOBER, 12), EventType.EXPENDITURE, 10.0, "someName2", "description");
        events.add(event2);
        Event event3 = new Event(new Date(2021, Calendar.MARCH, 1), EventType.EXPENDITURE, 2.0, "someName3", "Some Description");
        events.add(event3);
        Event event4 = new Event(new Date(2020, Calendar.OCTOBER, 11), EventType.INCOME, 200.0, "someName4", "");
        events.add(event4);
        given(eventService.getAllEvents()).willReturn(events);
        given(eventService.getAllEventsContainingString("description")).willReturn(List.of(event2, event3));
        given(eventService.getAllEventsByMonthAndYear(any(Date.class))).willReturn(Collections.singletonList(event1));
        given(eventService.getTotalBalanceForTheYear(any(Date.class))).willReturn(ImmutableMap.of("OCTOBER", 190.0, "SEPTEMBER", 1.0, "JANUARY", 0.0));
        Event testEvent = new Event(new Date(0), EventType.INCOME, 100.0, "Test", "some additional data");
        given(eventService.insertEvent(testEvent)).willReturn(testEvent);

    }

    @Test
    void getAll() throws Exception {
        String uri = "/api/v1/events/all";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        Event[] events = mapFromJson(content, Event[].class);
        List<String> eventNames = Stream.of(events)
                .map(Event::getName)
                .collect(Collectors.toList());
        assertThat(eventNames).containsOnly("someName1", "someName2", "someName3", "someName4");
        assertThat(events).hasSize(4);
    }

    @Test
    void getAllEventsContainingString() throws Exception {
        String uri = "/api/v1/events/browse/{query}";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri, "description")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        Event[] events = mapFromJson(content, Event[].class);

        assertThat(events).extracting("name").containsExactly("someName2", "someName3");
    }

    @Test
    void getAllEventsByDate() throws Exception {
        Date referenceDate = new Date(2020, Calendar.SEPTEMBER, 15);
        String uri = "/api/v1/events/bydate/{date}";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri, "09.2020")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        List<Event> eventsByDate = Arrays.asList(mapFromJson(content, Event[].class));

        assertEquals(1, eventsByDate.size());
        assertEquals(referenceDate, Iterables.getOnlyElement(eventsByDate).getDate());
    }

    @Test
    void getTotalValueOfEventsByMoth() throws Exception {
        Date referenceDate = new Date(2020, Calendar.SEPTEMBER, 15);
        String uri = "/api/v1/events/balance/{date}";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri, "2020")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        Map<String, Double> totalValueByDate = mapFromJson(content, Map.class);


        assertEquals(190.0, totalValueByDate.get("OCTOBER"));
        assertEquals(1.0, totalValueByDate.get("SEPTEMBER"));
        assertEquals(0.0, totalValueByDate.get("JANUARY"));
    }

    @Test
    void shouldAddNewEvent() throws Exception {
        String uri = "/api/v1/events";
        Event testEvent = new Event(new Date(0), EventType.INCOME, 100.0, "Test", "some additional data");

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE).content(mapToJson(testEvent)))
                .andExpect(status().isOk())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        Event returnedEvent = mapFromJson(content, Event.class);
        assertEquals(returnedEvent, testEvent);
    }

    @Test
    void shouldDeleteEvent() throws Exception {
        String id = "test-id";
        String uri = "/api/v1/events/{id}";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri, id)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        Map map = mapFromJson(content, Map.class);
        assertEquals(Collections.singletonMap("id", id), map);
    }


    <T> T mapFromJson(String json, Class<T> clazz) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, clazz);
    }

    String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }
}