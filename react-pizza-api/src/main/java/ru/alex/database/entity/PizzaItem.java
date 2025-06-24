package ru.alex.database.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "pizza_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PizzaItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pizza_id", referencedColumnName = "id")
    private Pizza pizza;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pizza_type_id", referencedColumnName = "id")
    private PizzaType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pizza_size_id", referencedColumnName = "id")
    private PizzaSize size;

    private BigDecimal price;
}
