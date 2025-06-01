import { unaryOperators, arithmeticOperators, functions, trigonometricFunctions } from "./compiler/tokenTypes";
import nodeTypes from "./compiler/nodeTypes";
import { defaultAngleUnit } from "../settings/angleUnits";

class Evaluator {
    constructor(options = {}) {
        this.options = options;
    }

    evaluate(node) {
        if (!node) {
            return null;
        }

        console.log("Evaluating node:", node);

        switch (node.type) {
            case nodeTypes.NUMBER:
                return node.value;

            case nodeTypes.BINARY_OPERATOR:
                const leftValue = this.evaluate(node.left);
                const rightValue = this.evaluate(node.right);

                if (arithmeticOperators[node.operator] === undefined) {
                    throw new Error(`Unknown binary operator: ${node.operator}`);
                }

                return arithmeticOperators[node.operator].transform(leftValue, rightValue);
            case nodeTypes.UNARY_OPERATOR:
                const value = this.evaluate(node.right);

                if (unaryOperators[node.operator] === undefined) {
                    throw new Error(`Unknown unary operator: ${node.operator}`);
                }

                return unaryOperators[node.operator].transform(value);
            case nodeTypes.FUNCTION_CALL:
                if (functions[node.function] === undefined) {
                    throw new Error(`Unknown function: ${node.function}`);
                }

                let functionValue = this.evaluate(node.value);

                console.log("Function value:", functionValue);
                console.log(this.options);
                console.log(node.function, trigonometricFunctions[node.function]);

                if (this.options.angleUnit === 'deg' && trigonometricFunctions[node.function]) {
                    functionValue = functionValue * (Math.PI / 180);
                }

                console.log("Transformed function value:", functionValue);

                let result;

                try {
                    result = functions[node.function].transform(functionValue)
                }
                catch (error) {
                    throw new Error(`Error evaluating function ${node.function}: ${error.message}`);
                }

                return result;
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }
}

export default Evaluator;