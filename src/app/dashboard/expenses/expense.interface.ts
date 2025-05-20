export interface RegisterExpense {
  userId: number;
  type: number;
  value: number;
  receipt: string;
  description: string;
}

export interface Expenses {
  id: number;
  userId: number;
  type: number;
  value: number;
  receipt: string;
  description: string;
  createdAt: Date;
  status: number;
}
