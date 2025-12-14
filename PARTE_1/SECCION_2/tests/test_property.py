from hypothesis import given, strategies as st
from PARTE_1.SECCION_2.busqueda_binaria import busqueda_binaria

# Aqui se generan listas de enteros, para luego ordenarlas
@given(st.lists(st.integers(), min_size=0).map(sorted), st.integers())
def test_propiedad_indice_valido_o_menos_uno(lista, objetivo):
    idx = busqueda_binaria(lista, objetivo)

    # En la propiedad 1 si devuelve -1, el objetivo NO está en la lista
    if idx == -1:
        assert objetivo not in lista
    else:
        # En la propiedad 2 si devuelve un índice, debe ser válido y apuntar al objetivo
        assert 0 <= idx < len(lista)
        assert lista[idx] == objetivo


# En este caso, si la lista es estrictamente creciente (sin duplicados),
# el índice debe coincidir con la posición real.
@given(st.lists(st.integers(), unique=True, min_size=0).map(sorted), st.integers())
def test_propiedad_con_lista_sin_duplicados(lista, objetivo):
    idx = busqueda_binaria(lista, objetivo)

    if objetivo in lista:
        assert idx == lista.index(objetivo)
    else:
        assert idx == -1
