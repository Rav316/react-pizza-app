package ru.alex.dto;

import ru.alex.dto.pizzaSize.PizzaSizeReadDto;
import ru.alex.dto.pizzaType.PizzaTypeReadDto;

import java.math.BigDecimal;

public record PizzaItemReadDto(
        Integer id,
        Integer pizzaId,
        PizzaTypeReadDto type,
        PizzaSizeReadDto size,
        BigDecimal price
) {
}
