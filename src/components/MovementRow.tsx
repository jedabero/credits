import { useCallback } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import { selectMovementById, removeMovement } from '../reducers/movements';
import { useAppSelector, useAppDispatch } from '../hooks';

type MovementRowProps = {
  movementId: EntityId,
  onEdit: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
  onView: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
};

function MovementRow({ movementId, onEdit, onView }: MovementRowProps) {
  const dispatch = useAppDispatch();
  const handleDelete = useCallback(
    () => dispatch(removeMovement(movementId)),
    [movementId, dispatch],
  );
  const handleEdit = useCallback(() => onEdit(movementId), [movementId, onEdit]);
  const handleView = useCallback(() => onView(movementId), [movementId, onView]);
  const movement = useAppSelector((state) => selectMovementById(state, movementId));
  if (!movement) return null;
  return (
    <div className="movementrow">
      <div>{(`${movementId}`).substring(0, 13)}</div>
      <div>{movement.authNumber}</div>
      <div>{movement.date}</div>
      <div>{movement.description}</div>
      <div>{movement.value.toLocaleString('en-419', { style: 'currency', currency: 'USD' })}</div>
      <div>{movement.monthlyRate}</div>
      <div>{movement.yearlyRate}</div>
      <div>{movement.quotas}</div>
      <div>
        <button type="button" onClick={handleView}>View</button>
        <button type="button" onClick={handleEdit}>Edit</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default MovementRow;
