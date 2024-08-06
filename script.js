// script.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstOperand = null;
    let secondOperand = false;
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            switch (value) {
                case '+':
                case '-':
                case '*':
                case '/':
                    handleOperator(value);
                    break;
                case '.':
                    inputDecimal();
                    break;
                case 'C':
                    clearDisplay();
                    break;
                case '=':
                    calculate();
                    break;
                default:
                    inputDigit(value);
            }
            updateDisplay();
        });
    });

    function updateDisplay() {
        display.innerText = displayValue;
    }

    function inputDigit(digit) {
        if (secondOperand === true) {
            displayValue = digit;
            secondOperand = false;
        } else {
            displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal() {
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    }

    function clearDisplay() {
        displayValue = '0';
        firstOperand = null;
        secondOperand = false;
        operator = null;
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && secondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation(firstOperand, inputValue, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        secondOperand = true;
        operator = nextOperator;
    }

    function performCalculation(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }

    function calculate() {
        let result = performCalculation(firstOperand, parseFloat(displayValue), operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = null;
        secondOperand = false;
        operator = null;
    }
});
