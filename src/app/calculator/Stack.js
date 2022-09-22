export function Stack() {
    this.stack = [];

    this.length = function() {
        return this.stack.length;
    };

    this.getLast = function() {
        return this.stack[this.length() - 1];
    };

    this.add = function(something) { //need to change parameter name
        this.stack.push(something);
    }

    this.pop = function() {
        return this.stack.pop();
    }
}