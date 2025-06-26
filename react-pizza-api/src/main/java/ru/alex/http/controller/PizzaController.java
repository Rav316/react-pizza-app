package ru.alex.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.service.PizzaService;

import java.util.List;

@RestController
@RequestMapping("/api/pizza")
@RequiredArgsConstructor
public class PizzaController {
    private final PizzaService pizzaService;

    @GetMapping
    public List<PizzaListDto> findAll(
            @RequestParam(defaultValue = "popularity") String sortBy,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "asc") String order,
            @RequestParam(required = false) String search
    ) {
        return pizzaService.findAll(new PizzaFilter(category, sortBy, order, search));
    }
}
