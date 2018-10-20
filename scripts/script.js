const alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];

const proverbs = ['bez pracy nie ma kołaczy', 'kto rano wstaje temu pan bóg daje', 'gdyby jaś się nie nauczył to by jan nie umiał', 'gdzie kucharek sześć tam cycków dwanaście', 'kuj żelazo póki gorące'];

let slogan = '';
const button = document.querySelector('button');
let divs = [];


const drawnSlogan = () => {
    const index = Math.floor(Math.random() * proverbs.length);
    slogan = proverbs[index].toUpperCase();
    proverbs.splice(index, 1);
}

const displaySlogan = () => {
    let dashedSlogan = '';
    for (let i = 0; i < slogan.length; i++) {
        if (slogan.charAt(i) == ' ') {
            dashedSlogan += " ";
        } else {
            dashedSlogan += '-';
        }
    }
    document.querySelector('.slogan p').innerHTML = dashedSlogan;
}

const letterWrapper = () => {
    for (let i = 0; i < alphabet.length; i++) {
        const div = document.createElement('div');
        div.classList.add('letter-container');
        div.innerHTML = alphabet[i];
        document.querySelector('.alphabet').appendChild(div);
    }
}

const game = function () {
    console.log(this.innerHTML);
}

button.addEventListener('click', () => {
    button.classList.add('off');
    document.querySelector('.container').classList.remove('off');
    drawnSlogan();
    displaySlogan();
    letterWrapper();
    divs = document.querySelectorAll('.alphabet div');
    divs = [...divs];
    divs.forEach(div => div.addEventListener('click', game));
});