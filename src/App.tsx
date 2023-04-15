import { parse } from 'date-fns';
import './App.css';
import Movement from './models/Movement';
import { CreditCard } from './models/CreditCard';

function App() {
  const card: CreditCard = {
    quota: 24_633,
    balance: 0,
    cutoffDay: 15,
  };
  const m = new Movement(
    '000000',
    parse('12/12/2022', 'dd/MM/yyyy', new Date()),
    'AMPLIACION DE PLAZO',
    32_863_267.45,
    2.9237,
    41.3138,
    48,
    card,
  );

  // eslint-disable-next-line no-console
  console.log(m.history);

  return (
    <div className="App">
      <main>
        <h6>Tasks</h6>
        <p>Definir Credito</p>
        <p>Definir Movimiento</p>
        <p>Ver valores detallados del mes y de cada movimiento</p>
      </main>

    </div>
  );
}

export default App;
