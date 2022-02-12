export default function createNet(cols, rows) {
    let fieldObj = document.querySelector('.field');
    fieldObj.style.gridTemplateColumns = `repeat(${cols}, 60px`;

    for (let i = 0; i < cols * rows; i++) {
        fieldObj.innerHTML += `<div class="field__item"></div>`;
    }
}