package ru.alex.dto.pizza;

import ru.alex.dto.PizzaItemReadDto;
import ru.alex.dto.category.CategoryReadDto;
import ru.alex.dto.ingredient.IngredientReadDto;

import java.util.List;

public record PizzaReadDto(
        Integer id,
        String title,
        String imageUrl,
        String description,
        List<PizzaItemReadDto> items,
        CategoryReadDto category,
        Integer rating,
        List<IngredientReadDto> ingredients
) {
}
