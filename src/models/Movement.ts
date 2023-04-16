import { History } from './History';

export type Movement = {
  authNumber: string;

  date: Date;

  description: string;

  value: number; // initial balance

  monthlyRate: number;

  yearlyRate: number;

  quotas: number; // initial quotes

  history?: History[];
};
