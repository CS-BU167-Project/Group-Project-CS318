package com.personal.expense.controller;

import com.personal.expense.model.Expense;
import com.personal.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ExpenseRepository expenseRepository;

    @GetMapping("/daily")
    public Map<LocalDate, List<Expense>> getDailyReport(@RequestParam Long userId) {
        LocalDate today = LocalDate.now();
        List<Expense> expenses = expenseRepository.findByUserIdAndDateBetween(userId, today, today);
        return expenses.stream().collect(Collectors.groupingBy(Expense::getDate));
    }

    @GetMapping("/weekly")
    public Map<LocalDate, List<Expense>> getWeeklyReport(@RequestParam Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate weekAgo = today.minusWeeks(1);
        List<Expense> expenses = expenseRepository.findByUserIdAndDateBetween(userId, weekAgo, today);
        return expenses.stream().collect(Collectors.groupingBy(Expense::getDate));
    }

    @GetMapping("/monthly")
    public Map<LocalDate, List<Expense>> getMonthlyReport(@RequestParam Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate monthAgo = today.minusMonths(1);
        List<Expense> expenses = expenseRepository.findByUserIdAndDateBetween(userId, monthAgo, today);
        return expenses.stream().collect(Collectors.groupingBy(Expense::getDate));
    }

    @GetMapping("/summary")
    public Map<String, BigDecimal> getSummary(@RequestParam Long userId) {
        List<Expense> expenses = expenseRepository.findByUserId(userId);
        return expenses.stream().collect(Collectors.groupingBy(expense -> expense.getCategory().getName(),
                Collectors.mapping(Expense::getAmount, Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))));
    }
}