"use strict";

// SELECTING ELEMENTS
const displayOutput = document.getElementById("display-output");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const actions = document.querySelectorAll("[data-action]");
const decimalPoint = document.querySelector("[data-decimal]");

// VARIABLES -------------------------------------------------------------
let displayValue = displayOutput.textContent;
let firstNumber = 0;
let operator = "";
let secondNumber = 0;

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

//Show operation result in display
function showOperationResult() {
    const newDisplayValue = operate(
        getOperator(displayValue),
        getLeftOperand(displayValue),
        getRightOperand(displayValue)
    );
    displayOutput.textContent = newDisplayValue;
}

//Get the operands and operator
function getLeftOperand(displayValue) {
    return +displayValue.match(/\d+\.?(\d?)+(?=[\+\-\x\/])/g).toString();
}

function getOperator(displayValue) {
    return displayValue.match(/[\+\-\x\/]/g).toString();
}

function getRightOperand(displayValue) {
    return +displayValue.match(/(?<=[\+\-\x\/])\d+\.?(\d?)+/g).toString();
}

// Display number, operators and decimal point
function displayPressedNumber(number) {
    if (number.dataset.number === "1") {
        displayOutput.textContent += "1";
    } else if (number.dataset.number === "2") {
        displayOutput.textContent += "2";
    } else if (number.dataset.number === "3") {
        displayOutput.textContent += "3";
    } else if (number.dataset.number === "4") {
        displayOutput.textContent += "4";
    } else if (number.dataset.number === "5") {
        displayOutput.textContent += "5";
    } else if (number.dataset.number === "6") {
        displayOutput.textContent += "6";
    } else if (number.dataset.number === "7") {
        displayOutput.textContent += "7";
    } else if (number.dataset.number === "8") {
        displayOutput.textContent += "8";
    } else if (number.dataset.number === "9") {
        displayOutput.textContent += "9";
    } else if (number.dataset.number === "0") {
        displayOutput.textContent += "0";
    }
}

function checkDisplayValueForOperators(operator) {
    if (displayValue === "") {
        // console.log("nothing");
        return;
    } else if (/^\d+\.$/g.test(displayValue)) {
        // console.log("previous character is a decimal point");
        return;
    } else if (/^\d+\.?(\d?)+$/g.test(displayValue)) {
        // console.log("heeh");
        displayPressedOperator(operator);
    } else if (/^\d+\.?(\d?)+[\+\-\x\/]$/g.test(displayValue)) {
        // console.log("already an operator");
        return;
    } else if (/^\d+\.?(\d?)+[\+\-\x\/]\d+\.$/g.test(displayValue)) {
        // console.log("previous character is a decimal point 2");
        return;
    } else if (/^\d+\.?(\d?)+[\+\-\x\/]\d+\.?(\d?)+$/g.test(displayValue)) {
        // console.log("resolve operation");
        showOperationResult();
        displayPressedOperator(operator);
    }
}

function displayPressedOperator(operator) {
    if (operator.dataset.operator === "+") {
        displayOutput.textContent += "+";
    } else if (operator.dataset.operator === "-") {
        displayOutput.textContent += "-";
    } else if (operator.dataset.operator === "x") {
        displayOutput.textContent += "x";
    } else if (operator.dataset.operator === "/") {
        displayOutput.textContent += "/";
    }
}

function checkDisplayValueForDecimalPoint() {
    if (displayValue === "") {
        displayOutput.textContent = "0.";
    } else if (/^\d+\.$/g.test(displayValue)) {
        console.log("already a decimal point1");
        return;
    } else if (/^\d+\.(\d?)+$/g.test(displayValue)) {
        console.log("already a decimal point2");
        return;
    } else if (/^\d+\.(\d?)+[\+\-\x\/]$/g.test(displayValue)) {
        console.log("previous character is an operator");
        return;
    } else if (/^\d+\.?(\d?)+[\+\-\x\/]\d+$/g.test(displayValue)) {
        console.log("a number an operator and another number");
        displayDecimalPoint();
    } else if (/^\d+\.?\d+[\+\-\x\/]\d+\.$/g.test(displayValue)) {
        console.log("already a decimal point3");
        return;
    } else if (/^\d+\.?\d+[\+\-\x\/]\d+\.(\d?)+$/g.test(displayValue)) {
        console.log("already a decimal point4");
        return;
    } else if (/^\d+$/g.test(displayValue)) {
        console.log("nah bro fraudkuna");
        displayDecimalPoint();
    }
}

function displayDecimalPoint() {
    displayOutput.textContent += ".";
}

// Execute the pressed action
function checkDisplayValueForEqualTo(button) {
    if (displayValue === "") {
        // console.log("nothing");
        return;
    } else if (/^\d+\.?(\d?)+[\+\-\x\/]\d+\.?(\d?)+$/g.test(displayValue)) {
        // console.log("pair of operands and an operator");
        showOperationResult();
    } else {
        // console.log("not evaluable");
        return;
    }
}

function deleteButton() {
    displayOutput.textContent = displayOutput.textContent.slice(0, -1);
}

function clearDisplay() {
    displayOutput.textContent = "";
}

function executePressedAction(button) {
    if (button.dataset.action === "equals") {
        checkDisplayValueForEqualTo(button);
    } else if (button.dataset.action === "delete") {
        deleteButton();
    } else if (button.dataset.action === "reset") {
        clearDisplay();
    }
}

// Store the value of the display
function saveDisplayValue() {
    displayValue = displayOutput.textContent;
}

// EVENT LISTENERS -------------------------------------------------------
// Numbers
numbers.forEach((number) => {
    number.addEventListener("click", function () {
        displayPressedNumber(number);
        saveDisplayValue();
    });
});

// Operators
operators.forEach((operator) => {
    operator.addEventListener("click", function () {
        checkDisplayValueForOperators(operator);
        saveDisplayValue();
    });
});

// Actions
actions.forEach((button) => {
    button.addEventListener("click", function () {
        executePressedAction(button);
        saveDisplayValue();
    });
});

// Decimal point
decimalPoint.addEventListener("click", function () {
    checkDisplayValueForDecimalPoint();
    saveDisplayValue();
});
