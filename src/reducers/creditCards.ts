import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { CreditCard } from '../models/CreditCard';
import type { RootState } from '../store';

export const cardsAdapter = createEntityAdapter<CreditCard>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});
const initialState = cardsAdapter.getInitialState();

const cardsSlice = createSlice({
  name: 'creditCards',
  initialState,
  reducers: {
    addCard: cardsAdapter.addOne,
    updateCard: cardsAdapter.updateOne,
    removeCard: cardsAdapter.removeOne,
  },
});

export default cardsSlice.reducer;

export const { addCard, updateCard, removeCard } = cardsSlice.actions;
export const {
  selectAll: selectAllCreditCards,
  selectById: selectCreditCardById,
  selectEntities: selectCreditCards,
  selectIds: selectCreditCardsIds,
  selectTotal: selectCreditCardTotal,
} = cardsAdapter.getSelectors<RootState>(({ creditCards }) => creditCards);
