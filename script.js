const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somBeep = new Audio('./sons/beep.mp3');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaFocoImput = document.querySelector('#alternar-musica');
musica.loop = true;

musicaFocoImput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    botoes.forEach((botao) => {
        botao.classList.remove('active');
    })
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong"> Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
    }
}

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBT.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBT.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        somBeep.play();
        alert('O tempo acabou!');
        return; 
    }
    tempoDecorridoEmSegundos -= 1;
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        zerar();
        somPause.play();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}