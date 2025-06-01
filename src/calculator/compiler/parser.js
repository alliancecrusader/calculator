import { tokenTypes, unaryOperators } from './tokenTypes.js';
import nodeTypes from './nodeTypes.js';

class ParserBase {
    constructor(tokens) {
        this.tokens = tokens;
        this.ast = [];
        this.position = 0;
        this.currentToken = this.tokens[this.position];
    }

    peek() {
        if (this.position + 1 < this.tokens.length) {
            return this.tokens[this.position + 1];
        }
        return null;
    }

    advance() {
        if (this.currentToken === null) {
            return;
        }

        this.position++;

        if (this.position < this.tokens.length) {
            this.currentToken = this.tokens[this.position];
        } else {
            this.currentToken = null;
        }
    }

    expect (expectedType, expectedValue = null) {
        if (this.currentToken === null || this.currentToken.type === tokenTypes.EOF) {
            throw new Error('Unexpected end of input');
        }

        if (this.currentToken.type !== expectedType) {
           throw new Error(`Expected token type ${expectedType}, but got ${this.currentToken.type} at position ${this.currentToken.position}`);
        }

        if (expectedValue !== null && this.currentToken.value !== expectedValue) {
            throw new Error(`Expected token value ${expectedValue}, but got ${this.currentToken.value}`);
        }

        this.advance();
    }
}

class Parser extends ParserBase {
    constructor(tokens) {
        super(tokens);
    }

    // 1 -> term -> factor -> number, advance
    // enter while loop
    // const operator = +
    // advance
    // const right = factor


    // Parses an expression, which can be a series of terms combined with addition or subtraction.
    expression() {
        let left = this.term();
        console.log("left", left);
        console.log("currentToken", this.currentToken);

        while (this.currentToken && (this.currentToken.type === tokenTypes.ARITHMETIC_OPERATOR && (this.currentToken.value === '+' || this.currentToken.value === '-'))) {
            const operator = this.currentToken.value;
            this.advance();
            console.log("operator", operator);
            const right = this.term();

            left = {
                type: nodeTypes.BINARY_OPERATOR,
                operator: operator,
                left: left,
                right: right
            };
        }   

        return left;
    }

    // Parses a term, which can be a series of factors combined with multiplication or division.
    term () {
        let left = this.factor();

        while (this.currentToken && (this.currentToken.type === tokenTypes.ARITHMETIC_OPERATOR && (this.currentToken.value === '*' || this.currentToken.value === '/'))) {
            const operator = this.currentToken.value;
            this.advance();
            const right = this.factor();

            left = {
                type: nodeTypes.BINARY_OPERATOR,
                operator: operator,
                left: left,
                right: right
            };
        }

        return left;
    }

    // Parses a factor, which can be a number, a unary operation, or a parenthesized expression.
    factor() {
        const token = this.currentToken;

        console.log("factor token", token);

        if (token.type === tokenTypes.NUMBER) {
            this.advance();

            return {
                type: 'NUMBER',
                value: token.value,
                position: token.position
            };
        } else if (token.type === tokenTypes.ARITHMETIC_OPERATOR && unaryOperators[token.value]) {
            this.advance();
            const right = this.factor();

            if (right === null) {
                throw new Error(`Expected a factor after unary operator at position ${token.position}`);
            }

            return {
                type: nodeTypes.UNARY_OPERATOR,
                operator: token.value,
                right: right
            };
        } else if (token.type === tokenTypes.LPAREN) {
            this.advance();
            const expr = this.expression();
            this.expect(tokenTypes.RPAREN);
            
            return expr;
        } else {
            throw new Error(`Unexpected token type ${token.type} at position ${token.position} with value ${token.value}`);
        }
    }

    // Parses the entire input and returns the AST.
    parse() {
        this.ast = [];
        this.position = 0;
        this.currentToken = this.tokens[this.position];

        const expr = this.expression();

        return expr;
    }
}

export default Parser;