import { useState } from 'react';
import Calculator from './calculator/calculator.js';

import { Button, TextField } from '@mui/material';
import logo from './logo.svg';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    try {
      const calculator = new Calculator(expression);
      const output = calculator.calculate();
      setResult(`Result: ${output}`);
    } catch (error) {
      setResult('Error: Invalid expression');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <TextField
          label="Expression"
          variant="outlined"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          style={{ marginTop: '20px', width: '300px', color: 'white' }}
        />

        <Button variant="contained" color="primary" onClick={handleCalculate} style={{ marginTop: '20px' }}>
          Calculate
        </Button>

        <p style={{ marginTop: '20px', color: 'white' }}>
          {result || 'Output will be displayed here'}
        </p>
      </header>
    </div>
  );
}

export default App;