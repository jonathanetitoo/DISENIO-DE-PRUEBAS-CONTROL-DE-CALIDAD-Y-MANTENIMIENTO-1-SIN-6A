# test_bicicletas.py
import pytest

def calcular_beneficio(es_miembro, cumplio_plazo, veces_renta):
    """
    Calcula el beneficio para un cliente de renta de bicicletas
    basado en las reglas de causa-efecto.
    """
    if es_miembro and cumplio_plazo:
        if veces_renta >= 15:
            return "20% descuento y camiseta"  # R2
        else:
            return "20% descuento"  # R1
    else:
        return "Sin beneficio"  # R3 y R4

@pytest.mark.parametrize("miembro, plazo, veces, esperado", [
    # R1: Miembro, cumple plazo, menos de 15 rentas
    (True, True, 10, "20% descuento"),
    # R2: Miembro, cumple plazo, 15 o más rentas
    (True, True, 15, "20% descuento y camiseta"),
    # R3: Miembro, no cumple plazo
    (True, False, 15, "Sin beneficio"),
    # R4: No es miembro
    (False, True, 20, "Sin beneficio")
])
def test_calcular_beneficio(miembro, plazo, veces, esperado):
    """Prueba las reglas de negocio para beneficios de renta."""
    assert calcular_beneficio(miembro, plazo, veces) == esperado
