export class Stack {
    constructor() {
        this.stack = [];
    }

        length() {
            return this.stack.length;
        };

        getLast() {
            return this.stack[this.length() - 1];
        };

        add(something) {
            this.stack.push(something);
        };

        pop() {
            return this.stack.pop();
        };
}