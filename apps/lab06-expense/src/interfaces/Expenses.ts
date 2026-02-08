export interface Expense {
  id?: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  note: string;
  createdAt: Date | any;
}
