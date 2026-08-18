/* =========================================================
   PYTHON + NUMPY — TERMINAL INTERATIVO
   =========================================================

   O Python + NumPy realiza o cálculo matricial.
   O JavaScript controla:
   - perguntas;
   - entrada dos valores;
   - terminal visual;
   - execução do Pyodide;
   - exibição do resultado.

   ========================================================= */


/* =========================================================
   CÓDIGO PYTHON
   ========================================================= */

const CODIGO_PYTHON = `
import numpy as np

# =========================================================
# ENTRADAS
# =========================================================

argamassa_x = float(input())
argamassa_y = float(input())
graute = float(input())

x = float(input())
y = float(input())


# =========================================================
# MATRIZ DE CONSUMO
# =========================================================

A = np.array([
    [argamassa_x, 0],
    [0, argamassa_y],
    [0, graute]
])


# =========================================================
# VETOR DAS ÁREAS
# =========================================================

X = np.array([x, y])


# =========================================================
# CÁLCULO MATRICIAL
# =========================================================

resultado = A.dot(X)


# =========================================================
# RESULTADO
# =========================================================

print("=== RESULTADO FINAL ===")
print()

print(
    f"Será necessário {resultado[0]:.2f} kg de argamassa X "
    f"(alvenaria convencional)"
)

print(
    f"Será necessário {resultado[1]:.2f} kg de argamassa Y "
    f"(alvenaria estrutural)"
)

print(
    f"Será necessário {resultado[2]:.2f} kg de graute "
    f"(alvenaria estrutural)"
)
`.trim();


/* =========================================================
   PERGUNTAS
   ========================================================= */

const ETAPAS = [

    "Digite o consumo de ARGAMASSA X (kg/m²) para alvenaria convencional: ",

    "Digite o consumo de ARGAMASSA Y (kg/m²) para alvenaria estrutural: ",

    "Digite o consumo de GRAUTE (kg/m²) para alvenaria estrutural: ",

    "Digite a área de alvenaria CONVENCIONAL (m²): ",

    "Digite a área de alvenaria ESTRUTURAL (m²): "

];


/* =========================================================
   VARIÁVEIS DO TERMINAL
   ========================================================= */

let etapaAtual = 0;

let entradas = [];

let executando = false;


/* =========================================================
   PEGAR TERMINAL
   ========================================================= */

function terminal() {

    return document.getElementById("terminalOutput");

}


/* =========================================================
   ESCREVER NO TERMINAL
   ========================================================= */

function escrever(texto) {

    const tela = terminal();

    if (!tela) {
        return;
    }

    tela.textContent += texto;

    tela.scrollTop = tela.scrollHeight;

}


/* =========================================================
   MOSTRAR PERGUNTA
   ========================================================= */

function mostrarPergunta() {

    if (etapaAtual >= ETAPAS.length) {
        return;
    }


    const pergunta = ETAPAS[etapaAtual];

    escrever(pergunta);


    const linha =
        document.getElementById("terminalInputLine");

    const campo =
        document.getElementById("terminalInput");

    const botao =
        document.getElementById("terminalEnter");

    const estado =
        document.getElementById("terminalState");


    if (!linha || !campo || !botao || !estado) {
        console.error(
            "Elementos do terminal não foram encontrados."
        );

        return;
    }


    linha.hidden = false;

    campo.disabled = false;

    botao.disabled = false;

    campo.value = "";

    campo.focus();


    estado.textContent =
        `entrada ${etapaAtual + 1}/${ETAPAS.length}`;

}


/* =========================================================
   PROCESSAR ENTRADA
   ========================================================= */

function processarEntrada() {

    if (executando) {
        return;
    }


    if (etapaAtual >= ETAPAS.length) {
        return;
    }


    const campo =
        document.getElementById("terminalInput");


    if (!campo) {
        return;
    }


    let valorTexto =
        campo.value.trim();


    /* =====================================================
       CAMPO VAZIO
       ===================================================== */

    if (valorTexto === "") {

        escrever(
            "\nDigite um valor para continuar.\n"
        );

        campo.focus();

        return;
    }


    /* =====================================================
       VÍRGULA DECIMAL
       Exemplo:
       5,5 → 5.5
       ===================================================== */

    valorTexto =
        valorTexto.replace(",", ".");


    /* =====================================================
       CONVERTER PARA NÚMERO
       ===================================================== */

    const valor =
        Number(valorTexto);


    /* =====================================================
       VALIDAR NÚMERO
       ===================================================== */

    if (
        !Number.isFinite(valor) ||
        valor < 0
    ) {

        escrever(
            "\n" +
            valorTexto +
            "\n"
        );

        escrever(
            "Valor inválido. Digite um número maior ou igual a zero.\n"
        );

        campo.value = "";

        campo.focus();

        return;
    }


    /* =====================================================
       MOSTRAR VALOR DIGITADO
       ===================================================== */

    escrever(
        valorTexto + "\n"
    );


    /* =====================================================
       GUARDAR VALOR
       ===================================================== */

    entradas.push(valor);


    etapaAtual++;


    campo.value = "";


    /* =====================================================
       PRÓXIMA PERGUNTA
       ===================================================== */

    if (etapaAtual < ETAPAS.length) {

        setTimeout(
            mostrarPergunta,
            100
        );

    }

    else {

        /* =================================================
           TODAS AS ENTRADAS FORAM PREENCHIDAS
           ================================================= */

        const linha =
            document.getElementById(
                "terminalInputLine"
            );

        const estado =
            document.getElementById(
                "terminalState"
            );


        if (linha) {
            linha.hidden = true;
        }


        if (estado) {

            estado.textContent =
                "executando Python...";

        }


        executarPython();

    }

}


/* =========================================================
   EXECUTAR PYTHON COM PYODIDE
   ========================================================= */

async function executarPython() {

    executando = true;


    const botao =
        document.getElementById(
            "btnNovoPython"
        );


    if (botao) {
        botao.disabled = true;
    }


    /* =====================================================
       VERIFICAR PYODIDE
       ===================================================== */

    if (
        !window.pyodideReady ||
        !window.pyodide
    ) {

        escrever(
            "\nPython ainda não está carregado.\n"
        );

        executando = false;

        if (botao) {
            botao.disabled = false;
        }

        return;
    }


    let indiceEntrada = 0;

    let saidaPython = "";


    try {

        /* =================================================
           ENVIAR ENTRADAS PARA O PYTHON
           ================================================= */

        window.pyodide.setStdin({

            stdin: () => {

                if (
                    indiceEntrada >= entradas.length
                ) {

                    return "";

                }


                const valor =
                    String(
                        entradas[indiceEntrada]
                    );


                indiceEntrada++;


                return valor;

            }

        });


        /* =================================================
           CAPTURAR SAÍDA DO PYTHON
           ================================================= */

        window.pyodide.setStdout({

            batched: (texto) => {

                saidaPython += texto;

            }

        });


        /* =================================================
           CAPTURAR ERROS
           ================================================= */

        window.pyodide.setStderr({

            batched: (texto) => {

                console.error(
                    "Python:",
                    texto
                );

            }

        });


        /* =================================================
           EXECUTAR PYTHON
           ================================================= */

        await window.pyodide.runPythonAsync(
            CODIGO_PYTHON
        );


        /* =================================================
           LIMPAR SAÍDA
           ================================================= */

        saidaPython =
            saidaPython.trim();


        /* =================================================
           GARANTIR QUE APENAS O RESULTADO SEJA MOSTRADO
           ================================================= */

        const marcador =
            "=== RESULTADO FINAL ===";


        const posicaoResultado =
            saidaPython.indexOf(
                marcador
            );


        if (
            posicaoResultado !== -1
        ) {

            saidaPython =
                saidaPython.substring(
                    posicaoResultado
                );

        }


        /* =================================================
           MOSTRAR RESULTADO
           ================================================= */

        escrever(
            "\n" +
            saidaPython +
            "\n"
        );


        /* =================================================
           STATUS
           ================================================= */

        const estado =
            document.getElementById(
                "terminalState"
            );


        if (estado) {

            estado.textContent =
                "concluído";

        }

    }

    catch (erro) {

        /* =================================================
           MOSTRAR ERRO
           ================================================= */

        escrever(
            "\nERRO DURANTE A EXECUÇÃO DO PYTHON:\n"
        );


        escrever(
            String(erro) +
            "\n"
        );


        const estado =
            document.getElementById(
                "terminalState"
            );


        if (estado) {

            estado.textContent =
                "erro";

        }

        console.error(
            "Erro Pyodide:",
            erro
        );

    }


    executando = false;


    if (botao) {
        botao.disabled = false;
    }

}


/* =========================================================
   INICIAR TERMINAL
   ========================================================= */

function iniciarTerminalPython() {

    etapaAtual = 0;

    entradas = [];

    executando = false;


    const tela =
        document.getElementById(
            "terminalOutput"
        );


    const linha =
        document.getElementById(
            "terminalInputLine"
        );


    const campo =
        document.getElementById(
            "terminalInput"
        );


    const enter =
        document.getElementById(
            "terminalEnter"
        );


    const estado =
        document.getElementById(
            "terminalState"
        );


    /* =====================================================
       VERIFICAR ELEMENTOS
       ===================================================== */

    if (
        !tela ||
        !linha ||
        !campo ||
        !enter ||
        !estado
    ) {

        console.error(
            "Erro: elementos do terminal não encontrados."
        );

        return;
    }


    /* =====================================================
       LIMPAR TERMINAL
       ===================================================== */

    tela.textContent = "";


    /* =====================================================
       CABEÇALHO
       ===================================================== */

    escrever(
        "=== CÁLCULO DE QUANTITATIVO DE MATERIAIS ===\n\n"
    );


    /* =====================================================
       CONFIGURAR INPUT
       ===================================================== */

    linha.hidden = true;

    campo.disabled = true;

    enter.disabled = true;

    campo.value = "";


    /* =====================================================
       STATUS
       ===================================================== */

    estado.textContent =
        "pronto";


    /* =====================================================
       PRIMEIRA PERGUNTA
       ===================================================== */

    setTimeout(
        mostrarPergunta,
        150
    );

}


/* =========================================================
   NOVO CÁLCULO
   ========================================================= */

function novoCalculo() {

    if (
        !window.pyodideReady ||
        !window.pyodide
    ) {

        const estado =
            document.getElementById(
                "terminalState"
            );


        if (estado) {

            estado.textContent =
                "carregando Python...";

        }


        return;
    }


    iniciarTerminalPython();

}


/* =========================================================
   DISPONIBILIZAR PARA O HTML
   ========================================================= */

window.iniciarTerminalPython =
    iniciarTerminalPython;


window.novoCalculo =
    novoCalculo;


window.processarEntrada =
    processarEntrada;


/* =========================================================
   EVENTOS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           BOTÃO ENTER
           ================================================= */

        const terminalEnter =
            document.getElementById(
                "terminalEnter"
            );


        if (terminalEnter) {

            terminalEnter.addEventListener(
                "click",
                processarEntrada
            );

        }


        /* =================================================
           TECLA ENTER
           ================================================= */

        const terminalInput =
            document.getElementById(
                "terminalInput"
            );


        if (terminalInput) {

            terminalInput.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        processarEntrada();

                    }

                }
            );

        }


        /* =================================================
           BOTÃO NOVO CÁLCULO
           ================================================= */

        const btnNovoPython =
            document.getElementById(
                "btnNovoPython"
            );


        if (btnNovoPython) {

            btnNovoPython.addEventListener(
                "click",
                novoCalculo
            );

        }

    }
);