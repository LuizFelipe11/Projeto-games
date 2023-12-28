function ativarMenu() {
    const menuMobile = document.getElementById("menu-mobile")
    
    if(menuMobile.className === "menu-mobile-active") {
        menuMobile.className = "menu-mobile"
    } else {
        menuMobile.className = "menu-mobile-active"
    }
}

function recomecar() {
    location.reload()
}

document.addEventListener('DOMContentLoaded', () => {
    const passaro = document.querySelector('.bird')
    const conteudoJogo = document.querySelector('.game-container')
    const fimDeJogo = document.querySelector(".game-over")
    const contador = document.getElementById('contador')
    const pontuacao = document.getElementById('pontuacao')

    
    let geradorObstaculos
    let cont = 0
    let timerIdContador
    let passaroEsquerda = 220
    let passaroBaixo = 170
    let gravidade = 2
    let acabouOJogo = false
    let gap = 430

    function comecarJogo() {
        fimDeJogo.style.opacity = 0
        if(passaroBaixo > 0) passaroBaixo -= gravidade
        passaro.style.bottom = passaroBaixo + 'px'
        passaro.style.left = passaroEsquerda + 'px'
    }

    let timerJogoId = setInterval(comecarJogo, 20)

    function controle (e) {
        if (e.keyCode === 38) {
            pular()
        }
    }

    function pular() {
        if (passaroBaixo < 480) passaroBaixo += 80
        passaro.style.bottom = passaroBaixo + 'px'
    }
    document.addEventListener('keyup', controle)

    function gerarObstaculo() {
        cont ++
        let alturaRandom = Math.random() * 150
        let obstaculoEsquerda = 500
        let obstaculoBaixo = alturaRandom
        const obstaculo = document.createElement('div')
        const obstaculoCima = document.createElement('div')
        if(!acabouOJogo) {
            obstaculo.classList.add('obstaculo')
            obstaculoCima.classList.add('obstaculoCima')
        }
        conteudoJogo.appendChild(obstaculo)
        conteudoJogo.appendChild(obstaculoCima)
        obstaculo.style.left = obstaculoEsquerda + 'px'
        obstaculoCima.style.left = obstaculoEsquerda + 'px'
        obstaculo.style.bottom = obstaculoBaixo + 'px'
        obstaculoCima.style.bottom = obstaculoBaixo + gap + 'px'

        function moverObstaculo() {
            obstaculoEsquerda -=2
            obstaculo.style.left = obstaculoEsquerda + 'px'
            obstaculoCima.style.left = obstaculoEsquerda + 'px'

            if (obstaculoEsquerda === -60) {
                clearInterval(timerId)
                conteudoJogo.removeChild(obstaculo)
                conteudoJogo.removeChild(obstaculoCima)
            }
            if (
                obstaculoEsquerda > 200 && 
                obstaculoEsquerda < 280 && 
                passaroEsquerda === 220 &&
                (passaroBaixo < obstaculoBaixo + 120 || passaroBaixo > obstaculoBaixo + gap - 210) ||
                passaroBaixo === 0
                ){
                derrota()
                clearInterval(timerId)
                clearTimeout(geradorObstaculos)
            }
        }

        function atualizarContador() {
            contador.innerHTML = cont
        }

        let timerId = setInterval(moverObstaculo, 20)

        timerIdContador = setInterval(atualizarContador, 3000);

        if(!acabouOJogo){
            geradorObstaculos = setTimeout(gerarObstaculo, 3000)
        } 
    }

    gerarObstaculo()

    function derrota() {
        clearInterval(timerJogoId)
        clearInterval(timerIdContador)
        acabouOJogo = true
        document.removeEventListener('keyup', controle)
        telaDeDerrota()
    }

    function telaDeDerrota() {
        if (fimDeJogo) {
            fimDeJogo.style.opacity = 1
            pontuacao.innerHTML = cont - 1
        } else {
            console.error("Classe não encontrada")
        }
    }

})
