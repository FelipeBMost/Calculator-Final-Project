let displayValue = '7';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

function add(a,b) {
    return a + b;
}
function subtract(a,b) {
    return a - b;
}
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}
// console.log(add(a,b))
// console.log(subtract(a,b))
// console.log(multiply(a,b))
// console.log(divide(a,b))
// console.log(a,b)

function displayResult(){
    const display = document.getElementById('display');
    display.innerText = displayValue;
}
displayResult();

function operate(firstOperator, secondOperator, firstOperand, secondOperand) {

}
