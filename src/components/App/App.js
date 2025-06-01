import { useState } from 'react';
import Calculator from '../../calculator/calculator.js';
import Settings from '../Settings/Settings.js';

import { Button, TextField } from '@mui/material';
import logo from '../../resources/logo.svg';
import './App.css';
import { defaultAngleUnit } from '../../settings/angleUnits.js';


function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [angleUnit, setAngleUnit] = useState(defaultAngleUnit);

  const handleCalculate = () => {
    try {
      const calculator = new Calculator(expression, {
        angleUnit: angleUnit
      });
      
      const output = calculator.calculate();
      setResult(`Result: ${output}`);
    } catch (error) {
      setResult('Error: Invalid expression ' + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className ='three-column-grid'>
            <Settings onAngleUnitChange={(value) => setAngleUnit(value)} />
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <TextField
              label="Expression"
              variant="outlined"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              style={{ marginTop: '20px', width: '300px', color: 'white'}}
              sx={ { input: { color: 'white' }, label: { color: 'white' } } }
            />

            <Button variant="contained" color="primary" onClick={handleCalculate} style={{ marginTop: '20px' }}>
              Calculate
            </Button>

            <p style={{ marginTop: '20px', color: 'white' }}>
              {result || 'Output will be displayed here'}
            </p>
          </div>
          <div></div>
        </div>
      </header>
    </div>
  );
}

export default App;