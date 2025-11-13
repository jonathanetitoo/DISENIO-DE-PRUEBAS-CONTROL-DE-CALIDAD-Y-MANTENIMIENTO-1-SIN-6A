# test_flight_search.py
import pytest
from datetime import date, timedelta

def buscar_vuelos(origen, destino, fecha):
    """
    Busca vuelos según origen, destino y fecha.
    Valida que los campos no estén vacíos y la fecha no sea pasada.
    """
    if not origen or not destino:
        return "Error: Campos vacíos"
    if fecha < date.today():
        return "Error: Fecha inválida"
    return "Búsqueda exitosa"

# Usamos una fecha futura para asegurar que el test no falle con el tiempo.
fecha_futura = date.today() + timedelta(days=15)
fecha_pasada = date.today() - timedelta(days=1)

@pytest.mark.parametrize(
    "origen,destino,fecha,esperado", [
        # Clase válida: todos los datos son correctos
        ("Quito", "Guayaquil", fecha_futura, "Búsqueda exitosa"),
        # Clase inválida: origen vacío
        ("", "Guayaquil", fecha_futura, "Error: Campos vacíos"),
        # Clase inválida: destino vacío
        ("Quito", "", fecha_futura, "Error: Campos vacíos"),
        # Clase inválida: fecha en el pasado
        ("Quito", "Guayaquil", fecha_pasada, "Error: Fecha inválida")
])
def test_buscar_vuelos(origen, destino, fecha, esperado):
    """Prueba la función buscar_vuelos con diferentes particiones."""
    assert buscar_vuelos(origen, destino, fecha) == esperado

