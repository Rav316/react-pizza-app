package ru.alex.dto.pizza;

import ru.alex.dto.category.CategoryReadDto;
import ru.alex.dto.pizzaSize.PizzaSizeReadDto;
import ru.alex.dto.pizzaType.PizzaTypeReadDto;

import java.math.BigDecimal;
import java.util.List;

public record PizzaListDto(
        Integer id,
        String title,
        BigDecimal price,
        String imageUrl,
        List<PizzaTypeReadDto> types,
        List<PizzaSizeReadDto> sizes,
        CategoryReadDto category,
        Integer rating
) {
}
