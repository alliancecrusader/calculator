import { tokenTypes } from "./tokenTypes";

class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.current = this.input[this.position];
    }

    peek() {
        if (this.position + 1 < this.input.length) {
            return this.input[this.position + 1];
        }

        return null;
    }

    advance() {
        if (this.current === null) {
            return;
        }

        this.position++;

        if (this.position < this.input.length) {
            this.current = this.input[this.position];
        } else {
            this.current = null;
        }
    }

    lex() {
        const tokens = [];

        while (this.current !== null) {
            if (/\s/.test(this.current)) {
                this.advance();
                continue;
            }

            if (/\d/.test(this.current)) {
                let number = '';
                let dotSeen = false;

                if (this.current === '.') {
                    throw new Error('Invalid number format: starts with a dot');
                }

                while (this.current !== null && /[\d.]/.test(this.current)) {
                    if (this.current === '.') {
                        if (dotSeen) {
                            throw new Error('Invalid number format: multiple dots');
                        }
                        dotSeen = true;
                    }

                    number += this.current;
                    this.advance();
                }

                tokens.push({
                    type: tokenTypes.NUMBER,
                    value: parseFloat(number),
                    position: this.position - number.length
                });
                continue;
            }

            if ('+-*/'.includes(this.current)) {
                tokens.push({
                    type: tokenTypes.ARITHMETIC_OPERATOR,
                    value: this.current,
                    position: this.position
                });
                this.advance();
                continue;
            }

            if (this.current === '(') {
                tokens.push({
                    type: tokenTypes.LPAREN,
                    value: '(',
                    position: this.position
                });
                this.advance();
                continue;
            }

            if (this.current === ')') {
                tokens.push({
                    type: tokenTypes.RPAREN,
                    value: ')',
                    position: this.position
                });
                this.advance();
                continue;
            }

            throw new Error(`Unexpected character: ${this.current}`);
        }

        tokens.push({ type: tokenTypes.EOF });

        return tokens;
    }
}

export default Lexer;