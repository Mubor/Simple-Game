import fieldHandlers from './lib/fieldHandler';
import render from './lib/render';

let currentPosition = [0, 0];
const { remove, add } = fieldHandlers;

const field = [
  [1, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 0, 0],
];

const fieldItems = document.querySelectorAll('.field__item');

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

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') moveY(-1);
  else if (event.key === 'ArrowDown') moveY(1);
  else if (event.key === 'ArrowRight') moveX(1);
  else if (event.key === 'ArrowLeft') moveX(-1);
  render(field, fieldItems);
});
render(field, fieldItems);
