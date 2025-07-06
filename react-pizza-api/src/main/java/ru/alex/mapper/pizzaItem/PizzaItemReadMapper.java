package ru.alex.mapper.pizzaItem;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.alex.database.entity.PizzaItem;
import ru.alex.dto.PizzaItemReadDto;
import ru.alex.mapper.Mapper;
import ru.alex.mapper.pizzaSize.PizzaSizeReadMapper;
import ru.alex.mapper.pizzaType.PizzaTypeReadMapper;

@Component
@RequiredArgsConstructor
public class PizzaItemReadMapper implements Mapper<PizzaItem, PizzaItemReadDto> {
    private final PizzaTypeReadMapper pizzaTypeReadMapper;
    private final PizzaSizeReadMapper pizzaSizeReadMapper;

    @Override
    public PizzaItemReadDto map(PizzaItem entity) {
        return new PizzaItemReadDto(
                entity.getId(),
                entity.getPizza().getId(),
                pizzaTypeReadMapper.map(entity.getType()),
                pizzaSizeReadMapper.map(entity.getSize()),
                entity.getPrice()
        );
    }
}
