import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import CardForm from '../components/CardForm';
import CardsTable from '../components/CardsTable';

import './Cards.css';

function Cards() {
  const [cardIdBeingEdited, setCardId] = useState<EntityId | undefined>();
  return (
    <div className="cards">
      <h3>Cards</h3>
      <CardForm cardId={cardIdBeingEdited} onSave={() => setCardId(undefined)} />
      <CardsTable onEdit={setCardId} />
    </div>
  );
}

export default Cards;
