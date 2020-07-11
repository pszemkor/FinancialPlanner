package com.planner.financial.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Event {
    @Id
    private String id;
    private Date date;
    private EventType type;
    private Integer value;

    public Event(Date date, EventType type, Integer value) {
        this.date = date;
        this.type = type;
        this.value = value;
    }

    public Event() {
    }

    public String getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public EventType getType() {
        return type;
    }

    public Integer getValue() {
        return value;
    }
}
