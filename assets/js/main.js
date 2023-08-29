"use strict";

// SELECTING ELEMENTS
const displayOutput = document.getElementById("display-output");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const actions = document.querySelectorAll("[data-action]");

// VARIABLES -------------------------------------------------------------
let displayValue = displayOutput.textContent;
let firstNumber = 0;
let operator = "";
let secondNumber = 0;
// let justNumbersRegExp = /^\d+$/g;
// let numbersAndOperator = /^\d+[\+\-\x\/]$/g;

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
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}

// Display number and operators
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
        console.log("nothing");
        // return;
    } else if (/^\d+[\+\-\x\/]$/g.test(displayValue)) {
        console.log("numbers and operator");
        // return;
    } else if (/^\d+$/g.test(displayValue)) {
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
        // displayPressedOperator(operator);
        checkDisplayValueForOperators(operator);
        saveDisplayValue();
    });
});
