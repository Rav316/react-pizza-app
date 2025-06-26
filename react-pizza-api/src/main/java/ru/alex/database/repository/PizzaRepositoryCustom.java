package ru.alex.database.repository;

import org.springframework.stereotype.Repository;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;

import java.util.List;

@Repository
public interface PizzaRepositoryCustom {
    List<PizzaListDto> findAllListItems(PizzaFilter filter);
}
