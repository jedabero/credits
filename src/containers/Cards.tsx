import { useCallback, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import CardForm from '../components/CardForm';
import CardsTable from '../components/CardsTable';

import './Cards.css';

type CardsProps = {
  onViewCardMovements: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
};

function Cards({ onViewCardMovements }: CardsProps) {
  const [cardIdBeingEdited, setCardId] = useState<EntityId | undefined>();
  const clearCardId = useCallback(() => {
    setCardId(undefined);
  }, [setCardId]);
  return (
    <div className="cards">
      <h3>Cards</h3>
      <CardForm cardId={cardIdBeingEdited} clearCardId={clearCardId} />
      <CardsTable onEdit={setCardId} onView={onViewCardMovements} />
    </div>
  );
}

export default Cards;
