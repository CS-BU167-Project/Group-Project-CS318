package com.personal.expense.controller;

import com.personal.expense.model.Expense;
import com.personal.expense.model.User;
import com.personal.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public Map<LocalDate, List<Expense>> getDailyReport(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        LocalDate today = LocalDate.now();
        List<Expense> expenses = expenseRepository.findByUserIdAndDateBetween(user.getId(), today, today);
        return expenses.stream().collect(Collectors.groupingBy(Expense::getDate));
    }

    @GetMapping("/weekly")
    public Map<LocalDate, List<Expense>> getWeeklyReport(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        LocalDate today = LocalDate.now();
        LocalDate weekAgo = today.minusWeeks(1);
        List<Expense> expenses = expenseRepository.findByUserIdAndDateBetween(user.getId(), weekAgo, today);
        return expenses.stream().collect(Collectors.groupingBy(Expense::getDate));
    }

    @GetMapping("/monthly")
    public Map<LocalDate, List<Expense>> getMonthlyReport(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        LocalDate today = LocalDate.now();
        LocalDate monthAgo = today.minusMonths(1);
        List<Expense> expenses = expenseRepository.findByUserIdAndDateBetween(user.getId(), monthAgo, today);
        return expenses.stream().collect(Collectors.groupingBy(Expense::getDate));
    }

    @GetMapping("/summary")
    public Map<String, BigDecimal> getSummary(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Expense> expenses = expenseRepository.findByUserId(user.getId());
        return expenses.stream().collect(Collectors.groupingBy(expense -> expense.getCategory().getName(),
                Collectors.mapping(Expense::getAmount, Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))));
    }
}