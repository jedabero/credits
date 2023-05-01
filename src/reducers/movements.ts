import {
  createEntityAdapter, createSlice, createDraftSafeSelector, EntityId,
} from '@reduxjs/toolkit';
import { Movement } from '../models/Movement';
import type { RootState } from '../store';

export const movementsAdapter = createEntityAdapter<Movement>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.authNumber.localeCompare(b.authNumber),
});
const initialState = movementsAdapter.getInitialState();

const cardsSlice = createSlice({
  name: 'movements',
  initialState,
  reducers: {
    addMovement: movementsAdapter.addOne,
    updateMovement: movementsAdapter.updateOne,
    removeMovement: movementsAdapter.removeOne,
  },
});

export default cardsSlice.reducer;

export const { addMovement, updateMovement, removeMovement } = cardsSlice.actions;
export const {
  selectAll: selectAllMovements,
  selectById: selectMovementById,
  selectEntities: selectMovements,
  selectIds: selectMovementsIds,
  selectTotal: selectMovementTotal,
} = movementsAdapter.getSelectors<RootState>(({ movements }) => movements);
export const selectMovementsIdsByCardId = (cardId: EntityId) => createDraftSafeSelector(
  ({ movements }: RootState) => movements,
  (movements) => movements.ids
    .filter((id) => movements.entities[id]?.cardId === cardId),
);
export const selectMovementsByCardId = (cardId: EntityId) => createDraftSafeSelector(
  ({ movements }: RootState) => movements,
  (movements) => movements.ids
    .filter((id) => movements.entities[id]?.cardId === cardId)
    .map((id) => movements.entities[id]),
);
