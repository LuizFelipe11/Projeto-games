let ordem = [];
let jogadorOrdem = [];
let luz;
let turno;
let certo;
let turnoMaquina;
let intervaloId;
let hard = false;
let barulho = true;
let ligado = false;
let vitoria;

const contadorDeTurno = document.querySelector("#turn");
const cimaEsquerda = document.querySelector("#topleft");
const cimaDireita = document.querySelector("#topright");
const baixoEsquerda = document.querySelector("#bottomleft");
const baixoDireita = document.querySelector("#bottomright");
const hardBotao = document.querySelector("#strict");
const ligadoBotao = document.querySelector("#on");
const comecarBotao = document.querySelector("#start");

hardBotao.addEventListener('click', (event) => {
    hardBotao.checked == true ? hard = true : hard = false;
});

ligadoBotao.addEventListener('click', (event) => {
    if (ligadoBotao.checked == true) {
        ligado = true;
        contadorDeTurno.innerHTML = " - ";
    } else {
        ligado = false;
        contadorDeTurno.innerHTML = "";
        limparCor();
        clearInterval(intervaloId);
    }
});

comecarBotao.addEventListener('click', (event) => {
    if (ligado || vitoria) {
        jogar();
    }
});

function jogar() {
    vitoria = false;
    ordem = [];
    jogadorOrdem = [];
    luz = 0;
    intervaloId = 0;
    turno = 1;
    contadorDeTurno.innerHTML = 1;
    certo = true;
    for (var i = 0; i < 20; i++) {
        ordem.push(Math.floor(Math.random() * 4) + 1);
    }
    turnoMaquina = true;

    intervaloId = setInterval(turnoDoJogo, 800);
}

function turnoDoJogo() {
    ligado = false;

    if (luz == turno) {
        clearInterval(intervaloId);
        turnoMaquina = false;
        limparCor();
        ligado = true;
    }

    if (turnoMaquina) {
        limparCor();
        setTimeout(() => {
            if (ordem[luz] == 1) um();
            if (ordem[luz] == 2) dois();
            if (ordem[luz] == 3) tres();
            if (ordem[luz] == 4) quatro();
            luz++
        }, 200);
    }
}

function um() {
    if (barulho) {
        var audio = document.getElementById("clip1");
        audio.play();
    }
    barulho = true;
    cimaEsquerda.style.backgroundColor = "lightgreen";
}

function dois() {
    if (barulho) {
        var audio = document.getElementById("clip2");
        audio.play();
    }
    barulho = true;
    cimaDireita.style.backgroundColor = "tomato";
}

function tres() {
    if (barulho) {
        var audio = document.getElementById("clip3");
        audio.play();
    }
    barulho = true;
    baixoEsquerda.style.backgroundColor = "yellow";
}

function quatro() {
    if (barulho) {
        var audio = document.getElementById("clip4");
        audio.play();
    }
    barulho = true;
    baixoDireita.style.backgroundColor = "lightskyblue";
}

function limparCor() {
    cimaEsquerda.style.backgroundColor = "darkgreen";
    cimaDireita.style.backgroundColor = "darkred";
    baixoEsquerda.style.backgroundColor = "goldenrod";
    baixoDireita.style.backgroundColor = "darkblue";
}

function piscaLuz() {
    cimaEsquerda.style.backgroundColor = "lightgreen";
    cimaDireita.style.backgroundColor = "tomato";
    baixoEsquerda.style.backgroundColor = "yellow";
    baixoDireita.style.backgroundColor = "lightskyblue";
}

cimaEsquerda.addEventListener('click', (event) => {
    if (ligado) {
        jogadorOrdem.push(1);
        check();
        um();
        if (!vitoria) {
            setTimeout(() => {
                limparCor()
            }, 300);
        }
    }
});

cimaDireita.addEventListener('click', (event) => {
    if (ligado) {
        jogadorOrdem.push(2);
        check();
        dois();
        if (!vitoria) {
            setTimeout(() => {
                limparCor()
            }, 300);
        }
    }
});

baixoEsquerda.addEventListener('click', (event) => {
    if (ligado) {
        jogadorOrdem.push(3);
        check();
        tres();
        if (!vitoria) {
            setTimeout(() => {
                limparCor()
            }, 300);
        }
    }
});

baixoDireita.addEventListener('click', (event) => {
    if (ligado) {
        jogadorOrdem.push(4);
        check();
        quatro();
        if (!vitoria) {
            setTimeout(() => {
                limparCor()
            }, 300);
        }
    }
});

function check() {
    if (jogadorOrdem[jogadorOrdem.length - 1] !== ordem[jogadorOrdem.length - 1])
        certo = false;

    if (jogadorOrdem.length == 20 && certo) {
        ganhou();
    }

    if (certo == false) {
        piscaLuz();
        contadorDeTurno.innerHTML = "ERRO";
        setTimeout(() => {
            contadorDeTurno.innerHTML = turno;
            limparCor();

            if (hard) {
                jogar();
            } else {
                turnoMaquina = true;
                luz = 0;
                jogadorOrdem = [];
                certo = true;
                intervaloId = setInterval(turnoDoJogo, 800);
            }
        }, 800);

        barulho = false;
    }

    if (turno == jogadorOrdem.length && certo && !vitoria) {
        turno++
        jogadorOrdem = [];
        turnoMaquina = true;
        luz = 0;
        contadorDeTurno.innerHTML = turno;
        intervaloId = setInterval(turnoDoJogo, 800);
    }
}

function ganhou() {
    piscaLuz();
    contadorDeTurno.innerHTML = "WIN!";
    ligado = false;
    vitoria = true;
}

function ativarMenu() {
    const menuMobile = document.getElementById("menu-mobile")
    
    if(menuMobile.className === "menu-mobile-active") {
        menuMobile.className = "menu-mobile"
    } else {
        menuMobile.className = "menu-mobile-active"
    }

}
