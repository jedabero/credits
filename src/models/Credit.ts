import { EntityId } from '@reduxjs/toolkit';

export type Credit = {
  id: EntityId,
  name: string,
  quota: number,
  balance: number,
  cutoffDay: number,
  lastPaymentDate?: Date,
};
