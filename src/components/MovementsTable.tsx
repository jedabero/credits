import { EntityId } from '@reduxjs/toolkit';
import { selectMovementsIdsByCardId } from '../reducers/movements';
import { useAppSelector } from '../hooks';
import MovementRow from './MovementRow';

type MovementsTableProps = {
  cardId: EntityId,
  onEdit: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
  onView: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
};

function MovementsTable({ cardId, onEdit, onView }: MovementsTableProps) {
  const movementsIds = useAppSelector(selectMovementsIdsByCardId(cardId));

  return (
    <div className="movementstable">
      <div className="movementrow">
        <div>ID</div>
        <div>Auth Number</div>
        <div>Date</div>
        <div>Description</div>
        <div>Value</div>
        <div>Monthly Rate</div>
        <div>Yearly Rate</div>
        <div>Quotas</div>
        <div>Actions</div>
      </div>
      {movementsIds.map((id) => (
        <MovementRow key={id} movementId={id} onEdit={onEdit} onView={onView} />
      ))}
    </div>
  );
}

export default MovementsTable;
