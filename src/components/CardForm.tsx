import {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { selectCreditCardById, addCard, updateCard } from '../reducers/creditCards';
import { useAppSelector, useAppDispatch } from '../hooks';
import { CreditCard } from '../models/CreditCard';
import './CardForm.css';

type CardFormProps = {
  cardId?: EntityId,
  onSave: () => void,
};

function CardForm({ cardId, onSave }: CardFormProps) {
  const dispatch = useAppDispatch();
  const id = useMemo(() => cardId || crypto.randomUUID(), [cardId]);
  const card = useAppSelector((state) => selectCreditCardById(state, id));
  const [values, setValues] = useState<CreditCard>({
    id,
    name: card?.name ?? '',
    cardNumber: card?.cardNumber ?? '',
    quota: card?.quota ?? 0,
    balance: card?.balance ?? 0,
    cutoffDay: card?.cutoffDay ?? 1,
  });
  useEffect(() => {
    setValues({
      id,
      name: card?.name ?? '',
      cardNumber: card?.cardNumber ?? '',
      quota: card?.quota ?? 0,
      balance: card?.balance ?? 0,
      cutoffDay: card?.cutoffDay ?? 1,
    });
  }, [id, card]);
  const setValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement & { name: keyof CreditCard }>) => {
      const { name, value } = event.target;
      const valueType = typeof values[name];
      if (valueType === 'number' && Number.isNaN(parseInt(value, 10))) return;
      setValues((oldValues: CreditCard) => ({
        ...oldValues,
        [name]: valueType === 'number' ? parseInt(value, 10) : value,
      }));
    },
    [values, setValues],
  );
  const save = useCallback(() => {
    if (card?.id) {
      dispatch(updateCard({ id: card.id, changes: values }));
    } else {
      dispatch(addCard(values));
    }
    setValues({
      id,
      name: '',
      cardNumber: '',
      quota: 0,
      balance: 0,
      cutoffDay: 1,
    });
    onSave();
  }, [id, card?.id, dispatch, onSave, values]);
  return (
    <div className="cardrow">
      <div>{(`${values.id}`).substring(0, 13)}</div>
      <input name="name" value={values.name} onChange={setValue} />
      <input name="cardNumber" value={values.cardNumber} onChange={setValue} />
      <input name="quota" type="number" value={values.quota} onChange={setValue} />
      <input name="balance" type="number" value={values.balance} onChange={setValue} />
      <input name="cutoffDay" type="number" value={values.cutoffDay} onChange={setValue} min={1} max={31} />
      <button type="button" onClick={save}>{card?.id ? 'Update' : 'Create'}</button>
    </div>
  );
}

CardForm.defaultProps = {
  cardId: null,
};

export default CardForm;
