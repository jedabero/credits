export type History = {
  date: Date,
  quotas: number, // in case of quotes change
  debits: number,
  credits: number,
  balance: number, // remaining
  interest: number,
  total: number,
};
