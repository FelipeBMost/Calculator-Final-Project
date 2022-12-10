const calculator = document.querySelector('#calculator_grid');
const keys = calculator.querySelectorAll('button');
const display = calculator.querySelector('#display');
const previousOperandTextElement = display.firstElementChild;
const currentOperandTextElement = display.lastElementChild;

let currentOperand = '';
let previousOperand = '';
let currentOperation = undefined;
let previousOperation = undefined;
let equalsActive = false;

let updateNumber = (number) => {
  if(currentOperation === 'equals' 
    && previousOperation !== undefined
    && previousOperand === '' ) {
    clearDisplay();
    updateDisplay();
  }
  if(number === '.' && currentOperand.includes('.')) return
  if(number === '0' && currentOperand === '0') return
  if(number !== '0'
    && currentOperand !== '0.' 
    && (currentOperand.split('.')[0].charAt(0) === '0'
    && currentOperand.length <= 2)) {
    currentOperand = ''
    updateDisplay();
  }
  if(currentOperand === '' && number === '.') currentOperand = '0';

  currentOperand = currentOperand.toString() + number.toString().trim();
}

let chooseOperation = (currentOperation) =>{
  if(currentOperand === '' || currentOperand === '.') return
  if(previousOperand !== '') {
    operate(previousOperation);
  }
  if(currentOperand === '0.') currentOperand = '0';

  previousOperand = `${currentOperand} ${currentOperation}`;
  currentOperand = '';
  previousOperation = currentOperation;
}
let operate = (previousOperation) => {
  let computation;
  const prevNum = parseFloat(previousOperand);
  const currNum = parseFloat(currentOperand);
  if(isNaN(prevNum) || isNaN(currNum)) return;
  switch (previousOperation) {
    case '+':
      computation = prevNum + currNum;
      break;
    case '-':
      computation = prevNum - currNum;
      break;
    case '*':
      computation = prevNum * currNum;
      break;
    case '÷':
      computation = prevNum / currNum;
      break;
    default:
      return;
  }
  if(computation === Infinity || isNaN(computation)) {
    alert("Error: You reached the infinity which is beyond your mortal comprehension.")
    clearDisplay();
    updateDisplay();
  } else {
    currentOperand = getDecimalPrecision(computation).toString(); 
    previousOperand = '';
  }
  
}

let updateDisplay = () => {
  currentOperandTextElement.innerText = currentOperand;
  previousOperandTextElement.innerText = previousOperand;
}

let clearDisplay = () => {
  currentOperand = '';
  previousOperand = '';
  previousOperation = undefined;
  currentOperation = undefined;
}

let backspace = () => {
  currentOperand = currentOperand.slice(0, -1);
}

let getDecimalPrecision = (number) => {
  let replaceString = '';
  number = number.toPrecision(15);
  let integerPart = number.toString().split('.')[0];
  let decimalPart = number.toString().split('.')[1];
  for(let i = decimalPart.length - 1; i > 1; i--) {
    if (decimalPart[i] === decimalPart[i - 1])
      replaceString += decimalPart[i];
  }
  decimalPart.replace(replaceString, '')
  number = `${integerPart}.${decimalPart}`;
  return +number;
}

keys.forEach(button => {
  const buttonType = button.dataset.type;
  const buttonText = button.innerText;
  button.addEventListener('click', () => {
    switch(buttonType){
      case "number":
        updateNumber(buttonText);
        break;
      case "operation":
        chooseOperation(buttonText);
        break;
      case "equals":
        operate(previousOperation);
        currentOperation = 'equals';
        break;
      case "delete":
        backspace();
        break;
      case "all-clear":
        clearDisplay();
        break;
    }
    updateDisplay();
  })
  button.addEventListener('keydown', (e) => {
    if (e.key === "Enter") e.preventDefault();
  })
})

window.addEventListener('keydown', (e) => {
  if (+e.key < 9 || e.key === '.') {
    updateNumber(e.key);
  }
  const operationsList = '+-*'
  if (operationsList.includes(e.key)) {
    chooseOperation(e.key)
  }
  if (e.key === '/') chooseOperation('÷');
  if (e.key === 'Enter') {
    operate(previousOperation);
    currentOperation = 'equals';
  }
  if (e.key === 'Escape') clearDisplay();
  if (e.key === 'Backspace' || e.key === 'Delete') backspace();
  updateDisplay();
})