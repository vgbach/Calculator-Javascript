let currentNumber = 0;
let lastNumber = null;
let currentOperation = "";
let ans = undefined; 
let decimalMode = false;
let decimalString = "";

const mainDisplay = document.querySelector("#main-display");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const negateButton = document.querySelector("#negate");
const percentButton = document.querySelector("#percent");
const ansButton = document.querySelector("#ans");
const decimalButton = document.querySelector("#decimal");

let operation = {
    add     : function(firstNum,secondNum) {return firstNum + secondNum},
    subtract: function(firstNum,secondNum) {return firstNum - secondNum},
    multiply: function(firstNum,secondNum) {return firstNum * secondNum},
    divide  : function(firstNum,secondNum) {return firstNum / secondNum},
};

function display(screen,content) {
    screen.textContent = content;
};

function operate(operation,firstNum,secondNum) {
    return operation(firstNum,secondNum);
};

function resetDecimalMode() {
    decimalMode = false;
    decimalString = "";
};

function clear() {
    currentNumber = null;
    lastNumber = null;
    currentOperation = "";
    display(mainDisplay,0);
};

//Given two numbers, find the power of 10 that will make both numbers integers after multiplication
function getPowerOfTen(firstNumber,secondNumber) {
    let n = 0;
    while (!(Number.isInteger(firstNumber)&&Number.isInteger(secondNumber))) {
        firstNumber *= 10;
        secondNumber *= 10;
        n++;
    }
    console.log(firstNumber,secondNumber);
    return n;
};

clearButton.addEventListener("click", function() {
    clear();
    resetDecimalMode();
});

negateButton.addEventListener("click", function() {
    currentNumber *= -1;
    display(mainDisplay,currentNumber);
})

percentButton.addEventListener("click", function() {
    currentNumber /= 100;
    display(mainDisplay,currentNumber);
});

ansButton.addEventListener("click", function() {
    if (currentNumber===null) {
    currentNumber = ans;
    display(mainDisplay,ans);
    }
});

decimalButton.addEventListener("click", function() {
    decimalMode = true;
    decimalString = currentNumber+".";
    display(mainDisplay,decimalString);
});

numberButtons.forEach(button => button.addEventListener("click", function() {
    if (currentNumber===null) {
        currentNumber = 0;
    }
    if ((lastNumber!==null) && (currentOperation==="")) {
        clear();
    }
    if (decimalMode) {
        decimalString += this.textContent;
        currentNumber = Number(decimalString);
        display(mainDisplay,decimalString);
    } else {
    currentNumber = currentNumber*10 + Number(this.textContent);
    display(mainDisplay,currentNumber);
    }
}));

operationButtons.forEach(button => button.addEventListener("click", function() {
    if (currentNumber===null) {
        currentNumber = 0;
    }
    if (currentOperation === "") {
        currentOperation = this.id;
        if (lastNumber === null) {
        lastNumber = currentNumber;
        currentNumber = null;
        }
    } else {
        lastNumber = operate(operation[currentOperation],lastNumber,currentNumber);
        currentNumber = null;
        currentOperation = this.id;
        display(mainDisplay,lastNumber);
    }
    resetDecimalMode();
}));

equalButton.addEventListener("click", function() {
    if ((lastNumber !== null) && (currentOperation !== "")) {
        lastNumber = operate(operation[currentOperation],lastNumber,currentNumber);
        currentNumber = null;
        currentOperation = "";
        ans = lastNumber;
        display(mainDisplay,lastNumber);
    }
    resetDecimalMode();
});
