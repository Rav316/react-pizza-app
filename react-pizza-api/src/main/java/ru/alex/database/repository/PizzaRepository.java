package ru.alex.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.database.entity.Pizza;

import java.util.Optional;

@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Integer>, PizzaRepositoryCustom {
    @Query("""
        SELECT p
        FROM Pizza p
        LEFT JOIN FETCH p.category c
        LEFT JOIN FETCH p.pizzaItems pi
        LEFT JOIN FETCH p.ingredients i
        WHERE p.id = :id
        """)
    Optional<Pizza> findByIdWithItemsAndIngredients(Integer id);
}
