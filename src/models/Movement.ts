export type Movement = {
  authNumber: string,
  date: Date,
  description: string,
  value: number, // initial balance
  dailyRate?: number, // always calculated
  monthlyRate: number,
  yearlyRate: number,
  quotas: number // initial quotes
  history?: History[],
}
