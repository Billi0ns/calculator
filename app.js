function add(num1, num2) {return num1 + num2;}
function minus(num1, num2) {return num2 - num1;}
function multiply(num1, num2) {return num1 * num2;}
function divide(num1, num2) {return num2 / num1;}

function operate(num1, num2, operator) {
  switch (operator) {
    case '+': return add(num1, num2);
    case '-': return minus(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
  }
}

let display = document.querySelector('#display');
display.textContent = '';

let btnNums = Array.from(document.querySelectorAll('.calculator__num'));
let num1;
let num2 = 1;
let newOperation = false;

btnNums.map(btn => {
  btn.addEventListener('click', e => {
    //console.log(e.target.getAttribute('data-value'));
    if (newOperation) {
      display.textContent = e.target.id;
      newOperation = false;
    } else {
      display.textContent += e.target.id;
    }

    
  } )
})

let btnOperators = Array.from(document.querySelectorAll('.calculator__operator'));
let operator = '';
btnOperators.map(btn => {
  btn.addEventListener('click', e => {
    num1 = Number(display.textContent);

    if (operator && e.target.id !== '=') {
      num2 = operate(num1, num2, operator);
      operator = e.target.id;
    } else if (e.target.id === '=') {
      num2 = operate(num1, num2, operator);
    } else {
      num2 = num1;
      operator = e.target.id;
    }

    display.textContent = num2;
    newOperation = true;
    
  })
})

let ac = document.querySelector('#ac');
ac.addEventListener('click', e => {
  display.textContent = '';
  num1 = 0;
  //num2 = 0;
})

let backspace = document.querySelector('#backspace');
backspace.addEventListener('click', e => {
  display.textContent = display.textContent.slice(0,-1);
})