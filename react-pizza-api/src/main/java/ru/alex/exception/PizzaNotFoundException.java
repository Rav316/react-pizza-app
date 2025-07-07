package ru.alex.exception;

import jakarta.persistence.EntityNotFoundException;

public class PizzaNotFoundException extends EntityNotFoundException {
    public PizzaNotFoundException(Integer id) {
        super("pizza with id " + id + " not found");
    }
}
