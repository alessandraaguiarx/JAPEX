# JAPEX 2026 — Modelagem Matricial

Estrutura atualizada do site com:
- Início
- Modelo Matemático
- Calculadora em JavaScript
- Python + NumPy executado no navegador com Pyodide
- GitHub

## Arquivos
- `index.html`
- `modelo.html`
- `calculadora.html`
- `python.html`
- `github.html`
- `style.css`
- `script.js`
- `python.js`
- `python/modelo.py`

## Imagens
Mantenha `img/algebra.jpg` e `img/alvenarias.jpg` no diretório `img/`.

## Pyodide
A aba Python utiliza Pyodide 314.0.0 e carrega NumPy no navegador.


## Execução em Python

A página `python.html` executa o mesmo programa Python do arquivo
`python/modelo.py` no navegador utilizando Pyodide + NumPy.

A interface de Python foi organizada como um terminal: o programa apresenta
cada `input()` na sequência e o usuário informa um valor por vez, de forma
semelhante à execução no terminal do VS Code.
