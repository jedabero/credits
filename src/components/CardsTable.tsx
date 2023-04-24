import { useCallback } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { selectCreditCardsIds } from '../reducers/creditCards';
import { useAppSelector } from '../hooks';
import CardRow from './CardRow';

type CardsTableProps = {
  onEdit: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
};

function CardsTable({ onEdit }: CardsTableProps) {
  const cardsIds = useAppSelector(selectCreditCardsIds);
  const handleEdit = useCallback((id: EntityId | undefined) => () => onEdit(id), [onEdit]);

  return (
    <div className="cardstable">
      <div className="cardrow">
        <div>ID</div>
        <div>Name</div>
        <div>Number</div>
        <div>Quota</div>
        <div>Balance</div>
        <div>Cut off day</div>
        <div>Last cut off date</div>
        <div>Actions</div>
      </div>
      {cardsIds.map((id) => <CardRow key={id} cardId={id} onEdit={handleEdit(id)} />)}
    </div>
  );
}

export default CardsTable;
