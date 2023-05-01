import { useCallback, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import MovementForm from '../components/MovementForm';

import './Movements.css';
import MovementsTable from '../components/MovementsTable';

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
      <MovementsTable onEdit={setMovementId} onView={onViewMovementHistory} />
    </div>
  );
}

export default Movements;
