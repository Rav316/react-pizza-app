package ru.alex.dto.filter;

public record PizzaFilter (
        String category,
        String sort,
        String order,
        String search
) {
}
