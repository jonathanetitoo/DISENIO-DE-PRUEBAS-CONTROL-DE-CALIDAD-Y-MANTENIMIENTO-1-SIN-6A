# Sistema A: Unidades Métricas (Newton-segundos)
def calcular_impulso_metrico(fuerza_newtons, tiempo_segundos):
    return fuerza_newtons * tiempo_segundos

# Sistema B: Unidades Imperiales (Libra-fuerza-segundos)
def calcular_impulso_imperial(fuerza_libras, tiempo_segundos):
    return fuerza_libras * tiempo_segundos

# El problema: Nadie probó la integración entre sistemas
impulso_A = calcular_impulso_metrico(100, 10)  # 1000 N·s
impulso_B = calcular_impulso_imperial(100, 10)  # 100 lbf·s

print(f"Sistema A calcula: {impulso_A} Newton-segundos")
print(f"Sistema B calcula: {impulso_B} Libra-fuerza-segundos")
print(f"Conversión real: {impulso_B * 4.448222} Newton-segundos")
print(f"❌ Error de cálculo: {abs(impulso_A - (impulso_B * 4.448222))} N·s")