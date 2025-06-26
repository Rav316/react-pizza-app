package ru.alex.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.database.repository.PizzaRepositoryCustom;
import ru.alex.dto.category.CategoryReadDto;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.dto.pizzaSize.PizzaSizeReadDto;
import ru.alex.dto.pizzaType.PizzaTypeReadDto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class PizzaRepositoryImpl implements PizzaRepositoryCustom {
    private final JdbcTemplate jdbcTemplate;

    private record PizzaMainData(
            int id,
            String title,
            BigDecimal price,
            String imageUrl,
            int categoryId,
            String categoryTitle,
            int rating
    ) {
    }

    @Override
    public List<PizzaListDto> findAllListItems(PizzaFilter filter) {
        List<PizzaMainData> mainData = getPizzaMainData();

        Map<Integer, List<PizzaTypeReadDto>> pizzaTypes = getPizzaTypes();
        Map<Integer, List<PizzaSizeReadDto>> pizzaSizes = getPizzaSizes();

        Stream<PizzaListDto> pizzas = mainData.stream().map(data -> new PizzaListDto(
                data.id(),
                data.title(),
                data.price(),
                data.imageUrl(),
                pizzaTypes.getOrDefault(data.id(), Collections.emptyList()),
                pizzaSizes.getOrDefault(data.id(), Collections.emptyList()),
                new CategoryReadDto(data.categoryId(), data.categoryTitle()),
                data.rating()
        ));
        if (filter.category() != null && !filter.category().equals("Все")) {
            pizzas = pizzas.filter(pizza ->
                    pizza.category().title().equals(filter.category())
            );
        }
        if (filter.sort() != null) {
            Comparator<PizzaListDto> comparator = switch (filter.sort()) {
                case "price" -> Comparator.comparing(PizzaListDto::price);
                case "alphabet" -> Comparator.comparing(PizzaListDto::title);
                default -> Comparator.comparing(PizzaListDto::rating);
            };
            if(filter.order().equals("desc")) {
                comparator = comparator.reversed();
            }
            pizzas = pizzas.sorted(comparator);
        }
        if(filter.search() != null) {
            pizzas = pizzas.filter(pizza ->
                    pizza.title().toLowerCase().contains(filter.search().toLowerCase()));
        }
        return pizzas.toList();
    }

    private List<PizzaMainData> getPizzaMainData() {
        String sql = """
                SELECT p.id, p.title, MIN(pi.price) AS min_price, p.image_url,
                       c.id AS category_id, c.title AS category_title, p.rating
                FROM pizza p
                JOIN category c ON p.category_id = c.id
                LEFT JOIN pizza_item pi ON p.id = pi.pizza_id
                GROUP BY p.id, c.id, p.title, p.image_url, p.rating
                ORDER BY p.id
                """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> new PizzaMainData(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getBigDecimal("min_price"),
                rs.getString("image_url"),
                rs.getInt("category_id"),
                rs.getString("category_title"),
                rs.getInt("rating")
        ));
    }

    private Map<Integer, List<PizzaTypeReadDto>> getPizzaTypes() {
        String sql = """
                SELECT DISTINCT pi.pizza_id, pt.id, pt.title
                FROM pizza_item pi
                JOIN pizza_type pt ON pi.pizza_type_id = pt.id
                ORDER BY pi.pizza_id, pt.id
                """;
        return jdbcTemplate.query(sql, rs -> {
            Map<Integer, List<PizzaTypeReadDto>> resultMap = new HashMap<>();
            while (rs.next()) {
                int pizzaId = rs.getInt("pizza_id");
                PizzaTypeReadDto dto = new PizzaTypeReadDto(
                        rs.getInt("id"),
                        rs.getString("title")
                );

                resultMap.computeIfAbsent(pizzaId, k -> new ArrayList<>())
                        .add(dto);
            }
            return resultMap;
        });
    }

    private Map<Integer, List<PizzaSizeReadDto>> getPizzaSizes() {
        String sql = """
                SELECT DISTINCT pi.pizza_id, ps.id, ps.value
                FROM pizza_item pi
                JOIN pizza_size ps ON pi.pizza_size_id = ps.id
                ORDER BY pi.pizza_id, ps.id
                """;
        return jdbcTemplate.query(sql, rs -> {
            Map<Integer, List<PizzaSizeReadDto>> resultMap = new HashMap<>();
            while (rs.next()) {
                int pizzaId = rs.getInt("pizza_id");
                PizzaSizeReadDto dto = new PizzaSizeReadDto(
                        rs.getInt("id"),
                        rs.getInt("value")
                );

                resultMap.computeIfAbsent(pizzaId, k -> new ArrayList<>())
                        .add(dto);
            }
            return resultMap;
        });
    }
}
