package ru.alex.mapper;

public interface Mapper <E, D> {
    D map(E entity);
}
