# test_password_validation.py
import pytest

def validar_contraseña(pwd, diccionario):
    """
    Valida una contraseña según su longitud (6-10 caracteres)
    y si no está en un diccionario de contraseñas comunes.
    """
    if len(pwd) < 6 or len(pwd) > 10:
        return "Error: Longitud inválida"
    if pwd in diccionario:
        return "Error: Contraseña común"
    return "Contraseña válida"

# Diccionario de contraseñas no permitidas
diccionario_comun = ["123456", "password", "qwerty", "admin"]

@pytest.mark.parametrize("pwd, esperado", [
    ("python7", "Contraseña válida"), # Caso válido
    ("123", "Error: Longitud inválida"), # Longitud muy corta
    ("1234567891011", "Error: Longitud inválida"), # Longitud muy larga
    ("password", "Error: Contraseña común") # En el diccionario
])
def test_validar_contraseña(pwd, esperado):
    """Prueba la función de validación de contraseñas."""
    assert validar_contraseña(pwd, diccionario_comun) == esperado
