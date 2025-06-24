package ru.alex.mapper.pizzaSize;

import org.springframework.stereotype.Component;
import ru.alex.database.entity.PizzaSize;
import ru.alex.dto.pizzaSize.PizzaSizeReadDto;
import ru.alex.mapper.Mapper;

@Component
public class PizzaSizeReadMapper implements Mapper<PizzaSize, PizzaSizeReadDto> {
    @Override
    public PizzaSizeReadDto map(PizzaSize entity) {
        return new PizzaSizeReadDto(
                entity.getId(),
                entity.getValue()
        );
    }
}
