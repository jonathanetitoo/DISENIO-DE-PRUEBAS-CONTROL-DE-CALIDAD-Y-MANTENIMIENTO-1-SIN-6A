import pytest
from busqueda_binaria import busqueda_binaria

# Se utiliza una sola función para ejecutar distintos casos de pruebas simples.
@pytest.mark.parametrize(
    "lista, objetivo, esperado",
    [
        # Caso estándar: valor presente al medio de la lista
        ([1, 3, 5, 7, 9], 5, 2),
        # Caso extremo: valor presente al inicio de la lista
        ([1, 3, 5, 7, 9], 1, 0),
        # Caso extremo: valor presente al final de la lista
        ([1, 3, 5, 7, 9], 9, 4),
        # Caso de búsqueda fallida: valor no está presente (valor intermedio)
        ([1, 3, 5, 7, 9], 4, -1),
        # Caso especial: lista vacía (no se puede encontrar nada)
        ([], 3, -1),
        # Caso límite: lista con un solo elemento — valor encontrado
        ([10], 10, 0),
        # Caso límite: lista con un solo elemento — valor no encontrado
        ([10], 5, -1)
    ]
)
def test_busqueda_binaria(lista, objetivo, esperado):
    resultado = busqueda_binaria(lista, objetivo)
    assert resultado == esperado
