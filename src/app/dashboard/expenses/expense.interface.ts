export interface RegisterExpense {
  userId: number;
  type: number;
  value: number;
  receipt: string;
  description: string;
}

export interface Expenses {
  userId: number;
  type: string;
  value: number;
  receipt: string;
  description: string;
  createdAt: Date;
  status: string;
}
