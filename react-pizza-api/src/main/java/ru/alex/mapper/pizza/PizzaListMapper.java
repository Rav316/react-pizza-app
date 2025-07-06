package ru.alex.mapper.pizza;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.alex.database.entity.Pizza;
import ru.alex.dto.PizzaItemReadDto;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.mapper.Mapper;
import ru.alex.mapper.category.CategoryReadMapper;
import ru.alex.mapper.pizzaItem.PizzaItemReadMapper;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PizzaListMapper implements Mapper<Pizza, PizzaListDto> {
    private final PizzaItemReadMapper pizzaItemReadMapper;
    private final CategoryReadMapper categoryReadMapper;

    @Override
    public PizzaListDto map(Pizza entity) {
        List<PizzaItemReadDto> items = entity.getPizzaItems()
                .stream()
                .map(pizzaItemReadMapper::map)
                .toList();

        return new PizzaListDto(
                entity.getId(),
                entity.getTitle(),
                entity.getImageUrl(),
                items,
                categoryReadMapper.map(entity.getCategory()),
                entity.getRating(),
                null
        );
    }

    public PizzaListDto map(Pizza entity, BigDecimal minPrice) {
        List<PizzaItemReadDto> items = entity.getPizzaItems()
                .stream()
                .map(pizzaItemReadMapper::map)
                .toList();

        return new PizzaListDto(
                entity.getId(),
                entity.getTitle(),
                entity.getImageUrl(),
                items,
                categoryReadMapper.map(entity.getCategory()),
                entity.getRating(),
                minPrice
        );
    }
}
