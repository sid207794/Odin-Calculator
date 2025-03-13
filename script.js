// Functions to perform operations
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

const percent = function (a, b) {
    return (a/100)*b;
}

// Variables to store initial values
let num1 = "";
let operator = "";
let num2 = "";

// Function to return operation results
const operate = function (a, b, c) {
    if (b === "+") {
        return add(a, c);
    } else if (b === "-") {
        return sub(a, c);
    } else if (b === "×") {
        return multiply(a, c);
    } else if (b === "÷") {
        return divide(a, c);
    } else if (b === "%") {
        return percent(a, c);
    }
};

// DOM style for creating child elements of id = "container"
const container = document.querySelector("#container");

const array = ["AC", "%", "⌫", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "00", "0", ".", "="];

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

const display = document.querySelector("#display");
const result = document.querySelector("#result");

// Variables to store values of num1, operator and num2 before "merged = true"
let premergeNum1 = "";
let premergeOperator = "";
let premergeNum2 = "";

let arrayDisplay = [];

/* Add event listeners to add "textContent" of each child element of element with id = "container"
into element with id = "display" and as seperate indices in "arrayDisplay" */
for (i=1; i<=20; i++) {
    if (i === 1) { // AC button
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("click", () => {
            display.style.fontSize = `${40}px`;
            result.style.fontSize = `${22}px`;
            result.style.color = "rgb(145, 145, 145)";
            display.style.color = "rgb(240, 240, 240)";

            display.replaceChildren();
            result.replaceChildren();
            arrayDisplay.length = 0;
            num1 = "";
            operator = "";
            num2 = "";
            changeToNum2 = false;
            firstOpFound = false;
        });
    } else if (i === 3) { // Backspace button
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("click", () => {
            display.style.fontSize = `${40}px`;
            result.style.fontSize = `${22}px`;
            result.style.color = "rgb(145, 145, 145)";
            display.style.color = "rgb(240, 240, 240)";

            if (arrayDisplay.length > 0) {
                display.removeChild(display.lastElementChild);
                arrayDisplay.pop();
                
                if (merged && operator.length === 0 && num2.length === 0) {
                    num1 = premergeNum1;
                    operator = premergeOperator;
                    num2 = premergeNum2;
                    merged = false;
                    
                    changeToNum2 = true;
                    firstOpFound = true;
                    
                    if (num2.length > 0) {
                        num2 = num2.slice(0, -1);
                    } else if (operator.length > 0) {
                        operator = operator.slice(0, -1);
                        if (operator.length === 0) {
                            firstOpFound = false;
                            changeToNum2 = false;
                        }
                    }
                } else if (num2.length > 0) {
                    num2 = num2.slice(0, -1);
                } else if (operator.length > 0) {
                    operator = operator.slice(0, -1);
                    if (operator.length === 0) {
                        firstOpFound = false;
                        changeToNum2 = false;
                    }
                } else if (num1.length > 0) {
                    num1 = num1.slice(0, -1);
                }
        
                console.log(`num1: ${num1}, operator: ${operator}, num2: ${num2}`);
                console.log(`changeToNum2: ${changeToNum2}, firstOpFound: ${firstOpFound}, merged: ${merged}`);
                
                if ((num1 === "" || num1 === "-") && operator === "" && num2 === "") {
                    result.replaceChildren();
                    resultText = "";
                } else if (operator === "" || num2 === "") {
                    const displayResult = document.createElement("div");
                    result.replaceChildren();
                    resultText = Number(num1);
                    if (Number.isInteger(resultText)) {
                        displayResult.textContent = resultText;
                        result.appendChild(displayResult);
                    } else {
                        displayResult.textContent = resultText.toFixed(2);
                        result.appendChild(displayResult);
                    }
                } else {
                    const displayResult = document.createElement("div");
                    result.replaceChildren();
                    resultText = operate(Number(num1) || 0, operator, Number(num2) || 0);
                    if (Number.isInteger(resultText)) {
                        displayResult.textContent = resultText;
                        result.appendChild(displayResult);
                    } else {
                        displayResult.textContent = resultText.toFixed(2);
                        result.appendChild(displayResult);
                    }
                }
            }
        });
    } else if (i === 20) { // Equals button
        const press = document.querySelector(`#press${i}`);
        
        press.addEventListener("click", () => {
            display.style.fontSize = `${22}px`;
            result.style.fontSize = `${40}px`;
            display.style.color = "rgb(145, 145, 145)";
            result.style.color = "rgb(240, 240, 240)";
        });
    } else if (i === 12) { // Subtraction operator button
        const press = document.querySelector(`#press${i}`);
        
        press.addEventListener("click", () => {
            if (typeof arrayDisplay[arrayDisplay.length-1] === "number") {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length === 0) {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay[arrayDisplay.length-1] === "." && arrayDisplay.length > 1) {
                display.removeChild(display.lastElementChild);
                arrayDisplay.pop();
                
                if (operator.length > 0 && !firstOpFound) {
                    operator = operator.slice(0, -1);
                    if (operator.length === 0) {
                        changeToNum2 = false;
                    }
                } else if (operator.length > 0 && firstOpFound) {
                    if (operator.length === 0) {
                        firstOpFound = true;
                    }
                }

                if (!changeToNum2 && !firstOpFound) {
                    num1 = num1.slice(0, -1);
                }
                if (changeToNum2 && firstOpFound && num2.length > 0) {
                    num2 = num2.slice(0, -1);
                }

                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay.length > 1) {
                display.removeChild(display.lastElementChild);
                arrayDisplay.pop();
                if (operator.length > 0) {
                    operator = operator.slice(0, -1);
                    if (operator.length === 0) {
                        changeToNum2 = false;
                        firstOpFound = false;
                    }
                }

                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            }
        });
    } else if (i === 2 || (i%4 === 0 && i < 20 && i != 12)) { // Percentage, Division, Multiplication and Addition operator button
        const press = document.querySelector(`#press${i}`);
        
        press.addEventListener("click", () => {
            if (typeof arrayDisplay[arrayDisplay.length-1] === "number") {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay[arrayDisplay.length-1] === "." && arrayDisplay.length > 1) {
                display.removeChild(display.lastElementChild);
                arrayDisplay.pop();

                if (operator.length > 0 && !firstOpFound) {
                    operator = operator.slice(0, -1);
                    if (operator.length === 0) {
                        changeToNum2 = false;
                    }
                } else if (operator.length > 0 && firstOpFound) {
                    if (operator.length === 0) {
                        firstOpFound = true;
                    }
                }

                if (!changeToNum2 && !firstOpFound) {
                    num1 = num1.slice(0, -1);
                }
                if (changeToNum2 && firstOpFound && num2.length > 0) {
                    num2 = num2.slice(0, -1);
                }

                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay.length > 1) {
                display.removeChild(display.lastElementChild);
                arrayDisplay.pop();
                if (operator.length > 0) {
                    operator = operator.slice(0, -1);
                    if (operator.length === 0) {
                        changeToNum2 = false;
                        firstOpFound = false;
                    }
                }
                
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay.length === 1) {
                display.replaceChildren();
                arrayDisplay.length = 0;
                Calculation(arrayDisplay);
            }
        });
    } else if (i === 17) { // Double zero button
        const press = document.querySelector(`#press${i}`);
    
        press.addEventListener("click", () => {
            if (arrayDisplay.length === 1 && arrayDisplay[0] != 0 && typeof arrayDisplay[0] != "string") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);

                const displayElement2 = document.createElement("div");
                displayElement2.textContent = "0";
                display.appendChild(displayElement2);
                Calculation(arrayDisplay);
                Calculation(arrayDisplay);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay[arrayDisplay.length-1] != ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length === 0) {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length > 1 && typeof arrayDisplay[arrayDisplay.length-2] != "string") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);

                const displayElement2 = document.createElement("div");
                displayElement2.textContent = "0";
                display.appendChild(displayElement2);
                Calculation(arrayDisplay);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length > 1 && typeof arrayDisplay[arrayDisplay.length-2] === "string" && arrayDisplay[arrayDisplay.length-1] != 0) {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);

                const displayElement2 = document.createElement("div");
                displayElement2.textContent = "0";
                display.appendChild(displayElement2);
                Calculation(arrayDisplay);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length > 1 && arrayDisplay[arrayDisplay.length-2] === ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);

                const displayElement2 = document.createElement("div");
                displayElement2.textContent = "0";
                display.appendChild(displayElement2);
                Calculation(arrayDisplay);
                Calculation(arrayDisplay);
            }
        });
    } else if (i === 18) { // Single zero button
        const press = document.querySelector(`#press${i}`);
    
        press.addEventListener("click", () => {
            if (arrayDisplay.length === 1 && arrayDisplay[0] != 0 && typeof arrayDisplay[0] != "string") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay[arrayDisplay.length-1] != ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length === 0) {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length > 1 && typeof arrayDisplay[arrayDisplay.length-2] != "string") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length > 1 && typeof arrayDisplay[arrayDisplay.length-2] === "string" && arrayDisplay[arrayDisplay.length-1] != 0) {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else if (arrayDisplay.length > 1 && arrayDisplay[arrayDisplay.length-2] === ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            }
        });
    } else if (i === 19) { // Decimal button
        const press = document.querySelector(`#press${i}`);
    
        press.addEventListener("click", () => {
            if (typeof arrayDisplay[arrayDisplay.length-1] != "number" && arrayDisplay[arrayDisplay.length-1] != ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt("0"));
                arrayDisplay.push(pressText);

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);

                const displayElement2 = document.createElement("div");
                displayElement2.textContent = ".";
                display.appendChild(displayElement2);
                Calculation(arrayDisplay);
            } else if (!arrayDisplay.includes(".") || isNaN(arrayDisplay[arrayDisplay.length-1])) {
                const pressText = press.textContent;
                
                let hasDecimal = false;
                for (i = arrayDisplay.length-1; i>=0; i--) {
                    if (isNaN(arrayDisplay[i]) && arrayDisplay[i] !== ".") {
                        break;
                    }

                    if (arrayDisplay[i] === ".") {
                        hasDecimal = true;
                        break;
                    }
                }

                if (!hasDecimal) {
                    arrayDisplay.push(pressText);
                    const displayElement = document.createElement("div");
                    displayElement.textContent = ".";
                    display.appendChild(displayElement);
                    Calculation(arrayDisplay);
                }
            } else if (arrayDisplay.includes(".") && !isNaN(arrayDisplay[arrayDisplay.length-1])) {
                const pressText = press.textContent;
                
                let hasDecimal = false;
                for (i = arrayDisplay.length-1; i>=0; i--) {
                    if (isNaN(arrayDisplay[i]) && arrayDisplay[i] !== ".") {
                        break;
                    }

                    if (arrayDisplay[i] === ".") {
                        hasDecimal = true;
                        break;
                    }
                }

                if (!hasDecimal) {
                    arrayDisplay.push(pressText);
                    const displayElement = document.createElement("div");
                    displayElement.textContent = ".";
                    display.appendChild(displayElement);
                    Calculation(arrayDisplay);
                }
            }
        });
    } else { // All number buttons
        const press = document.querySelector(`#press${i}`);
    
        press.addEventListener("click", () => {
            if (display.style.fontSize === `${22}px`&& result.style.fontSize === `${40}px` && display.style.color === "rgb(145, 145, 145)" && result.style.color === "rgb(240, 240, 240)") {
                display.style.fontSize = `${40}px`;
                result.style.fontSize = `${22}px`;
                result.style.color = "rgb(145, 145, 145)";
                display.style.color = "rgb(240, 240, 240)";

                display.replaceChildren();
                result.replaceChildren();
                arrayDisplay.length = 0;
                num1 = "";
                operator = "";
                num2 = "";
                changeToNum2 = false;
                firstOpFound = false;

                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            } else {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
                Calculation(arrayDisplay);
            }
        });
    }
}

let changeToNum2 = false;
let firstOpFound = false;
let merged = false;

console.log(arrayDisplay);

/* Function to merge each index of "arrayDisplay" with a number or decimal element into one string while seperating the operators
between each two group of numbers and storing their values in seperate variable defined further above. After getting result of an
operation assign the result as num1 and store premerged values of these variables into new seperate varaibles */
function Calculation(calArray) {
    let currentvalue = calArray[calArray.length-1];
    let lastValue = calArray[calArray.length-2];

    if (currentvalue === "." && lastValue === 0 && num1.length === 0 && !changeToNum2) {
        num1 += "0" + currentvalue;
    } else if (currentvalue === "." && num1.length > 0 && !changeToNum2) {
        num1 += currentvalue;
    } else if ((typeof currentvalue === "number" || currentvalue === ".") && !changeToNum2) {
        num1 += currentvalue;
    } else if (currentvalue === "." && lastValue === 0 && num2.length === 0 && changeToNum2) {
        num2 += "0" + currentvalue;
    } else if (currentvalue === "." && num2.length > 0 && !changeToNum2) {
        num2 += currentvalue;
    } else if ((typeof currentvalue === "number" || currentvalue === ".") && changeToNum2) {
        num2 += currentvalue;
    } else if (isNaN(currentvalue) && currentvalue !== ".") {
        if (calArray[calArray.length-1] === "-" && calArray.length === 1) {
            num1 += calArray[calArray.length-1];
        } else if (!changeToNum2 && !firstOpFound) {
            operator += currentvalue;
            changeToNum2 = true;
            firstOpFound = true;
        } else if (firstOpFound) {
            premergeNum1 = num1;
            premergeOperator = operator;
            premergeNum2 = num2;

            num1 = resultText;
            operator = currentvalue;
            num2 = "";
            merged = true;
        }
    }

    console.log(`num1: ${num1}, operator: ${operator}, num2: ${num2}`);
    console.log(operate(Number(num1), operator, Number(num2)));

    const displayResult = document.createElement("div");

    result.replaceChildren();
    resultText = operate(Number(num1), operator, Number(num2));
    if (Number.isInteger(resultText)) {
        displayResult.textContent = resultText;
        result.appendChild(displayResult);
    } else {
        displayResult.textContent = resultText.toFixed(2);
        result.appendChild(displayResult);
    }
};