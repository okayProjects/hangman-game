const alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];

const proverbs = ['bez pracy nie ma kołaczy', 'kto rano wstaje ten leje jak z cebra', 'czego jaś się nie nauczył tego jan nie będzie umiał', 'gdzie kucharek sześć tam cycków dwanaście', 'kuj żelazo póki gorące', 'baba z wozu koniom lżej'];

const titles = ['krzyżacy', 'akademia pana kleksa', 'pan wołodyjowski', 'o psie który jeździł koleją', 'w pustyni i w puszczy', 'dziewczyna która igrała z ogniem', 'puc bursztyn i goście'];

const people = ['lech wałęsa', 'jan maria rokita', 'jan paweł ii', 'john bon jovi', 'aleksander graham bell', 'krzysztof ługowski', 'jan nowak jeziorański'];

const devices = ['kuchenka indukcyjna', 'praska do czosnku', 'młynek do kawy', 'pompka rowerowa', 'ekspres do kawy'];

const music = ['led zeppelin', 'abba', 'formacja nieżywych schabuff', 'guns n roses', 'pink floyd', 'fun loving criminals', 'the rolling stones'];

const gallowsImages = [{
    img: "img/s1.jpg"
}, {
    img: "img/s2.jpg"
}, {
    img: "img/s3.jpg"
}, {
    img: "img/s4.jpg"
}, {
    img: "img/s5.jpg"
}, {
    img: "img/s6.jpg"
}, {
    img: "img/s7.jpg"
}, {
    img: "img/s8.jpg"
}, {
    img: "img/s9.jpg"
}];

const btnProverbs = document.querySelector('.proverbs');
const btnTitles = document.querySelector('.titles');
const btnPeople = document.querySelector('.people');
const btnDevices = document.querySelector('.devices');
const btnMusic = document.querySelector('.music');

let slogan = '';
let dashedSlogan = [];
let activeGallowsImg = 0;
let divs = [];
const button = document.querySelector('button');
let paragraph = document.querySelector('.slogan p');
const gallowsImg = document.querySelector('.gallows img');
let displayedLetters = 0;
let spacelessDashedSlogan = [];
const sounds = [...document.querySelectorAll('audio')];
let category;
let categoryReminder = document.querySelector('span');



const drawnSlogan = () => {
    const index = Math.floor(Math.random() * category.length);
    slogan = category[index].toUpperCase();
    proverbs.splice(index, 1);
    console.log(slogan);
}

const transformToDashedSlogan = () => {
    for (let i = 0; i < slogan.length; i++) {
        if (slogan[i] === ' ') {
            dashedSlogan += " ";
        } else {
            dashedSlogan += '-';
        }
    }
    dashedSlogan = [...dashedSlogan];
    spacelessDashedSlogan = dashedSlogan.filter(letter => letter === '-');
}



const displayDashedSlogan = () => {
    // for (let i = 0; i < dashedSlogan.length; i++) {
    //     paragraph.textContent += dashedSlogan[i];
    // }
    dashedSlogan.forEach((letter) => {
        paragraph.textContent += letter;
    })
}

const letterWrapper = () => {
    for (let i = 0; i < alphabet.length; i++) {
        const div = document.createElement('div');
        div.classList.add('letter-container');
        div.innerHTML = alphabet[i];
        document.querySelector('.alphabet').appendChild(div);
    }
}

const checkLetters = function () {
    for (let i = 0; i < slogan.length; i++) {
        if (this.textContent === slogan[i]) {
            dashedSlogan[i] = this.textContent;
            this.removeEventListener('click', checkLetters);
            this.classList.add('off-green');
            displayedLetters++;
            sounds[1].play();
            checkGameResult();
        }
    }

    paragraph.textContent = '';
    displayDashedSlogan();

    if (!this.classList.contains('off-green')) {
        activeGallowsImg++;
        gallowsImg.src = gallowsImages[activeGallowsImg].img;
        this.removeEventListener('click', checkLetters);
        this.classList.add('off-red');
        checkGameResult();
        sounds[2].play();
    }
}

const disableButtons = () => {
    divs.forEach((div) => {
        div.removeEventListener('click', checkLetters);
        div.style.pointerEvents = 'none';
    });
}

const playAgain = () => {
    categoryReminder.textContent = 'ZAGRAJ PONOWNIE';
    categoryReminder.addEventListener('click', () => location.reload());
    categoryReminder.onmouseover = categoryReminder.style.cursor = 'pointer';
}


const checkGameResult = () => {
    if (activeGallowsImg === gallowsImages.length - 1) {
        sounds[0].play();
        disableButtons();
        paragraph.textContent = slogan;
        paragraph.style.color = 'red';
        playAgain();
    }
    if (displayedLetters === spacelessDashedSlogan.length) {
        disableButtons();
        paragraph.style.color = 'green';
        sounds[3].play();
        playAgain();
    }
}

const startGame = () => {
    document.querySelector('h1').classList.add('off');
    btnProverbs.classList.add('off');
    btnPeople.classList.add('off');
    btnDevices.classList.add('off');
    btnTitles.classList.add('off');
    btnMusic.classList.add('off');
    document.querySelector('.container').classList.remove('off');
    document.createElement('div').textContent = `Kategoria ${this}`;
    drawnSlogan();
    transformToDashedSlogan();
    displayDashedSlogan();
    letterWrapper();
    divs = [...document.querySelectorAll('.alphabet div')];
    divs.forEach(div => div.addEventListener('click', checkLetters));
}

btnProverbs.addEventListener('click', function () {
    category = proverbs;
    categoryReminder.textContent = `Wybrałeś kategorię: '${this.textContent}'.`;
    document.querySelector('.container div').appendChild(categoryReminder);
    startGame();
});
btnTitles.addEventListener('click', function () {
    category = titles;
    startGame();
    categoryReminder.textContent = `Wybrałeś kategorię: '${this.textContent}'.`;
    document.querySelector('.container div').appendChild(categoryReminder);
});
btnPeople.addEventListener('click', function () {
    console.log(this);
    category = people;
    startGame();
    categoryReminder.textContent = `Wybrałeś kategorię: '${this.textContent}'.`;
    document.querySelector('.container div').appendChild(categoryReminder);
});
btnDevices.addEventListener('click', function () {
    category = devices;
    startGame();
    categoryReminder.textContent = `Wybrałeś kategorię: '${this.textContent}'.`;
    document.querySelector('.container div').appendChild(categoryReminder);
});
btnMusic.addEventListener('click', function () {
    category = music;
    startGame();
    categoryReminder.textContent = `Wybrałeś kategorię: '${this.textContent}'.`;
    document.querySelector('.container div').appendChild(categoryReminder);
});