package com.planner.financial.model;

import com.google.common.base.Objects;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Event {
    @Id
    private String id;
    private Date date;
    private EventType type;
    private Double value;
    private String name;
    private String description;

    public Event(Date date, EventType type, Double value, String name, String description) {
        this.date = date;
        this.type = type;
        this.value = value;
        this.name = name;
        this.description = description;
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

    public Double getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equal(id, event.id) &&
                Objects.equal(date, event.date) &&
                type == event.type &&
                Objects.equal(value, event.value) &&
                Objects.equal(name, event.name) &&
                Objects.equal(description, event.description);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id, date, type, value, name, description);
    }
}
