package ru.alex.mapper.pizza;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.alex.database.entity.Pizza;
import ru.alex.dto.PizzaItemReadDto;
import ru.alex.dto.ingredient.IngredientReadDto;
import ru.alex.dto.pizza.PizzaReadDto;
import ru.alex.mapper.Mapper;
import ru.alex.mapper.category.CategoryReadMapper;
import ru.alex.mapper.ingredient.IngredientReadMapper;
import ru.alex.mapper.pizzaItem.PizzaItemReadMapper;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PizzaReadMapper implements Mapper<Pizza, PizzaReadDto> {
    private final PizzaItemReadMapper pizzaItemReadMapper;
    private final IngredientReadMapper ingredientReadMapper;
    private final CategoryReadMapper categoryReadMapper;

    @Override
    public PizzaReadDto map(Pizza entity) {
        List<PizzaItemReadDto> items = entity.getPizzaItems()
                .stream()
                .map(pizzaItemReadMapper::map)
                .toList();

        List<IngredientReadDto> ingredients = entity.getIngredients()
                .stream()
                .map(ingredientReadMapper::map)
                .toList();

        return new PizzaReadDto(
                entity.getId(),
                entity.getTitle(),
                entity.getImageUrl(),
                entity.getDescription(),
                items,
                categoryReadMapper.map(entity.getCategory()),
                entity.getRating(),
                ingredients
        );
    }
}
