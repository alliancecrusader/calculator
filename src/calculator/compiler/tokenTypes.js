export const tokenTypes = {
    NUMBER: 'NUMBER',
    ARITHMETIC_OPERATOR: 'ARITHMETIC_OPERATOR',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
    EOF: 'EOF'
};

export const arithmeticOperators = {
    '+': {
        type: 'BINARY_PLUS',
        transform(left, right) {
            return left + right; // Addition
        }
    },
    '-': {
        type: 'BINARY_MINUS',
        transform(left, right) {
            return left - right; // Subtraction
        }
    },
    '*': {
        type: 'BINARY_MULTIPLY',
        transform(left, right) {
            return left * right; // Multiplication
        }
    },
    '/': {
        type: 'BINARY_DIVIDE',
        transform(left, right) {
            if (right === 0) {
                throw new Error('Division by zero');
            }
            return left / right; // Division
        }
    }
}

export const unaryOperators = {
    '+': {
        type: 'UNARY_PLUS',
        transform(value) {
            return value; // Unary plus does not change the value
        }
    },
    '-': {
        type: 'UNARY_MINUS',
        transform(value) {
            return -value; // Unary minus negates the value
        }
    }
};