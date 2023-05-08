import {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { selectCreditCardById, addCard, updateCard } from '../reducers/creditCards';
import { useAppSelector, useAppDispatch } from '../hooks';
import { CreditCard } from '../models/CreditCard';

type CardFormProps = {
  cardId?: EntityId,
  clearCardId: () => void,
};

function CardForm({ cardId, clearCardId }: CardFormProps) {
  const dispatch = useAppDispatch();
  const [wasSaved, setWasSaved] = useState(false);
  const id = useMemo(() => {
    if (wasSaved) setWasSaved(false);
    return cardId ?? crypto.randomUUID();
  }, [cardId, wasSaved]);
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
    if (cardId) {
      dispatch(updateCard({ id: cardId, changes: values }));
      clearCardId();
    } else {
      dispatch(addCard(values));
    }
    setWasSaved(true);
  }, [cardId, dispatch, clearCardId, values]);
  const cancel = useCallback(() => {
    setValues({
      id,
      name: '',
      cardNumber: '',
      quota: 0,
      balance: 0,
      cutoffDay: 1,
    });
    clearCardId();
  }, [id, clearCardId]);
  return (
    <div className="cardrow">
      <div>{(`${values.id}`).substring(0, 13)}</div>
      <input name="name" value={values.name} onChange={setValue} />
      <input name="cardNumber" value={values.cardNumber} onChange={setValue} />
      <input name="quota" type="number" value={values.quota} onChange={setValue} />
      <input name="balance" type="number" value={values.balance} onChange={setValue} />
      <input name="cutoffDay" type="number" value={values.cutoffDay} onChange={setValue} min={1} max={31} />
      <div>
        <button type="button" onClick={save}>{card?.id ? 'Update' : 'Create'}</button>
        {card?.id ? <button type="button" onClick={cancel}>Cancel</button> : null}
      </div>
    </div>
  );
}

CardForm.defaultProps = {
  cardId: null,
};

export default CardForm;
