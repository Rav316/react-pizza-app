package ru.alex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.database.repository.PizzaRepository;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.dto.pizza.PizzaReadDto;
import ru.alex.dto.response.PageResponse;
import ru.alex.exception.PizzaNotFoundException;
import ru.alex.mapper.pizza.PizzaReadMapper;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzaRepository;
    private final PizzaReadMapper pizzaReadMapper;

    public PageResponse<PizzaListDto> findAll(PizzaFilter filter, Pageable pageable) {
        return PageResponse.of(pizzaRepository.findAllListItems(filter, pageable));
    }

    public PizzaReadDto findById(Integer id) {
        return pizzaRepository.findByIdWithItemsAndIngredients(id)
                .map(pizzaReadMapper::map)
                .orElseThrow(() -> new PizzaNotFoundException(id));
    }
}
