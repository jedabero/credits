import {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { selectMovementById, addMovement, updateMovement } from '../reducers/movements';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Movement } from '../models/Movement';

type MovementFormProps = {
  cardId: EntityId,
  movementId?: EntityId,
  clearMovementId: () => void,
};

function MovementForm({ movementId, cardId, clearMovementId }: MovementFormProps) {
  const dispatch = useAppDispatch();
  const [wasSaved, setWasSaved] = useState(false);
  const id = useMemo(() => {
    if (wasSaved) setWasSaved(false);
    return movementId ?? crypto.randomUUID();
  }, [wasSaved, movementId]);
  const movement = useAppSelector((state) => selectMovementById(state, id));
  const [values, setValues] = useState<Movement>({
    id,
    cardId: movement?.cardId ?? cardId,
    authNumber: movement?.authNumber ?? '',
    date: movement?.date ?? format(new Date(), 'yyyy-MM-dd'),
    description: movement?.description ?? '',
    value: movement?.value ?? 1,
    monthlyRate: movement?.monthlyRate ?? 0,
    yearlyRate: movement?.yearlyRate ?? 0,
    quotas: movement?.quotas ?? 1,
  });
  useEffect(() => {
    setValues({
      id,
      cardId: movement?.cardId ?? cardId,
      authNumber: movement?.authNumber ?? '',
      date: movement?.date ?? format(new Date(), 'yyyy-MM-dd'),
      description: movement?.description ?? '',
      value: movement?.value ?? 1,
      monthlyRate: movement?.monthlyRate ?? 0,
      yearlyRate: movement?.yearlyRate ?? 0,
      quotas: movement?.quotas ?? 1,
    });
  }, [id, cardId, movement]);
  const setValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement & { name: keyof Movement }>) => {
      const { name, value } = event.target;
      const valueType = typeof values[name];
      if (valueType === 'number' && Number.isNaN(parseInt(value, 10))) return;
      let parsedValue: string | Date | number = value;
      if (valueType === 'number') {
        if (['monthlyRate', 'yearlyRate'].includes(name)) {
          parsedValue = parseFloat(value);
        } else {
          parsedValue = parseInt(value, 10);
        }
      }
      setValues((oldValues: Movement) => ({
        ...oldValues,
        [name]: parsedValue,
      }));
    },
    [values, setValues],
  );
  const save = useCallback(() => {
    if (movementId) {
      dispatch(updateMovement({ id: movementId, changes: values }));
      clearMovementId();
    } else {
      dispatch(addMovement(values));
    }
    setWasSaved(true);
  }, [movementId, dispatch, clearMovementId, values]);
  const cancel = useCallback(() => {
    setValues({
      id,
      cardId,
      authNumber: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
      value: 1,
      monthlyRate: 0,
      yearlyRate: 0,
      quotas: 1,
    });
    clearMovementId();
  }, [id, cardId, clearMovementId]);
  return (
    <div className="movementrow">
      <div>{(`${values.id}`).substring(0, 13)}</div>
      <input name="authNumber" value={values.authNumber} onChange={setValue} />
      <input name="date" type="date" value={values.date} onChange={setValue} />
      <input name="description" value={values.description} onChange={setValue} />
      <input name="value" type="number" value={values.value} onChange={setValue} min={1} />
      <input name="monthlyRate" type="number" value={values.monthlyRate} onChange={setValue} />
      <input name="yearlyRate" type="number" value={values.yearlyRate} onChange={setValue} />
      <input name="quotas" type="number" value={values.quotas} onChange={setValue} min={1} />
      <div>
        <button type="button" onClick={save}>{movementId ? 'Update' : 'Create'}</button>
        {movementId ? <button type="button" onClick={cancel}>Cancel</button> : null}
      </div>
    </div>
  );
}

MovementForm.defaultProps = {
  movementId: null,
};

export default MovementForm;
