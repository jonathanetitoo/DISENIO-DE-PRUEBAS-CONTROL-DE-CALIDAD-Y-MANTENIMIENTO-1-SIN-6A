import icontract

def _esta_ordenada_no_decreciente(lista):
    return all(lista[i] <= lista[i + 1] for i in range(len(lista) - 1))

@icontract.require(lambda lista: _esta_ordenada_no_decreciente(lista))
@icontract.ensure(
    lambda lista, objetivo, result:
        (result == -1 and objetivo not in lista)
        or (0 <= result < len(lista) and lista[result] == objetivo)
)
def busqueda_binaria(lista, objetivo):
    """
    Realiza una búsqueda binaria en una lista ordenada.

    Retorna:
    - Índice del objetivo si se encuentra en la lista; -1 si no está presente.
    """
    izquierda = 0
    derecha = len(lista) - 1

    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        if lista[medio] == objetivo:
            return medio
        elif lista[medio] < objetivo:
            izquierda = medio + 1
        else:
            derecha = medio - 1

    return -1
