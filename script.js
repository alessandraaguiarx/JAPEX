/* ==========================================
   CALCULADORA MATRICIAL - JAVASCRIPT
   Modelo:
   M = A · X
========================================== */

function calcularMateriais() {
    const argamassaX = parseFloat(document.getElementById("argamassaX").value);
    const argamassaY = parseFloat(document.getElementById("argamassaY").value);
    const graute = parseFloat(document.getElementById("graute").value);
    const x = parseFloat(document.getElementById("areaConvencional").value);
    const y = parseFloat(document.getElementById("areaEstrutural").value);

    const valores = [argamassaX, argamassaY, graute, x, y];

    if (valores.some(valor => Number.isNaN(valor))) {
        alert("Preencha todos os campos.");
        return;
    }

    if (valores.some(valor => valor < 0)) {
        alert("Os valores devem ser iguais ou maiores que zero.");
        return;
    }

    const A = [
        [argamassaX, 0],
        [0, argamassaY],
        [0, graute]
    ];

    const X = [x, y];

    const M = [
        A[0][0] * X[0] + A[0][1] * X[1],
        A[1][0] * X[0] + A[1][1] * X[1],
        A[2][0] * X[0] + A[2][1] * X[1]
    ];

    const formatar = valor => valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    document.getElementById("resultadoArgamassaX").textContent = `${formatar(M[0])} kg`;
    document.getElementById("resultadoArgamassaY").textContent = `${formatar(M[1])} kg`;
    document.getElementById("resultadoGraute").textContent = `${formatar(M[2])} kg`;

    document.getElementById("calculoRealizado").innerHTML = `
        <strong>Implementação:</strong> JavaScript<br><br>
        <strong>Modelo aplicado:</strong> M = A · X<br><br>

        A =
        [ ${argamassaX} &nbsp; 0 ]<br>
        [ 0 &nbsp; ${argamassaY} ]<br>
        [ 0 &nbsp; ${graute} ]

        <br><br>

        X = [ ${x} ; ${y} ]

        <br><br>

        <strong>Vetor resultante:</strong><br>
        M = [ ${formatar(M[0])} ; ${formatar(M[1])} ; ${formatar(M[2])} ]
    `;

    const resultado = document.getElementById("resultado");
    resultado.classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnCalcular");

    if (!botao) return;

    botao.addEventListener("click", calcularMateriais);

    calcularMateriais();
});
