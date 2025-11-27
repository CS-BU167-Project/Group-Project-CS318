package com.personal.expense.service;

import com.personal.expense.model.Category;
import com.personal.expense.model.Expense;
import com.personal.expense.repository.CategoryRepository;
import com.personal.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Expense save(Expense expense) {
        Category category = expense.getCategory();
        if (category != null && category.getId() == null) {
            Category existingCategory = categoryRepository.findByName(category.getName())
                    .orElseGet(() -> categoryRepository.save(category));
            expense.setCategory(existingCategory);
        }
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> findAll() {
        return expenseRepository.findAll();
    }

    @Override
    public Expense findById(Long id) {
        return expenseRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        expenseRepository.deleteById(id);
    }
}