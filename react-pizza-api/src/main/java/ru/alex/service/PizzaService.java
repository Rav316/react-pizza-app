package ru.alex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.database.repository.PizzaRepository;
import ru.alex.dto.pizza.PizzaListDto;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzaRepository;

    public List<PizzaListDto> findAll() {
        return pizzaRepository.findAllListItems();
    }
}
