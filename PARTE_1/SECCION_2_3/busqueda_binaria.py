import icontract

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def _esta_ordenada_no_decreciente(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] <= lista[i + 1] for i in range(len(lista) - 1))

# Precondición: la búsqueda binaria asume lista ordenada
@icontract.require(lambda lista: _esta_ordenada_no_decreciente(lista))

# Postcondición: el resultado debe ser coherente (-1 si no está, o índice válido si está)
@icontract.ensure(
    lambda lista, objetivo, result:
        (result == -1 and objetivo not in lista)
        or (0 <= result < len(lista) and lista[result] == objetivo)
)

# Se plantea el algoritmo de busqueda binaria tal cual como se uso en los autónomos anteriores.
def busqueda_binaria(lista, objetivo):
    """
    Realiza una búsqueda binaria en una lista ordenada.
    Retorna el índice si encuentra el objetivo; -1 si no.
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
