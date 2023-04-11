import { parse } from 'date-fns'
import './App.css'
import { Movement } from './models/Movement'


function App() {
  const m: Movement = {
    authNumber: '000000',
    date: parse('12/12/2022', 'dd/MM/yyyy', new Date()),
    description: 'AMPLIACION DE PLAZO',
    value: 32_863_267.45,
    monthlyRate: 2.9237,
    yearlyRate: 41.3138,
    quotas: 48
  };
  
  
  return (
    <div className="App">
      <main>
        <h6>Tasks</h6>
        <p>Definir Credito</p>
        <p>Definir Movimiento</p>
        <p>Ver valores detallados del mes y de cada movimiento</p>
      </main>

    </div>
  )
}

export default App
