import { useCallback } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import { selectCreditCardById, removeCard } from '../reducers/creditCards';
import { useAppSelector, useAppDispatch } from '../hooks';

type CardRowProps = {
  cardId: EntityId,
  onEdit: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
  onView: React.Dispatch<React.SetStateAction<EntityId | undefined>>,
};

function CardRow({ cardId, onEdit, onView }: CardRowProps) {
  const dispatch = useAppDispatch();
  const handleDelete = useCallback(() => dispatch(removeCard(cardId)), [cardId, dispatch]);
  const handleEdit = useCallback(() => onEdit(cardId), [cardId, onEdit]);
  const handleView = useCallback(() => onView(cardId), [cardId, onView]);
  const card = useAppSelector((state) => selectCreditCardById(state, cardId));
  if (!card) return null;
  return (
    <div className="cardrow">
      <div>{(`${card.id}`).substring(0, 13)}</div>
      <div>{card.name}</div>
      <div>{card.cardNumber}</div>
      <div>{card.quota.toLocaleString('en-419', { style: 'currency', currency: 'USD' })}</div>
      <div>{card.balance.toLocaleString('en-419', { style: 'currency', currency: 'USD' })}</div>
      <div>{card.cutoffDay}</div>
      <div>
        <button type="button" onClick={handleView}>View</button>
        <button type="button" onClick={handleEdit}>Edit</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default CardRow;
