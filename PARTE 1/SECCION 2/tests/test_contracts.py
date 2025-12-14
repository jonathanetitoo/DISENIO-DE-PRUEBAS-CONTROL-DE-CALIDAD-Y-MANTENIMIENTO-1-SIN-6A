import pytest
import icontract
from busqueda_binaria import busqueda_binaria


def test_contrato_falla_si_lista_no_esta_ordenada():
    with pytest.raises(icontract.ViolationError):
        busqueda_binaria([3, 1, 2], 1)

def test_contrato_pasa_con_lista_ordenada():
    assert busqueda_binaria([1, 2, 3, 4], 3) == 2
    assert busqueda_binaria([1, 2, 3, 4], 99) == -1

def test_contrato_acepta_lista_ordenada_con_duplicados():
    assert busqueda_binaria([1, 1, 2, 2, 3], 2) in (2, 3)

def test_contrato_detecta_desorden_en_el_ultimo_par():
    with pytest.raises(icontract.ViolationError):
        busqueda_binaria([1, 2, 3, 0], 2)
