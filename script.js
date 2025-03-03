const add = function (a, b) {
    return a+b;
};

const sub = function (a, b) {
    return a-b;
};

const multiply = function (a, b) {
    return a*b;
};

const divide = function (a, b) {
    return a/b;
};

let numberOne;
let operator;
let numberTwo;

const operate = function (a, b, c) {
    if (b === "+") {
        return add(a, c);
    } else if (b === "-") {
        return sub(a, c);
    } else if (b === "*") {
        return multiply(a, c);
    } else if (b === "/") {
        return divide(a, c);
    }
};

const container = document.querySelector("#container");
const array = ["AC", "%", "⌫", "÷", "7", "8", "9", "×", "4", "5", "6", "–", "1", "2", "3", "+", "00", "0", ".", "="];
for (i=0; i<20; i++) {
    const element = document.createElement("div");
    element.setAttribute("id", `key${i+1}`);
    element.style.height = `${400/5}px`;
    element.style.width = `${350/4}px`;
    container.appendChild(element);

    const key = document.querySelector(`#key${i+1}`);

    const button = document.createElement("button");
    button.setAttribute("id", `press${i+1}`);
    button.textContent = array[i];
    key.appendChild(button);
}