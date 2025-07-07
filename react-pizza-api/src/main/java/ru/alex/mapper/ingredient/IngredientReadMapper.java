package ru.alex.mapper.ingredient;

import org.springframework.stereotype.Component;
import ru.alex.database.entity.Ingredient;
import ru.alex.dto.ingredient.IngredientReadDto;
import ru.alex.mapper.Mapper;

@Component
public class IngredientReadMapper implements Mapper<Ingredient, IngredientReadDto> {
    @Override
    public IngredientReadDto map(Ingredient entity) {
        return new IngredientReadDto(
                entity.getId(),
                entity.getTitle()
        );
    }
}
