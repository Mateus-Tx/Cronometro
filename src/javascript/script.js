const botaoIniciar = document.getElementById('iniciarBtn');
const botaoPausar = document.getElementById('pausarBtn');
const botaoContinuar = document.getElementById('continuarBtn')
const botaoReset = document.getElementById('resetarBtn')


const minutosEl = document.getElementById('minutos')
const segundosEl = document.getElementById('segundos')
const miliSegundosEl = document.getElementById('milisegundos')

let intervalo;

let miliSegundos = 0;
let segundos = 0;
let minutos = 0;
let pausado = false;

botaoIniciar.addEventListener('click', iniciarCronometro);
botaoPausar.addEventListener('click', pausarTempo);
botaoContinuar.addEventListener('click', continuarTempo);
botaoReset.addEventListener('click', resetarTempo);

function iniciarCronometro() {

    intervalo = setInterval(() => {
        if (!pausado) {
            miliSegundos += 10;
            if (miliSegundos === 1000) {
                segundos++;
                miliSegundos = 0;
            }

            if (segundos === 60) {
                minutos++
                segundos = 0
            }

            minutosEl.textContent = formatarTempo(minutos)
            segundosEl.textContent = formatarTempo(segundos)
            miliSegundosEl.textContent = formatarMiliSegundos(miliSegundos)

        }
    }, 10);

    botaoIniciar.style.display = "none";
    botaoPausar.style.display = "block";
}

function pausarTempo() {
    pausado = true
    botaoPausar.style.display = "none";
    botaoContinuar.style.display = "block";
}

function continuarTempo() {
    pausado = false
    botaoContinuar.style.display = "none";
    botaoPausar.style.display = "block"
}


function resetarTempo() {
    clearInterval(intervalo)
    segundosEl.textContent = '00'
    miliSegundosEl.textContent = '000'
    minutosEl.textContent = '00'

    segundos = 0;
    miliSegundos = 0;
    minutos = 0;

    botaoPausar.style.display = "none"
    botaoContinuar.style.display = "none"
    botaoIniciar.style.display = "block"
}

function formatarTempo(tempo) {
    return tempo < 10 ? `0${tempo}` : tempo;

}

function formatarMiliSegundos(tempo) {
    return tempo < 100 ? tempo.toString().padStart(3, "0") : tempo;
}