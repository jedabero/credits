import Cards from './containers/Cards';

import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <h6>Tasks</h6>
        <p>Definir Credito</p>
        <p>Definir Movimiento</p>
        <p>Ver valores detallados del mes y de cada movimiento</p>
      </main>
      <Cards />
    </div>
  );
}

export default App;
