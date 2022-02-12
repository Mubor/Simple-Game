function rand(min, max) {
  const randNum = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randNum);
}

function generateTreePosition (cols, rows, count) {
    let result = [];

    for (let i = 0; i < count; i++) {
        result.push([rand(0,rows - 1), rand(0,cols - 1)]);
    }

    return result;
}


export default function generateField (cols, rows, treesCount){
    let field = [];
    let treePosition = generateTreePosition(cols, rows, treesCount);

    // create array with 0 
    for(let i = 0; i < rows; i++) {
        field[i] = [];
        for (let j = 0; j < cols; j++) {
            field[i][j] = 0;
        }
    }

    // generate trees
    treePosition.map( el => field[el[0]][el[1]] = 2);

    // set player position
    field[0][0] = 1;
    
    return field;
}