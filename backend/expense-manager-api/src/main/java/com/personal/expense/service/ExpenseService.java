package com.personal.expense.service;

import com.personal.expense.model.Expense;

import java.util.List;

public interface ExpenseService {
    Expense save(Expense expense);
    List<Expense> findAll();
    Expense findById(Long id);
    void deleteById(Long id);
}