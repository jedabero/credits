import { EntityId } from '@reduxjs/toolkit';
import { selectCreditCardsIds } from '../reducers/creditCards';
import { useAppSelector } from '../hooks';
import CardRow from './CardRow';

type CardsTableProps = {
  onEdit: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
  onView: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
};

function CardsTable({ onEdit, onView }: CardsTableProps) {
  const cardsIds = useAppSelector(selectCreditCardsIds);

  return (
    <div className="cardstable">
      <div className="cardrow">
        <div>ID</div>
        <div>Name</div>
        <div>Number</div>
        <div>Quota</div>
        <div>Balance</div>
        <div>Cut off day</div>
        <div>Actions</div>
      </div>
      {cardsIds.map((id) => (
        <CardRow key={id} cardId={id} onEdit={onEdit} onView={onView} />
      ))}
    </div>
  );
}

export default CardsTable;
