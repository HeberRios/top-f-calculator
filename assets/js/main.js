"use strict";

// ELEMENTS --------------------------------------------------------------
// calculator display
const displayOutput = document.getElementById("display-output-current");
displayOutput.textContent = "";

// numbers
const numbers = document.querySelectorAll("[data-number]");

// operators
const operators = document.querySelectorAll("[data-operator]");

// actions
const actionBtns = document.querySelectorAll(`[data-action]`);
console.log(actionBtns);

// VARIABLES -------------------------------------------------------------
let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let displayContent = "";
let leftOperandRegExp = /[\d]+[\+\-\x\/]/g;
let rightOperandRegExp = /[\+\-\x\/][\d]+/g;
let operatorRegExp = /[\+\-\x\/]/g;

// FUNCTIONS -------------------------------------------------------------

// BASIC MATH FUNCTIONS

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "x") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}

function displayPressedNumber(button) {
    if (button.dataset.number === "1") {
        displayOutput.textContent += "1";
    } else if (button.dataset.number === "2") {
        displayOutput.textContent += "2";
    } else if (button.dataset.number === "3") {
        displayOutput.textContent += "3";
    } else if (button.dataset.number === "4") {
        displayOutput.textContent += "4";
    } else if (button.dataset.number === "5") {
        displayOutput.textContent += "5";
    } else if (button.dataset.number === "6") {
        displayOutput.textContent += "6";
    } else if (button.dataset.number === "7") {
        displayOutput.textContent += "7";
    } else if (button.dataset.number === "8") {
        displayOutput.textContent += "8";
    } else if (button.dataset.number === "9") {
        displayOutput.textContent += "9";
    } else if (button.dataset.number === "0") {
        displayOutput.textContent += "0";
    }
}

function displayPressedOperator(operator) {
    if (operator.dataset.operator === "+") {
        displayOutput.textContent += "+";
    } else if (operator.dataset.operator === "-") {
        displayOutput.textContent += "-";
    } else if (operator.dataset.operator === "*") {
        displayOutput.textContent += "x";
    } else if (operator.dataset.operator === "/") {
        displayOutput.textContent += "/";
    }
}

function saveDisplayContent() {
    displayContent = displayOutput.textContent;
}

function getLeftOperand(displayContent) {
    return +displayContent.match(leftOperandRegExp).toString().slice(0, -1);
}

function getRightOperand(displayContent) {
    return +displayContent.match(rightOperandRegExp).toString().slice(1);
}

function getOperator(displayContent) {
    return displayContent.match(operatorRegExp).toString();
}

function executeCorrectAction(button) {
    if (button.dataset.action === "equals") {
        updateDisplay(
            operate(
                getOperator(displayContent),
                getLeftOperand(displayContent),
                getRightOperand(displayContent)
            )
        );
    } else {
        console.log("not yet implemented");
    }
}

function updateDisplay(displayContent) {
    displayOutput.textContent = displayContent;
}

// POPULATE THE DISPLAY

//NUMBERS
numbers.forEach((number) => {
    number.addEventListener("click", function () {
        displayPressedNumber(number);
        saveDisplayContent();
    });
});

// OPERATORS
operators.forEach((operator) => {
    operator.addEventListener("click", function () {
        displayPressedOperator(operator);
        saveDisplayContent();
    });
});

//ACTIONS
actionBtns.forEach((button) => {
    button.addEventListener("click", function () {
        executeCorrectAction(button);
    });
});
