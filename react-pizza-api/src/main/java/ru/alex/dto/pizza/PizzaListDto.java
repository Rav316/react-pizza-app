package ru.alex.dto.pizza;

import ru.alex.dto.PizzaItemReadDto;
import ru.alex.dto.category.CategoryReadDto;

import java.math.BigDecimal;
import java.util.List;

public record PizzaListDto (
        Integer id,
        String title,
        String imageUrl,
        List<PizzaItemReadDto> items,
        CategoryReadDto category,
        Integer rating,
        BigDecimal minPrice
) {
}
