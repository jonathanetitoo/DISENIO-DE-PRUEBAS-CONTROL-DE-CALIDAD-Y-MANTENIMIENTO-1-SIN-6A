import random
import time

# Parámetros de la simulación
ITERACIONES = 20
PROB_FALLO = 0.25

tiempos_entre_fallos = []
tiempos_de_reparacion = []

ultimo_fallo = 0
tiempo_actual = 0

def simular_reparacion():
    # Tiempo de reparación aleatorio entre 1 y 5 unidades
    return random.randint(1, 5)

for i in range(ITERACIONES):
    tiempo_actual += 1

    # El sistema puede fallar
    if random.random() < PROB_FALLO:
        print(f"[X] FALLO detectado en t={tiempo_actual}")

        # Tiempo entre fallos
        tiempos_entre_fallos.append(tiempo_actual - ultimo_fallo)
        ultimo_fallo = tiempo_actual

        # Simular reparación
        t_rep = simular_reparacion()
        tiempos_de_reparacion.append(t_rep)
        print(f"  → Reparando... ({t_rep} unidades)")

        tiempo_actual += t_rep

print("\n--- RESULTADOS ---")

if tiempos_entre_fallos:
    MTBF = sum(tiempos_entre_fallos) / len(tiempos_entre_fallos)
    MTTR = sum(tiempos_de_reparacion) / len(tiempos_de_reparacion)
    Disponibilidad = MTBF / (MTBF + MTTR)

    print(f"MTBF: {MTBF:.2f}")
    print(f"MTTR: {MTTR:.2f}")
    print(f"Disponibilidad estimada: {Disponibilidad:.2f}")
else:
    print("No hubo fallos en la simulación.")
