import { EntityId } from '@reduxjs/toolkit';
import { History } from './History';

export type Movement = {
  id: EntityId,

  cardId: EntityId,

  authNumber: string;

  date: string;

  description: string;

  value: number; // initial balance

  monthlyRate: number;

  yearlyRate: number;

  quotas: number; // initial quotes

  history?: History[];
};
