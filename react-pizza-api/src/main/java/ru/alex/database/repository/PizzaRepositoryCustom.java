package ru.alex.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;

@Repository
public interface PizzaRepositoryCustom {
    Page<PizzaListDto> findAllListItems(PizzaFilter filter, Pageable pageable);
}
