function remove(arr, [x, y]) {
  arr[x][y] = 0;
}

function add(arr, [x, y], color) {
  arr[x][y] = color;
}

export default { remove, add };
