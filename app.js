function add(num1, num2) {return num1 + num2;}
function minus(num1, num2) {return num1 - num2;}
function multiply(num1, num2) {return num1 * num2;}
function divide(num1, num2) {
  if (num2 === 0) {
    display.textContent = 'Not a Number';
    return;
  }
  return num1 / num2;
}

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
let num2 = '';
let num3;
let newOperation = false;
let newNum = false;
let firstNum = true;

btnNums.map(btn => {
  btn.addEventListener('click', e => {
    //console.log(e.target.getAttribute('data-value'));
    if (newOperation) {
      display.textContent = e.target.id;
      newOperation = false;
      firstNum = false;
    } else {
      display.textContent += e.target.id;
    }
    newNum = true;
    calculated = false;
  } )
})

let btnOperators = Array.from(document.querySelectorAll('.calculator__operator'));
let op1 = '';
let op2 = '';
let calculated = false;

btnOperators.map(btn => {
  btn.addEventListener('click', e => {
    if (newNum === false && calculated == true) {
      op1 = e.target.id;
      return;
    }

    if (firstNum === true){
      if (e.target.id === '='){
        return;
      }
      num1 = Number(display.textContent);
      op1 = e.target.id;
      newOperation = true;
      return;
    }
    
    if (op2 != '' && newNum != false) {
      if (e.target.id === '*' || e.target.id === '/') {
        num3 = Number(display.textContent);
        num2 = operate(num2,num3,op2);
        display.textContent = num2;
        op2 = e.target.id;
        newOperation = true;
        calculated = true;
        return
      }

      num3 = Number(display.textContent);
      num2 = operate(num2,num3,op2);
      num1 = operate(num1,num2,op1);
      display.textContent = num1;
      op1 = e.target.id;
      op2 = '';
      newOperation = true;
      calculated = true;
      return
    }

    if (op1 === '*' || op1 === '/' || e.target.id === '+' || e.target.id ==='-' || e.target.id === '=' && calculated === false) {
      if (op1 === '=') {
        op1 = e.target.id;
        newOperation = true;
        newNum = false;
        return;
      }

      num2 = Number(display.textContent);
      num1 = operate(num1, num2, op1);
      op1 = e.target.id;
      display.textContent = num1;
      calculated = true;
      op2 = '';
      
    } else if (op1 === '+' || op1 === '-' && e.target.id !== '=' && calculated === false) {
      num2 = Number(display.textContent);
      op2 = e.target.id;

    } else {
      op1 = e.target.id;
    }

    newOperation = true;
    newNum = false;
    calculated = true;
    
  })
})

let ac = document.querySelector('#ac');
ac.addEventListener('click', e => {
  display.textContent = '';
  num1 = 0;
  num2 = 0;
  num3 = 0;
  op1 = '';
  op2 = '';
  firstNum = true;
  calculated = false;
  newNum = false;
  newOperation = false;
})

/* let backspace = document.querySelector('#backspace');
backspace.addEventListener('click', e => {
  //display.textContent = display.textContent.slice(0,-1);
  if (display.textContent.includes('-')){
    display.textContent = display.textContent.replace('-','');
  } else {
    display.textContent = '-' + display.textContent;
  }

}) */

let dot = document.querySelector('#dot');
dot.addEventListener('click', e => {
  if (display.textContent.includes('.')){
    return;
  }
  display.textContent = display.textContent + '.';
})