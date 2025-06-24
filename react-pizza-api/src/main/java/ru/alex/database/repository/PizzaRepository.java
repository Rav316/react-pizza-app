package ru.alex.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.database.entity.Pizza;

@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Integer>, PizzaRepositoryCustom {
}
