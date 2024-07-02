document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateDisplay() {
        display.textContent = displayValue;
    }

    function handleNumber(num) {
        if (waitingForSecondValue) {
            displayValue = num;
            waitingForSecondValue = false;
        } else {
            displayValue = displayValue === '0' ? num : displayValue + num;
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const value = parseFloat(displayValue);
        if (firstValue === null) {
            firstValue = value;
        } else if (operator) {
            const result = calculate(firstValue, value, operator);
            displayValue = String(result);
            firstValue = result;
        }
        waitingForSecondValue = true;
        operator = nextOperator;
        updateDisplay();
    }

    function calculate(first, second, operator) {
        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        return second;
    }

    function handleClear() {
        displayValue = '0';
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
        updateDisplay();
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const { id } = button;
            if (id === 'clear') {
                handleClear();
            } else if (['add', 'subtract'].includes(id)) {
                handleOperator(button.textContent);
            } else if (id === 'equals') {
                handleOperator(null);
            } else {
                handleNumber(button.textContent);
            }
        });
    });

    updateDisplay();
});
