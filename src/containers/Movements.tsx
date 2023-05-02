import { useCallback, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import MovementForm from '../components/MovementForm';
import MovementsTable from '../components/MovementsTable';

import './Movements.css';

type MovementProps = {
  cardId: EntityId
  onViewMovementHistory: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
};

function Movements({ cardId, onViewMovementHistory }: MovementProps) {
  const [movementIdBeingEdited, setMovementId] = useState<EntityId | undefined>();
  const clearMovementId = useCallback(() => setMovementId(undefined), [setMovementId]);
  return (
    <div className="movements">
      <h4>Movements</h4>
      <MovementForm
        cardId={cardId}
        movementId={movementIdBeingEdited}
        clearMovementId={clearMovementId}
      />
      <MovementsTable cardId={cardId} onEdit={setMovementId} onView={onViewMovementHistory} />
    </div>
  );
}

export default Movements;
