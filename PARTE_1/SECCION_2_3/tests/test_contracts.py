# Aquí se utiliza la libreria icontract para cumplir con contract testing.
import pytest
import icontract
from busqueda_binaria import busqueda_binaria

#Aqui se plantean los casos de prueba.
def test_contrato_falla_si_lista_no_esta_ordenada():
    # Aquí si no se cumple la precondición (lista ordenada), debe fallar
    with pytest.raises(icontract.ViolationError):
        busqueda_binaria([3, 1, 2], 1)

def test_contrato_pasa_con_lista_ordenada():
    # Con la precondición cumplida, el contrato garantiza resultados coherentes
    assert busqueda_binaria([1, 2, 3, 4], 3) == 2
    assert busqueda_binaria([1, 2, 3, 4], 99) == -1

def test_contrato_acepta_lista_ordenada_con_duplicados():
    # La precondición permite duplicados (no-decreciente), así que cualquier índice válido sirve
    assert busqueda_binaria([1, 1, 2, 2, 3], 2) in (2, 3)

def test_contrato_detecta_desorden_en_el_ultimo_par():
    # Otro ejemplo de violación el cual si el desorden puede estar al final y debe detectarse igual
    with pytest.raises(icontract.ViolationError):
        busqueda_binaria([1, 2, 3, 0], 2)
