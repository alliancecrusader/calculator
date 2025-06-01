import Calculator from '../calculator';

describe('Calculator', () => {
    test('adds two numbers', () => {
        const calc = new Calculator('2+3');
        expect(calc.calculate()).toBe(5);
    });

    test('subtracts two numbers', () => {
        const calc = new Calculator('7-4');
        expect(calc.calculate()).toBe(3);
    });

    test('multiplies two numbers', () => {
        const calc = new Calculator('6*3');
        expect(calc.calculate()).toBe(18);
    });

    test('divides two numbers', () => {
        const calc = new Calculator('8/2');
        expect(calc.calculate()).toBe(4);
    });

    test('handles operator precedence', () => {
        const calc = new Calculator('2+3*4');
        expect(calc.calculate()).toBe(14);
    });

    test('handles parentheses', () => {
        const calc = new Calculator('(2+3)*4');
        expect(calc.calculate()).toBe(20);
    });

    test('handles unary minus', () => {
        const calc = new Calculator('-5+2');
        expect(calc.calculate()).toBe(-3);
    });

    test('handles unary plus', () => {
        const calc = new Calculator('+-5');
        expect(calc.calculate()).toBe(-5);
    });

    test('throws on division by zero', () => {
        const calc = new Calculator('5/0');
        expect(() => calc.calculate()).toThrow('Division by zero');
    });

    test('throws on invalid input', () => {
        const calc = new Calculator('asdfasda');
        expect(() => calc.calculate()).toThrow();
    });
});