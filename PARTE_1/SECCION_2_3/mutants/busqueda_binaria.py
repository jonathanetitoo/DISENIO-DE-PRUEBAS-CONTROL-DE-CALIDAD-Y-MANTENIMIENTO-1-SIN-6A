import icontract
from inspect import signature as _mutmut_signature
from typing import Annotated
from typing import Callable
from typing import ClassVar


MutantDict = Annotated[dict[str, Callable], "Mutant"]


def _mutmut_trampoline(orig, mutants, call_args, call_kwargs, self_arg = None):
    """Forward call to original or mutated function, depending on the environment"""
    import os
    mutant_under_test = os.environ['MUTANT_UNDER_TEST']
    if mutant_under_test == 'fail':
        from mutmut.__main__ import MutmutProgrammaticFailException
        raise MutmutProgrammaticFailException('Failed programmatically')      
    elif mutant_under_test == 'stats':
        from mutmut.__main__ import record_trampoline_hit
        record_trampoline_hit(orig.__module__ + '.' + orig.__name__)
        result = orig(*call_args, **call_kwargs)
        return result
    prefix = orig.__module__ + '.' + orig.__name__ + '__mutmut_'
    if not mutant_under_test.startswith(prefix):
        result = orig(*call_args, **call_kwargs)
        return result
    mutant_name = mutant_under_test.rpartition('.')[-1]
    if self_arg is not None:
        # call to a class method where self is not bound
        result = mutants[mutant_name](self_arg, *call_args, **call_kwargs)
    else:
        result = mutants[mutant_name](*call_args, **call_kwargs)
    return result

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_orig(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] <= lista[i + 1] for i in range(len(lista) - 1))

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_1(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(None)

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_2(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] < lista[i + 1] for i in range(len(lista) - 1))

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_3(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] <= lista[i - 1] for i in range(len(lista) - 1))

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_4(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] <= lista[i + 2] for i in range(len(lista) - 1))

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_5(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] <= lista[i + 1] for i in range(None))

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_6(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] <= lista[i + 1] for i in range(len(lista) + 1))

# Se plantea el contrato básico del algoritmo, necesario para el contract testing 
def x__esta_ordenada_no_decreciente__mutmut_7(lista):
    # Aquí se valida que la lista esté ordenada (permite duplicados)
    return all(lista[i] <= lista[i + 1] for i in range(len(lista) - 2))

x__esta_ordenada_no_decreciente__mutmut_mutants : ClassVar[MutantDict] = {
'x__esta_ordenada_no_decreciente__mutmut_1': x__esta_ordenada_no_decreciente__mutmut_1, 
    'x__esta_ordenada_no_decreciente__mutmut_2': x__esta_ordenada_no_decreciente__mutmut_2, 
    'x__esta_ordenada_no_decreciente__mutmut_3': x__esta_ordenada_no_decreciente__mutmut_3, 
    'x__esta_ordenada_no_decreciente__mutmut_4': x__esta_ordenada_no_decreciente__mutmut_4, 
    'x__esta_ordenada_no_decreciente__mutmut_5': x__esta_ordenada_no_decreciente__mutmut_5, 
    'x__esta_ordenada_no_decreciente__mutmut_6': x__esta_ordenada_no_decreciente__mutmut_6, 
    'x__esta_ordenada_no_decreciente__mutmut_7': x__esta_ordenada_no_decreciente__mutmut_7
}

def _esta_ordenada_no_decreciente(*args, **kwargs):
    result = _mutmut_trampoline(x__esta_ordenada_no_decreciente__mutmut_orig, x__esta_ordenada_no_decreciente__mutmut_mutants, args, kwargs)
    return result 

_esta_ordenada_no_decreciente.__signature__ = _mutmut_signature(x__esta_ordenada_no_decreciente__mutmut_orig)
x__esta_ordenada_no_decreciente__mutmut_orig.__name__ = 'x__esta_ordenada_no_decreciente'

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
