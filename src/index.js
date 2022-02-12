import fieldHandlers from './lib/fieldHandler';
import render from './lib/render';
import generateField from './lib/generateField';
import createNet from './lib/htmlNet';

let currentPosition = [0, 0];
let field;
let fieldItems;
let { remove, add } = fieldHandlers;
let canMove = false;

function moveY(direction) {
  const [x, y] = [currentPosition[0], currentPosition[1]];
  const nextCoord = x + direction;
  const isNotTreeOnDirection = field[nextCoord][y] !== 2;
  const isNotBorderOnDirection = nextCoord >= 0 && nextCoord < field.length;
  
  if (isNotTreeOnDirection && isNotBorderOnDirection) {
    remove(field, currentPosition);
    add(field, [nextCoord, y], 1);
    currentPosition = [nextCoord, y];
  }
}

function moveX(direction) {
  const [x, y] = [currentPosition[0], currentPosition[1]];
  const nextCoord = y + direction;
  const isNotTreeOnDirection = field[x][nextCoord] !== 2;
  const isNotBorderOnDirection = nextCoord >= 0 && nextCoord < field[0].length;
  
  if (isNotTreeOnDirection && isNotBorderOnDirection) {
    remove(field, currentPosition);
    add(field, [x, nextCoord], 1);
    currentPosition = [x, nextCoord];
  }
}

function gameStart() {
  let cols = document.getElementById('columns').value;
  let rows = document.getElementById('rows').value;
  let trees = document.getElementById('trees').value;

  field = generateField(cols, rows, trees);
  createNet(cols, rows);
  fieldItems = document.querySelectorAll('.field__item');
  render(field, fieldItems);

  document.querySelector('.wrap').style.display = 'none';
  document.querySelector('.field').style.display = 'grid';

  canMove = true;
}

function validation() {
  let colsInput = document.getElementById('columns');
  let rowsInput = document.getElementById('rows');
  let treesInput = document.getElementById('trees');

  if (colsInput.value === '' || rowsInput.value === '' || treesInput.value === '') {
      alert('Все поля должны быть заполнены!');
  } 
  else if (treesInput.value >= colsInput.value * rowsInput.value / 4) {
      alert('Слишком много деревьев!');
  }
  else {
      gameStart();
  }
}

document.addEventListener('keydown', (event) => {
  if(canMove) {
    if (event.key === 'ArrowUp') moveY(-1);
    else if (event.key === 'ArrowDown') moveY(1);
    else if (event.key === 'ArrowRight') moveX(1);
    else if (event.key === 'ArrowLeft') moveX(-1);
    
    canMove = false;
    setTimeout( () => canMove = true, 5000);
    render(field, fieldItems);
  }
});

document.getElementById('start').addEventListener('click', validation);

