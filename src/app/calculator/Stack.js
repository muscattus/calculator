export class Stack {
    constructor() {
        this.stack = [];
    }

        getLength() {
            return this.stack.length;
        };

        getLast() {
            return this.stack[this.getLength() - 1];
        };

        add(something) {
            this.stack.push(something);
        };

        pop() {
            return this.stack.pop();
        };
}