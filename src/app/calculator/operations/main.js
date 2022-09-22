import { Addition } from "./addition";
import { Subtraction } from "./subtraction";
import { Multiplication } from "./multiplicatios";
import { Power } from "./power";

console.log(Addition);

export const operations = {
    '+': Addition,
    '-': Subtraction,
    '*': Multiplication,
    '^': Power
}

export const operators = ['+', '-', '*', '^'];

