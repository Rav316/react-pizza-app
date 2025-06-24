package ru.alex.mapper.category;

import org.springframework.stereotype.Component;
import ru.alex.database.entity.Category;
import ru.alex.dto.category.CategoryReadDto;
import ru.alex.mapper.Mapper;

@Component
public class CategoryReadMapper implements Mapper<Category, CategoryReadDto> {
    @Override
    public CategoryReadDto map(Category entity) {
        return new CategoryReadDto(
                entity.getId(),
                entity.getTitle()
        );
    }
}
