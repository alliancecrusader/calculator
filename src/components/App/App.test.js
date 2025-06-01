import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Expression/i);
    expect(inputElement).toBeInTheDocument();
    
    const buttonElement = screen.getByRole('button', { name: /Calculate/i });
    expect(buttonElement).toBeInTheDocument();
    
    const outputElement = screen.getByText(/Output will be displayed here/i);
    expect(outputElement).toBeInTheDocument();
});