export default function createNet(cols, rows) {
    let fieldObj = document.querySelector('.field');
    let cellCount = cols * rows;

    fieldObj.style.gridTemplateColumns = `repeat(${cols}, 3vw`;

    for (let i = 0; i < cols * rows; i++) {
        fieldObj.innerHTML += `<div class="field__item"></div>`;
    }
}