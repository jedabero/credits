import { useCallback } from 'react';
import './App.css';
import { addCard, removeCard, selectAllCreditCards } from './reducers/creditCards';
import { useAppDispatch, useAppSelector } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  const handleAdd = useCallback(() => dispatch(addCard({
    id: 1,
    name: 'test',
    quota: 24633,
    balance: 0,
    cutoffDay: 15,
    cardNumber: '***465',
  })), [dispatch]);
  const cards = useAppSelector(selectAllCreditCards);
  const handleDelete = useCallback(() => dispatch(removeCard(1)), [dispatch]);

  return (
    <div className="App">
      <main>
        <h6>Tasks</h6>
        <p>Definir Credito</p>
        <p>Definir Movimiento</p>
        <p>Ver valores detallados del mes y de cada movimiento</p>
        <p>{JSON.stringify(cards)}</p>
        <button type="button" onClick={handleAdd}>Add Credit Card</button>
        <button type="button" onClick={handleDelete}>Delete Credit Card</button>
      </main>
    </div>
  );
}

export default App;
