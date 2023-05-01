import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import Cards from './containers/Cards';
import Movements from './containers/Movements';

import './App.css';

function App() {
  const [selectedCardId, setCardId] = useState<EntityId | undefined>();
  const [selectedMovementId, setMovementId] = useState<EntityId | undefined>();

  return (
    <div className="App">
      <main>
        <h6>Tasks</h6>
        <p>Definir Credito</p>
        <p>Definir Movimiento</p>
        <p>Ver valores detallados del mes y de cada movimiento</p>
      </main>
      <Cards onViewCardMovements={setCardId} />
      {selectedCardId
        ? <Movements cardId={selectedCardId} onViewMovementHistory={setMovementId} />
        : null}
      {selectedMovementId}
    </div>
  );
}

export default App;
