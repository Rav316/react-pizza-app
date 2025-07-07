package ru.alex.database.repository.impl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ru.alex.database.entity.Pizza;
import ru.alex.database.entity.PizzaItem;
import ru.alex.database.entity.QCategory;
import ru.alex.database.entity.QPizza;
import ru.alex.database.entity.QPizzaItem;
import ru.alex.database.repository.PizzaRepositoryCustom;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.mapper.pizza.PizzaListMapper;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PizzaRepositoryImpl implements PizzaRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final PizzaListMapper pizzaListMapper;

    @Override
    public Page<PizzaListDto> findAllListItems(PizzaFilter filter, Pageable pageable) {
        QPizza pizza = QPizza.pizza;
        QCategory category = QCategory.category;
        QPizzaItem pizzaItem = QPizzaItem.pizzaItem;

        List<Tuple> result = queryFactory
                .select(
                        pizza,
                        pizzaItem.price.min()
                )
                .from(pizza)
                .leftJoin(pizza.category).fetchJoin()
                .leftJoin(pizzaItem).on(pizzaItem.pizza.eq(pizza))
                .where(buildPredicate(filter))
                .groupBy(pizza.id, pizza.category)
                .orderBy(getSortOrder(filter))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Pizza> pizzas = result.stream()
                .map(t -> t.get(pizza))
                .toList();

        List<PizzaItem> pizzaItems = queryFactory
                .selectFrom(pizzaItem)
                .leftJoin(pizzaItem.size).fetchJoin()
                .leftJoin(pizzaItem.type).fetchJoin()
                .where(pizzaItem.pizza.in(pizzas))
                .orderBy(pizzaItem.type.title.asc())
                .orderBy(pizzaItem.size.value.asc())
                .fetch();

        Map<Integer, List<PizzaItem>> itemsGrouped = pizzaItems.stream()
                .collect(Collectors.groupingBy(item -> item.getPizza().getId()));

        List<PizzaListDto> pizzaList = result.stream()
                .map(tuple -> {
                    Pizza p = tuple.get(pizza);
                    Objects.requireNonNull(p).setPizzaItems(itemsGrouped.getOrDefault(p.getId(), Collections.emptyList()));
                    BigDecimal price = tuple.get(pizzaItem.price.min());
                    return pizzaListMapper.map(p, price);
                }).toList();

        Long total = queryFactory
                .select(pizza.count())
                .from(pizza)
                .join(pizza.category, category)
                .where(buildPredicate(filter))
                .fetchOne();


        return new PageImpl<>(pizzaList, pageable, Objects.requireNonNull(total));
    }

    private BooleanExpression buildPredicate(PizzaFilter filter) {
        QCategory category = QCategory.category;
        QPizza pizza = QPizza.pizza;

        BooleanExpression predicate = Expressions.TRUE.isTrue();
        if(filter.category() != null && !filter.category().equalsIgnoreCase("Все")) {
            predicate = predicate.and(category.title.eq(filter.category()));
        }
        if (filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(pizza.title.containsIgnoreCase(filter.search()));
        }
        return predicate;
    }

    private OrderSpecifier<?>[] getSortOrder(PizzaFilter filter) {
        QPizza pizza = QPizza.pizza;
        QPizzaItem pizzaItem = QPizzaItem.pizzaItem;

        boolean desc = filter.order() != null && filter.order().equalsIgnoreCase("desc");

        OrderSpecifier<?> primarySort;

        if (filter.sort() == null) {
            primarySort = null;
        } else {
            primarySort = switch (filter.sort()) {
                case "price" -> desc ? pizzaItem.price.min().desc() : pizzaItem.price.min().asc();
                case "alphabet" -> desc ? pizza.title.desc() : pizza.title.asc();
                case "popularity" -> desc ? pizza.rating.desc() : pizza.rating.asc();
                default -> null;
            };
        }


        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        if (primarySort != null) {
            orderSpecifiers.add(primarySort);
        }
        orderSpecifiers.add(desc ? pizza.id.desc() : pizza.id.asc());

        return orderSpecifiers.toArray(new OrderSpecifier[0]);
    }
}
