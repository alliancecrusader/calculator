import Evaluator from "./evaluator";
import Parser from "./compiler/parser";
import Lexer from "./compiler/lexer";
import { defaultAngleUnit } from "../settings/angleUnits";

class Calculator {
    constructor(input, options = { angleUnit: defaultAngleUnit }) {
        if (typeof input !== 'string') {
            throw new Error("Input must be a string");
        }

        if (input.trim() === '') {
            throw new Error("Input cannot be an empty string");
        }

        this._lexer = new Lexer(input);
        this._parser = null;
        this._evaluator = new Evaluator(options);
    }

    calculate() {
        let tokens = [];

        try {
            tokens = this._lexer.lex();
        }
        catch (error) {
            console.error("Error during lexing:", error);
            throw error;
        }

        console.log("Tokens:", tokens);

        this._parser = new Parser(tokens);
        let ast;

        try {
            ast = this._parser.parse();
        }
        catch (error) {
            console.error("Error during parsing:", error);
            throw error;
        }

        console.log("AST:", ast);

        let result;

        try {
            result = this._evaluator.evaluate(ast);
        }
        catch (error) {
            console.error("Error during evaluation:", error);
            throw error;
        }

        return result;
    }
}

export default Calculator;