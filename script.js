const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBtTexto = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somBeep = new Audio('./sons/beep.mp3');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaFocoImput = document.querySelector('#alternar-musica');
let tempoDecorridoEmSegundos = 1500; //25 minutos
let intervaloId = null;
musica.loop = true;

musicaFocoImput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

function alterarContexto(contexto) {
    mostrarTempo();
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
    tempoDecorridoEmSegundos = 1500; //25 minutos
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300; //5 minutos
    alterarContexto('descanso-curto');
    curtoBT.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900; //15 minutos
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somBeep.play();
        alert('O tempo acabou!');
        zerar();
        return; 
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        zerar();
        iniciarOuPausarBtTexto.textContent = 'Começar';
        iniciarOuPausarBtIcone.setAttribute('src', './imagens/play_arrow.png');
        somPause.play();
        return;
    }
    iniciarOuPausarBtTexto.textContent = 'Pausar';
    iniciarOuPausarBtIcone.setAttribute('src', './imagens/pause.png');
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();
