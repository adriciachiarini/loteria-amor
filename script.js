const encontros = [

[
"Date em casa",
"Comida típica feita em casa",
"Playlist de acordo com o tema da comida escolhida"
],

[
"Date na rua",
"Restaurante de comida típica",
"Dividir uma sobremesa"
],

[
"Desenhar uma a outra com os olhos vendados",
"A pessoa que desenhou pior escolhe o próximo encontro",
"Pode ser um encontro real ou imaginário, o importante é a diversão"
],

[
"Uma sessão de karaokê cheia de drama",
"Performances dramáticas e pelo menos uma música bem ruim pra cada uma",
"Música escolhida pela outra pessoa"
],

[
"Date na rua",
"Ir no shopping ou feirinha",
"Presente simbólico de até 10 reais"
],

[
"Dormir abraçadas depois de um dia especial",
"Par ou ímpar decide quem faz o café da manhã no dia seguinte",
"Sexo obrigatório antes de dormir"
],

[
"Date em casa",
"Petiscos para um momento leve e gostoso",
"Hoje é dia de karaokê"
],

[
"Um passeio com a Eva como guia do dia",
"Seguir a direção que ela puxar",
"Conhecer um lugar novo com ela"
],

[
"Date na rua",
"Restaurante novo",
"Cada uma escolhe o prato da outra sem reclamar"
],

[
"Uma viagem dos sonhos planejada juntas",
"Sem limite de orçamento para imaginar",
"Pode abrir outra bolinha"
],

[
"Date em casa",
"Primeiro filme do catálogo",
"Comentar o filme sem piedade nenhuma"
],

[
"Date na rua",
"Uma praia para curtir o dia juntas",
"Procurar uma concha bonita como lembrança"
],

[
"Filme escolhido por par ou ímpar",
"Uma pipoca bem gostosa para acompanhar",
"Uma foto para guardar esse momento depois"
],

[
"Date em casa",
"Artesanato com o que tem em casa",
"Foto do resultado para guardar de lembrança"
],

[
"Uma maratona de séries juntas",
"Dividir o cobertor durante todo o tempo",
"Vale pedir delivery sem culpa nenhuma"
],

[
"Um filme ruim escolhido de propósito só pela diversão",
"Durante o filme, nada de celular mesmo",
"Uma pipoca bem gostosa para rir da situação"
],

[
"Date na rua",
"Assistir um filme no próximo horário disponível do dia",
"Precisa ser escolhido no local, sem pesquisar antes"
],

[
"Pôr do sol para um momento romântico",
"Uma foto romântica obrigatória desse instante",
"Gravar um vídeo engraçado para lembrar depois"
],

[
"Uma partida de Stop entre nós duas",
"Quem vencer ganha 10m de massagem",
"Vale revanche, prêmio acumulativo"
],

[
"A Eva escolhendo o brinquedo no petshop",
"Comprar o primeiro que ela pegar",
"Gravar um vídeo engraçado do momento"
],

[
"Uma partida de UNO para ver quem ganha",
"A perdedora escolhe o lanche depois",
"Melhor de três partidas"
]

];

const cartela = document.getElementById("cartela");
let revelados = 0;
const concluidos = document.getElementById("concluidos");

let ultimaLinhaCompleta = null;

encontros.forEach((linha, linhaIndex) => {

    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");
    divLinha.setAttribute("data-linha", linhaIndex);

    linha.forEach((texto, colunaIndex) => {

        const chave = `linha-${linhaIndex}-coluna-${colunaIndex}`;

        const bolinha = document.createElement("div");
        bolinha.classList.add("bolinha");

        const salva = localStorage.getItem(chave);

        if (salva) {

            bolinha.classList.add("aberta");
            bolinha.textContent = texto;
            revelados++;

        } else {

            if (colunaIndex === 0) {
                bolinha.textContent = "❤️";
            } else {
                bolinha.textContent = "🔒";
                bolinha.classList.add("bloqueada");
            }

        }

        bolinha.addEventListener("click", () => {

            if (localStorage.getItem(chave)) return;
            moverLinhaAnterior();

            if (colunaIndex > 0) {

                const anterior =
                    localStorage.getItem(
                        `linha-${linhaIndex}-coluna-${colunaIndex - 1}`
                    );

                if (!anterior) return;
            }

            bolinha.classList.remove("bloqueada");
            bolinha.classList.add("aberta");
            bolinha.textContent = texto;

            localStorage.setItem(chave, "aberta");

            revelados++;
            
            atualizarContador();
            verificarRecompensas();
            if(linhaCompleta(linhaIndex)){
    ultimaLinhaCompleta = linhaIndex;
}

            if (colunaIndex < 2) {

                const proximaChave =
                    `linha-${linhaIndex}-coluna-${colunaIndex + 1}`;

                const proximaBolinha =
                    document.querySelector(
                        `[data-chave="${proximaChave}"]`
                    );

                if (
                    proximaBolinha &&
                    !localStorage.getItem(proximaChave)
                ) {

                    proximaBolinha.classList.remove("bloqueada");
                    proximaBolinha.textContent = "❤️";

                }
            }

        });

        bolinha.setAttribute("data-chave", chave);

        divLinha.appendChild(bolinha);

    });

    cartela.appendChild(divLinha);

});

function atualizarContador() {

    document.getElementById("contador")
        .textContent = `Revelados: ${revelados}`;

}

function verificarRecompensas() {

    let encontrosConcluidos = 0;

    encontros.forEach((linha, linhaIndex) => {

        let completa = true;

        for (let coluna = 0; coluna < 3; coluna++) {

            const chave = `linha-${linhaIndex}-coluna-${coluna}`;

            if (!localStorage.getItem(chave)) {
                completa = false;
                break;
            }

        }

        if (completa) {
            encontrosConcluidos++;
        }

    });

    if (
        encontrosConcluidos >= 5 &&
        !localStorage.getItem("premio5")
    ) {

        alert(
`🎁 RECOMPENSA DESBLOQUEADA!

💆 Vale 10 minutos de massagem`
        );

        localStorage.setItem("premio5", "true");
    }

    if (
        encontrosConcluidos >= 10 &&
        !localStorage.getItem("premio10")
    ) {

        alert(
`🎁 RECOMPENSA DESBLOQUEADA!

😏 Vale boquinha em local inusitado`
        );

        localStorage.setItem("premio10", "true");
    }

    if (
        encontrosConcluidos === encontros.length &&
        !localStorage.getItem("finalLoteria")
    ) {

        alert(
`💖 FINAL DA LOTERIA DO AMOR 💖

Parabéns!

Vocês completaram todos os encontros da cartela.

Entre filmes, passeios, comidas, jogos, aventuras da Eva e momentos especiais, vocês transformaram uma simples ideia em um monte de memórias juntas.

Agora existe apenas um problema:

Vocês terminaram a Loteria do Amor. 😱

Talvez seja hora da segunda temporada... ❤️`
        );

        localStorage.setItem("finalLoteria", "true");
    }
}

function linhaCompleta(linhaIndex){

    for(let coluna = 0; coluna < 3; coluna++){

        if(
            !localStorage.getItem(
                `linha-${linhaIndex}-coluna-${coluna}`
            )
        ){
            return false;
        }

    }

    return true;
}

function moverLinhaAnterior(){

    if(ultimaLinhaCompleta === null) return;

    const linha =
        document.querySelector(
            `[data-linha="${ultimaLinhaCompleta}"]`
        );

    if(linha){

        concluidos.appendChild(linha);

    }

    ultimaLinhaCompleta = null;
}

atualizarContador();

document.getElementById("reset").addEventListener("click", () => {

    if (!confirm("Tem certeza que deseja reiniciar toda a cartela?")) {
        return;
    }

    localStorage.clear();
    location.reload();

});