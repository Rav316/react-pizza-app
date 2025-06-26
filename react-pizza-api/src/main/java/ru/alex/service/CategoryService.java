package ru.alex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.database.repository.CategoryRepository;
import ru.alex.dto.category.CategoryReadDto;
import ru.alex.mapper.category.CategoryReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryReadMapper categoryReadMapper;

    public List<CategoryReadDto> findAll() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryReadMapper::map)
                .toList();
    }
}
