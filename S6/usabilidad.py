# Por Brando Matute

import random
import numpy as np

NUM_USUARIOS = 15

# Cada usuario realiza la misma tarea
tiempos = []
errores = []
satisfaccion = []

for _ in range(NUM_USUARIOS):
    tiempos.append(random.uniform(20, 120))  # segundos
    errores.append(random.randint(0, 4))
    satisfaccion.append(random.randint(1, 7))

print("== RESULTADOS DE LA PRUEBA DE USABILIDAD ==")
print(f"Tiempo promedio: {np.mean(tiempos):.2f} segundos")
print(f"Errores promedio: {np.mean(errores):.2f}")
print(f"Satisfacción promedio: {np.mean(satisfaccion):.2f}/7")

# Criterio de éxito
usuarios_exitosos = sum(1 for t in tiempos if t < 90)
print(f"Usuarios que completan < 90s: {usuarios_exitosos}/{NUM_USUARIOS}")