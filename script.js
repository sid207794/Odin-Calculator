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

let num1;
let operator;
let num2;

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

/* id = head */

const headButton = document.querySelectorAll(".headButton");

for (const headButt of headButton) {
    headButt.addEventListener("mouseenter", () => {
        headButt.style.backgroundColor = "rgba(255, 255, 255, 0.1";
    });

    headButt.addEventListener("mouseleave", () => {
        headButt.style.backgroundColor = "transparent";
    });
}

/* id = container */

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

for (i=1; i<=20; i++) {
    if (i === 1 || i === 2 || i === 3) {
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("mouseenter", () => {
            press.style.backgroundColor = "rgba(255, 255, 255, 0.17)";
            press.style.height = "60px";
            press.style.fontSize = `${(60/68)*20}px`;
        });

        press.addEventListener("mouseleave", () => {
            press.style.backgroundColor = "rgb(25, 26, 25)";
            press.style.height = "68px";
            press.style.fontSize = "20px";
        });
    } else if (i%4 === 0 && i<20 && i>0) {
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("mouseenter", () => {
            press.style.backgroundColor = "rgba(255, 255, 255, 0.17)";
            press.style.height = "60px";
            press.style.fontSize = `${(60/68)*38}px`;
        });

        press.addEventListener("mouseleave", () => {
            press.style.backgroundColor = "rgb(25, 26, 25)";
            press.style.height = "68px";
            press.style.fontSize = "38px";
        });
    } else if (i === 20) {
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("mouseenter", () => {
            press.style.backgroundColor = "rgba(255, 70, 0, 0.85)";
            press.style.height = "60px";
            press.style.fontSize = `${(60/68)*40}px`;
        });

        press.addEventListener("mouseleave", () => {
            press.style.backgroundColor = "rgb(255, 70, 0)";
            press.style.height = "68px";
            press.style.fontSize = "40px";
        });
    } else {
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("mouseenter", () => {
            press.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
            press.style.height = "60px";
            press.style.fontSize = `${(60/68)*30}px`;
        });

        press.addEventListener("mouseleave", () => {
            press.style.backgroundColor = "rgb(39, 40, 39)";
            press.style.height = "68px";
            press.style.fontSize = "30px";
        });
    }
}

/* id = display */

const display = document.querySelector("#display");

let arrayDisplay = [];

for (i=1; i<=20; i++) {
    if (i === 1) {
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("click", () => {
            display.replaceChildren();
            arrayDisplay.length = 0;
        });
    } else if (i === 3) {
        const press = document.querySelector(`#press${i}`);

        press.addEventListener("click", () => {
            display.removeChild(display.lastElementChild);
            arrayDisplay.pop();
        });
    } else if (i === 20) {
        display.replaceChildren();
    } else if (i === 12) {
        const press = document.querySelector(`#press${i}`);
        
        press.addEventListener("click", () => {
            if (typeof arrayDisplay[arrayDisplay.length-1] === "number") {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
            } else if (arrayDisplay.length === 0) {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string") {
                display.removeChild(display.lastElementChild);
                arrayDisplay.pop();
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
            }
        });
    } else if (i === 2 || (i%4 === 0 && i < 20 && i != 12)) {
        const press = document.querySelector(`#press${i}`);
        
        press.addEventListener("click", () => {
            if (typeof arrayDisplay[arrayDisplay.length-1] === "number") {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay.length > 1) {
                display.removeChild(display.lastElementChild);
                arrayDisplay.pop();
                const pressText = press.textContent;
                arrayDisplay.push(pressText);
                
                const displayElement = document.createElement("div");
                displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
                display.appendChild(displayElement);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay.length === 1) {
                display.replaceChildren();
                arrayDisplay.length = 0;
            }
        });
    } else if (i === 17) {
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
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay[arrayDisplay.length-1] != ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
            } else if (arrayDisplay.length === 0) {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
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
            }
        });
    } else if (i === 18) {
        const press = document.querySelector(`#press${i}`);
    
        press.addEventListener("click", () => {
            if (arrayDisplay.length === 1 && arrayDisplay[0] != 0 && typeof arrayDisplay[0] != "string") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "string" && arrayDisplay[arrayDisplay.length-1] != ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
            } else if (arrayDisplay.length === 0) {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));
                
                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
            } else if (arrayDisplay.length > 1 && typeof arrayDisplay[arrayDisplay.length-2] != "string") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
            } else if (arrayDisplay.length > 1 && typeof arrayDisplay[arrayDisplay.length-2] === "string" && arrayDisplay[arrayDisplay.length-1] != 0) {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
            } else if (arrayDisplay.length > 1 && arrayDisplay[arrayDisplay.length-2] === ".") {
                const pressText = press.textContent;
                arrayDisplay.push(parseInt(pressText));

                const displayElement = document.createElement("div");
                displayElement.textContent = "0";
                display.appendChild(displayElement);
            }
        });
    } else if (i === 19) {
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
            } else if (arrayDisplay.length >= 1 && (!arrayDisplay.includes("."))) {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);

                const displayElement = document.createElement("div");
                displayElement.textContent = ".";
                display.appendChild(displayElement);
            } else if (typeof arrayDisplay[arrayDisplay.length-1] === "number" && (!arrayDisplay.includes("."))) {
                const pressText = press.textContent;
                arrayDisplay.push(pressText);

                const displayElement = document.createElement("div");
                displayElement.textContent = ".";
                display.appendChild(displayElement);
            }
        });
    } else {
        const press = document.querySelector(`#press${i}`);
    
        press.addEventListener("click", () => {
            const pressText = press.textContent;
            arrayDisplay.push(parseInt(pressText));

            const displayElement = document.createElement("div");
            displayElement.textContent = arrayDisplay[arrayDisplay.length-1];
            display.appendChild(displayElement);
        });
    }
}

/* Calculation */
console.log(arrayDisplay);