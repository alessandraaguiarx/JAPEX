# JAPEX 2026 — Modelagem Matricial
Modelagem Matricial do Quantitativo de Materiais

VI JAPEX 2026

Modelagem Matricial do Quantitativo de Materiais em Sistemas de Alvenaria Convencional e Estrutural: Uma aplicação da Álgebra Linear na Engenharia Civil

Projeto acadêmico desenvolvido para a VI Jornada Acadêmica de Pesquisa e Extensão Universitária (JAPEX 2026), da Universidade do Estado da Bahia (UNEB).

Autores: Alessandra Nascimento Aguiar Santos; Evandro; Manuela Nascimento Orientador: Alexandre Boleira Lopo Instituição: Universidade do Estado da Bahia – UNEB | Departamento de Ciências Exatas e da Terra – DCET I

Sobre o projeto
O projeto demonstra a aplicação de conceitos de Álgebra Linear a um problema relacionado à Engenharia Civil: a determinação do quantitativo de materiais a partir das áreas de alvenaria convencional e estrutural.

A proposta organiza as relações de consumo por meio de uma matriz de coeficientes e interpreta o cálculo como uma transformação linear.

O modelo considera:

área de alvenaria convencional;

área de alvenaria estrutural;

consumo de argamassa X;

consumo de argamassa Y;

consumo de graute.

O resultado é um vetor contendo os quantitativos dos três materiais modelados.

Problema
Determinar os materiais necessários a partir das áreas da obra.

Entradas

x = área de alvenaria convencional (m²)

y = área de alvenaria estrutural (m²)

Consumos utilizados no exemplo

Argamassa X: 5 kg/m²

Argamassa Y: 3 kg/m²

Graute: 2 kg/m²

Saídas

Argamassa X (kg)

Argamassa Y (kg)

Graute Y (kg)

Fundamentação matemática
O modelo é dado por:

M = A · X

Em que:

A = matriz de consumo dos materiais X = vetor das áreas da obra M = vetor dos quantitativos de materiais

A matriz de consumo utilizada é:

A = [ 5 0 ] [ 0 3 ] [ 0 2 ]

O vetor de entrada é:

X = [ x ] [ y ]

E o vetor de saída é:

M = [ 5x ] [ 3y ] [ 2y ]

A matriz pode ser interpretada da seguinte forma:

Linhas: materiais;

Colunas: tipos de alvenaria;

Coeficientes: consumo por m².

Sistema linear
O modelo também pode ser escrito como:

5x + 0y = Argamassa X 0x + 3y = Argamassa Y 0x + 2y = Graute Y

Transformação linear
A relação entre as áreas da obra e os materiais é interpretada como uma transformação linear:

T(x,y) = A · [x ; y]

A aplicação pode ser vista como:

Vetor das áreas ↓ Matriz de consumo ↓ Vetor de materiais

Em termos de espaços vetoriais:

R² → R³

Espaço vetorial
O vetor de entrada pertence a R²:

X = [x ; y]

O vetor de materiais pertence a R³:

M = [5x ; 3y ; 2y]

Assim, duas variáveis de entrada são transformadas em três quantitativos de materiais.

Combinação linear
As colunas da matriz podem ser interpretadas como:

V₁ = [5 ; 0 ; 0]

V₂ = [0 ; 3 ; 2]

O vetor de materiais pode ser escrito como:

M = xV₁ + yV₂

Para o exemplo:

x = 10 y = 20

temos:

[50 ; 60 ; 40]
10[5 ; 0 ; 0] + 20[0 ; 3 ; 2]

Exemplo numérico
Considerando:

x = 10 m²

y = 20 m²

O modelo produz:

T(10,20) = [ 5 0 ] [10] [ 0 3 ] · [20] [ 0 2 ]

Resultado:

[50] [60] [40]

Portanto:

50 kg de argamassa X

60 kg de argamassa Y

40 kg de graute

Implementação computacional
O modelo foi implementado em Python utilizando NumPy para a construção da matriz e a multiplicação matricial.

O cálculo central é:

A = np.array([ [argamassa_x, 0], [0, argamassa_y], [0, graute] ])

X = np.array([x, y])

resultado = A.dot(X)

A versão cod.py disponibilizada neste repositório também define a função:

calcular_quantitativos(...)

para permitir que o site execute o mesmo cálculo diretamente no navegador.

Execução do Python no navegador
O site utiliza Pyodide para executar Python no próprio navegador.

Com isso, o visitante pode:

informar os consumos por m²;

informar as áreas de alvenaria;

executar o cálculo;

visualizar os quantitativos;

consultar o código Python utilizado.

Estrutura do projeto
Japex_2026/ │ ├── index.html ├── style.css ├── script.js ├── cod.py ├── README.md └── img/ └── algebra.jpg

Site do projeto
O site apresenta uma versão mais completa do conteúdo do pôster, incluindo:

problema de Engenharia Civil;

consumos adotados;

modelo matricial;

sistema linear;

transformação linear;

espaço vetorial;

combinação linear;

exemplo numérico;

calculadora matricial;

código Python;

referências.

O objetivo é utilizar o pôster como síntese visual e o site como material complementar.

Resultado esperado
O visitante pode testar cenários diferentes sem alterar o código.

Exemplo:

Argamassa X = 5 kg/m² Argamassa Y = 3 kg/m² Graute = 2 kg/m²

Área convencional = 10 m² Área estrutural = 20 m²

Resultado:

Argamassa X = 50 kg Argamassa Y = 60 kg Graute = 40 kg

Referências essenciais
ANTON, Howard; RORRES, Chris. Álgebra Linear com Aplicações. Porto Alegre: Bookman.

LAY, David C. Álgebra Linear e suas Aplicações. Rio de Janeiro: LTC.

