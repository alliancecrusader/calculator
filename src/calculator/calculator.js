import Evaluator from "./compiler/evaluator";
import Parser from "./compiler/parser";
import Lexer from "./compiler/lexer";

class Calculator {
    constructor(input) {
        this.lexer = new Lexer(input);
        this.parser = null;
        this.evaluator = new Evaluator();
    }

    calculate() {
        let tokens = [];

        try {
            tokens = this.lexer.lex();
        }
        catch (error) {
            console.error("Error during lexing:", error);
            throw error;
        }

        console.log("Tokens:", tokens);

        this.parser = new Parser(tokens);
        let ast;
        try {
            ast = this.parser.parse();
        }
        catch (error) {
            console.error("Error during parsing:", error);
            throw error;
        }

        console.log("AST:", ast);

        let result;

        try {
            result = this.evaluator.evaluate(ast);
        }
        catch (error) {
            console.error("Error during evaluation:", error);
            throw error;
        }

        return result;
    }
}

export default Calculator;