export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: { name: string };
}

export interface Summary {
  [key: string]: number;
}

export interface DailyReport {
  [date: string]: Expense[];
}

export interface WeeklyReport {
  [date: string]: Expense[];
}

export interface MonthlyReport {
  [date: string]: Expense[];
}

export interface CategorySummary {
  [category: string]: number;
}