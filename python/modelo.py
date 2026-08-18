"""
Modelo matricial do projeto VI JAPEX 2026.

M = A · X

A = matriz de consumo
X = vetor de áreas
M = vetor de quantitativos
"""

import numpy as np

print("=== CÁLCULO DE QUANTITATIVO DE MATERIAIS ===\n")

# Entrada de dados (consumo por m²)
argamassa_x = float(input("Digite o consumo de ARGAMASSA X (kg/m²) para alvenaria convencional: "))
argamassa_y = float(input("Digite o consumo de ARGAMASSA Y (kg/m²) para alvenaria estrutural: "))
graute = float(input("Digite o consumo de GRAUTE (kg/m²) para alvenaria estrutural: "))

print("\n--- Agora informe a área da obra ---")

# Entrada das áreas
x = float(input("Digite a área de alvenaria CONVENCIONAL (m²): "))
y = float(input("Digite a área de alvenaria ESTRUTURAL (m²): "))

# Montando matriz de consumo
A = np.array([
    [argamassa_x, 0],
    [0, argamassa_y],
    [0, graute]
])

# Vetor da obra
X = np.array([x, y])

# Cálculo
resultado = A.dot(X)

# Saída
print("\n=== RESULTADO FINAL ===\n")

print(f"Será necessário {resultado[0]:.2f} kg de argamassa X (alvenaria convencional)")
print(f"Será necessário {resultado[1]:.2f} kg de argamassa Y (alvenaria estrutural)")
print(f"Será necessário {resultado[2]:.2f} kg de graute (alvenaria estrutural)")
