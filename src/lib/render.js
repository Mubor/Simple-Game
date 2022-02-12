const heroImg = '<img src="../img/knight.png" alt="hero">';
const treeImg = '<img src="../img/tree.png" alt="tree">';

export default function render(field, cells) {
  debugger;
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      if (field[i][j] === 0) {
        cells[i * field[0].length + j].style.background = 'rgb(31, 27, 53)';
        cells[i * field[0].length + j].innerHTML = '';
      }
      else if (field[i][j] === 1) cells[i * field[0].length + j].innerHTML = heroImg;
      else if (field[i][j] === 2) cells[i * field[0].length + j].innerHTML = treeImg;
    }
  }
}
