package ru.alex.mapper.pizzaType;

import org.springframework.stereotype.Component;
import ru.alex.database.entity.PizzaType;
import ru.alex.dto.pizzaType.PizzaTypeReadDto;
import ru.alex.mapper.Mapper;

@Component
public class PizzaTypeReadMapper implements Mapper<PizzaType, PizzaTypeReadDto> {
    @Override
    public PizzaTypeReadDto map(PizzaType entity) {
        return new PizzaTypeReadDto(
                entity.getId(),
                entity.getTitle()
        );
    }
}
