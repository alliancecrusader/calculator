import { tokenTypes, unaryOperators, arithmeticOperators } from "./tokenTypes";
import nodeTypes from "./nodeTypes";

class Evaluator {
    constructor() {
        this.stack = [];
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
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }
}

export default Evaluator;