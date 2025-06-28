package ru.alex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.database.repository.PizzaRepository;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.dto.response.PageResponse;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzaRepository;

    public PageResponse<PizzaListDto> findAll(PizzaFilter filter, Pageable pageable) {
        return PageResponse.of(pizzaRepository.findAllListItems(filter, pageable));
    }
}
