function add(num1, num2) {return num1 + num2;}
function minus(num1, num2) {return num1 - num2;}
function multiply(num1, num2) {return num1 * num2;}
function divide(num1, num2) {return num1 / num2;}

function operate(num1, num2, operator) {
  switch (operator) {
    case '+': return roundNum(add(num1, num2));
    case '-': return roundNum(minus(num1, num2));
    case '×': return roundNum(multiply(num1, num2));
    case '÷': return roundNum(divide(num1, num2));
  }
}

function roundNum(num) {
  if (String(num).includes('.') && String(num).replace(/\d*./, '').length > 9){
    return Math.round(num*100000000)/100000000;
  }
  return num;
}

function buttonPressed(btn) {
  btn.classList.add('clicked');
  // setTimeout(removeClicked.bind(null, btn), 100);
  setTimeout(() => {btn.classList.remove('clicked')}, 100);
}

function adjustFont(display) {
  let originalSize1 = 38.4;
  let originalSize2 = 22.4;
  let displayWidth = 460.8; // 2.4rem = 38.4px, max 12 character in display1
  let size = displayWidth / display.textContent.length;

  if (display === display1) {
    display.style.fontSize = display.textContent.length > 12 ? size + 'px': originalSize1 + 'px';
  } else {
    display.style.fontSize = display.textContent.length > 26 ? size + 'px': originalSize2 + 'px';
  }
}

let display1 = document.querySelector('#display1');
let display2 = document.querySelector('#display2');

let btnNums = Array.from(document.querySelectorAll('.calculator__num'));
let num1 = '';
let num2 = '';
let num3 = '';

btnNums.map(btn => {
  btn.addEventListener('click', e => {
    buttonPressed(e.target);

    /* if (display1.textContent.length > 10) {
      alert('Reached maximum length! Please delete some of the numbers');
      return;
    } */
    if (display1.textContent === 'NaN') {
      clearAll()
    }
    if (display1.textContent[0] === '0' && display1.textContent[1] !== '.' ) {
      display1.textContent = e.target.id;
    } else {
      display1.textContent += e.target.id;
    }
    adjustFont(display1);
  } )
})

let btnOperators = Array.from(document.querySelectorAll('.calculator__operator'));
let op1 = '';
let op2 = '';

btnOperators.map(btn => {
  btn.addEventListener('click', e => {
    buttonPressed(e.target);

    if (op1 === '÷'|| op2 === '÷') {
      if (display1.textContent === '0' || display1.textContent === '0.'){
        clearAll();
        display1.textContent = 'NaN';
        alert("Error: Can't divide by 0!");
        return;
      }
    }
    
    if (display1.textContent === 'NaN') {
      clearAll();
      return;
    }

    // Change the operator easily
    if (display1.textContent === '') {
      if (num2 != '') {
        op2 = e.target.id;
        if (op2 === '+' || op2 === '-') {
          num1 = operate(num1, num2, op1);
          op1 = op2;
          op2 = '';
          num2 = '';
          display2.textContent = num1 + op1;
        }

        display2.textContent = num1 + op1 + num2 + op2;
      } else {
        if (num1) {
          op1 = e.target.id;
          display2.textContent = num1 + op1;
        }
      }
      adjustFont(display2);
      return;
    }

    // When there aren't any number in display2
    if (display2.textContent === ''){
      if (display1.textContent === '') {return;}

      num1 = Number(display1.textContent);
      op1 = e.target.id;
      display1.textContent = '';
      display2.textContent = num1 + op1;
      adjustFont(display2);

      return;
    }

    if (!op2) {
      if (op1 === '×' || op1 === '÷' || e.target.id === '+' || e.target.id === '-'){
        num2 = Number(display1.textContent);
        num1 = operate(num1,num2,op1);
        num2 = '';
        op1 = e.target.id;
        display1.textContent = '';
        display2.textContent = num1 + op1;
        
      } else {
        num2 = Number(display1.textContent);
        op2 = e.target.id;
        display1.textContent = '';
        display2.textContent = num1 + op1 + num2 + op2;
        
      }
    } else {
      if (e.target.id === '+' || e.target.id === '-'){
        num3 = Number(display1.textContent);
        num2 = operate(num2,num3,op2);
        num1 = operate(num1,num2,op1);
        num3 = '';
        num2 = ''; 
        op1 = e.target.id;
        display2.textContent = num1 + op1;
        
        display1.textContent = '';
        op2 = '';
      } else {
        num3 = Number(display1.textContent);
        num2 = operate(num2,num3,op2);
        op2 = e.target.id;
        display2.textContent = num1 + op1 + num2 + op2;
        
        display1.textContent = '';
      }
    }
    adjustFont(display2);
  })
})

function clearAll() {
  display1.textContent = '';
  display2.textContent = '';
  num1 = '';
  num2 = '';
  num3 = '';
  op1 = '';
  op2 = '';
}

let ac = document.querySelector('#ac');
ac.addEventListener('click', e => {
  buttonPressed(e.target);
  clearAll();
})

let backspace = document.querySelector('#backspace');
backspace.addEventListener('click', e => {
  //buttonPressed(e.target);
  display1.textContent = display1.textContent.slice(0,-1);
  adjustFont(display1);
})

let dot = document.querySelector('#dot');
dot.addEventListener('click', e => {
  buttonPressed(e.target);
  if (display1.textContent === '' || display1.textContent.includes('.')){return;}
  display1.textContent += '.';
  adjustFont(display1);
})

let equal = document.querySelector('#equal');
equal.addEventListener('click', e => {
  buttonPressed(e.target);

  if (op1 === '÷' && Number(display1.textContent) === 0 || op2 === '÷' && Number(display1.textContent) === 0) {
    if (display1.textContent !== '') {
      clearAll();
      display1.textContent = "NaN";
      alert("Error: Can't divide by 0");
      return;
    }
  }

  if (display1.textContent != '') {
    if (op2){
      num2 = operate(num2, Number(display1.textContent), op2);
      num1 = operate(num1, num2, op1);
      num2 = '';
    } else {
      if (!op1) {return;}
      num1 = operate(num1, Number(display1.textContent), op1);
    }
  } else {
    if (num2) {
      num1 = operate(num1, num2, op1);
      num2 = '';
    }
  }

  display1.textContent = roundNum(num1);
  adjustFont(display1);
  display2.textContent = '';
  op1 = '';
  op2 = '';
})

let sign = document.querySelector('#sign');
sign.addEventListener('click', e => {
  buttonPressed(e.target);
  if (display1.textContent[0] === '-') {
    display1.textContent = display1.textContent.slice(1);
  } else {
    if (display1.textContent){
      display1.textContent = '-' + display1.textContent;
    }
  }
  adjustFont(display1);
})

let percentage = document.querySelector('#percentage');
percentage.addEventListener('click', e => {
  buttonPressed(e.target);
  if(Number(display1.textContent) != 0) {
    display1.textContent *= 0.01;
    display1.textContent = roundNum(display1.textContent);
  }
  adjustFont(display1);
})

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= 0 && e.key <= 9){
    document.getElementById(e.key).click();
  }
  switch (e.key) {
    case '.':
      document.getElementById('dot').click();
      break;
    case '+':
      document.getElementById('+').click();
      break;
    case '-':
      document.getElementById('-').click();
      break;
    case '*':
      document.getElementById('×').click();
      break;
    case '/':
      document.getElementById('÷').click();
      break;
    case '=':
    case 'Enter':
      document.getElementById('equal').click();
      break;
    case 'Backspace':
      document.getElementById('backspace').click();
      break;
    case 'c':
      document.getElementById('ac').click();
      break;
    case '%':
      document.getElementById('percentage').click();
      break;
  }
})
