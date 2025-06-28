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
import ru.alex.database.entity.QCategory;
import ru.alex.database.entity.QPizza;
import ru.alex.database.entity.QPizzaItem;
import ru.alex.database.entity.QPizzaSize;
import ru.alex.database.entity.QPizzaType;
import ru.alex.database.repository.PizzaRepositoryCustom;
import ru.alex.dto.category.CategoryReadDto;
import ru.alex.dto.filter.PizzaFilter;
import ru.alex.dto.pizza.PizzaListDto;
import ru.alex.dto.pizzaSize.PizzaSizeReadDto;
import ru.alex.dto.pizzaType.PizzaTypeReadDto;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PizzaRepositoryImpl implements PizzaRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<PizzaListDto> findAllListItems(PizzaFilter filter, Pageable pageable) {
        QPizza pizza = QPizza.pizza;
        QCategory category = QCategory.category;
        QPizzaItem pizzaItem = QPizzaItem.pizzaItem;

        List<Tuple> tuples = queryFactory
                .select(
                        pizza.id,
                        pizza.title,
                        pizza.imageUrl,
                        pizza.rating,
                        category.id,
                        category.title,
                        pizzaItem.price.min()
                )
                .from(pizza)
                .join(pizza.category, category)
                .leftJoin(pizzaItem).on(pizzaItem.pizza.eq(pizza))
                .groupBy(pizza.id, category.id, pizza.title, pizza.imageUrl, pizza.rating, category.title)
                .where(buildPredicate(filter))
                .orderBy(getSortOrder(filter))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Integer> pizzaIds = tuples.stream().map(t -> t.get(pizza.id)).toList();

        Map<Integer, List<PizzaTypeReadDto>> pizzaTypes = fetchPizzaTypes(pizzaIds);
        Map<Integer, List<PizzaSizeReadDto>> pizzaSizes = fetchPizzaSizes(pizzaIds);

        Long total = queryFactory
                .select(pizza.count())
                .from(pizza)
                .join(pizza.category, category)
                .where(buildPredicate(filter))
                .fetchOne();

        List<PizzaListDto> pizzas = tuples.stream().map(t -> {
            int id = Objects.requireNonNull(t.get(pizza.id));
            return new PizzaListDto(
                    id,
                    t.get(pizza.title),
                    t.get(pizzaItem.price.min()),
                    t.get(pizza.imageUrl),
                    pizzaTypes.getOrDefault(id, Collections.emptyList()),
                    pizzaSizes.getOrDefault(id, Collections.emptyList()),
                    new CategoryReadDto(t.get(category.id), t.get(category.title)),
                    t.get(pizza.rating)
            );
        }).toList();
        return new PageImpl<>(pizzas, pageable, Objects.requireNonNull(total));
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
            primarySort = desc ? pizza.rating.desc() : pizza.rating.asc();
        } else {
            primarySort = switch (filter.sort()) {
                case "price" -> desc ? pizzaItem.price.min().desc() : pizzaItem.price.min().asc();
                case "alphabet" -> desc ? pizza.title.desc() : pizza.title.asc();
                default -> desc ? pizza.rating.desc() : pizza.rating.asc();
            };
        }

        return new OrderSpecifier<?>[] {
                primarySort,
                desc ? pizza.id.desc() : pizza.id.asc()
        };
    }


    private Map<Integer, List<PizzaTypeReadDto>> fetchPizzaTypes(List<Integer> pizzaIds) {
        QPizzaItem pizzaItem = QPizzaItem.pizzaItem;
        QPizzaType pizzaType = QPizzaType.pizzaType;

        return queryFactory
                .select(pizzaItem.pizza.id, pizzaType.id, pizzaType.title)
                .from(pizzaItem)
                .join(pizzaItem.type, pizzaType)
                .where(pizzaItem.pizza.id.in(pizzaIds))
                .distinct()
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        tuple -> Objects.requireNonNull(tuple.get(pizzaItem.pizza.id)),
                        Collectors.mapping(tuple -> new PizzaTypeReadDto(
                                tuple.get(pizzaType.id),
                                tuple.get(pizzaType.title)
                        ), Collectors.toList())
                ));
    }

    private Map<Integer, List<PizzaSizeReadDto>> fetchPizzaSizes(List<Integer> pizzaIds) {
        QPizzaItem pizzaItem = QPizzaItem.pizzaItem;
        QPizzaSize pizzaSize = QPizzaSize.pizzaSize;

        return queryFactory
                .select(pizzaItem.pizza.id, pizzaSize.id, pizzaSize.value)
                .from(pizzaItem)
                .join(pizzaItem.size, pizzaSize)
                .where(pizzaItem.pizza.id.in(pizzaIds))
                .distinct()
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        tuple -> Objects.requireNonNull(tuple.get(pizzaItem.pizza.id)),
                        Collectors.mapping(tuple -> new PizzaSizeReadDto(
                                tuple.get(pizzaSize.id),
                                tuple.get(pizzaSize.value)
                        ), Collectors.toList())
                ));
    }

}
