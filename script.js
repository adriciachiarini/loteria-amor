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

encontros.forEach((linha, linhaIndex) => {

    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");

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

atualizarContador();

document.getElementById("reset").addEventListener("click", () => {

    if (!confirm("Tem certeza que deseja reiniciar toda a cartela?")) {
        return;
    }

    localStorage.clear();
    location.reload();

});