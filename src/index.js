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

function gameStart(cols, rows, trees) {
  field = generateField(cols, rows, trees);
  createNet(cols, rows);
  fieldItems = document.querySelectorAll('.field__item');
  render(field, fieldItems);

  document.querySelector('.wrap').style.display = 'none';
  document.querySelector('.field').style.display = 'grid';
  document.querySelector('.controllers').style.display = 'block';

  canMove = true;
}

function buttonMoveHandler(obj) {
  if(canMove) {
    if (obj.id === 'move-up') moveY(-1);
    else if (obj.id === 'move-down') moveY(1);
    else if (obj.id === 'move-right') moveX(1);
    else if (obj.id === 'move-left') moveX(-1);
    
    canMove = false;
    setTimeout( () => canMove = true, 5000);
    render(field, fieldItems);
  }
}

function validation() {
  let cols = document.getElementById('columns').value;
  let rows = document.getElementById('rows').value;
  let trees = document.getElementById('trees').value;

  if (cols === '' || rows === '' || trees === '') {
      alert('Все поля должны быть заполнены!');
    } 
  else if (cols > 32 || rows > 16) {
      alert('Многовато клеток!');
    }
  else if (trees >= cols * rows / 4) {
      alert('Слишком много деревьев!');
  }
  else {
      gameStart(cols, rows, trees);
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
document.getElementById('move-up').addEventListener('click', buttonMoveHandler.bind(this, document.getElementById('move-up')));
document.getElementById('move-down').addEventListener('click', buttonMoveHandler.bind(this, document.getElementById('move-down')));
document.getElementById('move-left').addEventListener('click', buttonMoveHandler.bind(this, document.getElementById('move-left')));
document.getElementById('move-right').addEventListener('click', buttonMoveHandler.bind(this, document.getElementById('move-right')));

