package com.planner.financial.repository;

import com.google.common.collect.ImmutableList;
import com.planner.financial.model.Event;

class QueryMatcher {
    private final String query;

    QueryMatcher(String query) {
        this.query = query.toLowerCase();
    }


    boolean matchesQuery(Event event) {
        ImmutableList<String> features = ImmutableList.of(event.getName(), event.getDescription(), event.getValue().toString());
        return features.stream()
                .map(String::toLowerCase)
                .anyMatch(feature -> feature.contains(query));
    }
}
