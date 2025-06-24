package ru.alex.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.database.entity.PizzaItem;

@Repository
public interface PizzaItemRepository extends JpaRepository<PizzaItem, Integer> {
}
