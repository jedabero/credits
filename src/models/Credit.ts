export type Credit = {
  quota: number,
  balance: number,
  cutoffDay: number,
  lastPaymentDate?: Date,
};
