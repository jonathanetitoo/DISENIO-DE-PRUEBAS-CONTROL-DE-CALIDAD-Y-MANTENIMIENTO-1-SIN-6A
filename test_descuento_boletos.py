# test_descuento_boletos.py
import pytest

def calcular_descuento(edad):
    """Calcula el descuento basado en la edad."""
    if edad < 0:
        return "Error: Edad inválida"
    if edad < 18:
        return 0.5   # 50% descuento
    elif edad > 65:
        return 0.3   # 30% descuento
    else: # Edades entre 18 y 65 (inclusive)
        return 0.0   # sin descuento

@pytest.mark.parametrize("edad,esperado", [
    (10, 0.5),     # Límite inferior (niño)
    (17, 0.5),     # Justo debajo del límite de adulto
    (18, 0.0),     # Justo en el límite de adulto
    (65, 0.0),     # Justo en el límite de adulto mayor
    (66, 0.3),     # Justo por encima del límite de adulto mayor
    (70, 0.3),     # Adulto mayor
    (-5, "Error: Edad inválida") # Valor inválido
])
def test_calcular_descuento(edad, esperado):
    """Prueba el cálculo de descuento con análisis de valores límite."""
    assert calcular_descuento(edad) == esperado
