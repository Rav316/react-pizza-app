package ru.alex.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.dto.pizza.PizzaReadDto;
import ru.alex.dto.response.PageResponse;
import ru.alex.service.PizzaService;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/pizza")
@RequiredArgsConstructor
public class PizzaController {
    private final PizzaService pizzaService;

    @GetMapping
    public PageResponse<PizzaListDto> findAll(@ModelAttribute PizzaFilter filter, Pageable pageable) {
        return pizzaService.findAll(filter, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PizzaReadDto> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(pizzaService.findById(id), OK);
    }
}
