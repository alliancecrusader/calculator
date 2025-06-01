export const tokenTypes = {
    NUMBER: 'NUMBER',
    ARITHMETIC_OPERATOR: 'ARITHMETIC_OPERATOR',
    FUNCTION_CALL: 'FUNCTION_CALL',
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
    },
    '^': {
        type: 'BINARY_POWER',
        transform(left, right) {
            return Math.pow(left, right); // Exponentiation
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

export const identStartRegex = /[a-zA-Z_]/;
export const identPartRegex = /[a-zA-Z0-9_]/;

export const trigonometricFunctions = {
    'sin': true,
    'cos': true,
    'tan': true
};

export const functions = {
    'sin': {
        type: 'FUNCTION_SIN',
        transform(value) {
            return Math.sin(value); // Sine function
        }
    },
    'cos': {
        type: 'FUNCTION_COS',
        transform(value) {
            return Math.cos(value); // Cosine function
        }
    },
    'tan': {
        type: 'FUNCTION_TAN',
        transform(value) {
            return Math.tan(value); // Tangent function
        }
    },
    'sqrt': {
        type: 'FUNCTION_SQRT',
        transform(value) {
            if (value < 0) {
                throw new Error('Square root of negative number');
            }
            return Math.sqrt(value); // Square root function
        }
    }
};