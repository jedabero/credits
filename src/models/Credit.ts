export type Credit = {
  id: number,
  name: string,
  quota: number,
  balance: number,
  cutoffDay: number,
  lastPaymentDate?: Date,
};
