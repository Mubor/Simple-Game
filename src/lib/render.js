export default function render(field, cells) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      if (field[i][j] === 0) cells[i * field.length + j].style.background = 'lightgreen';
      else if (field[i][j] === 1) cells[i * field.length + j].style.background = 'yellow';
      else if (field[i][j] === 2) cells[i * field.length + j].style.background = 'darkgreen';
    }
  }
}
