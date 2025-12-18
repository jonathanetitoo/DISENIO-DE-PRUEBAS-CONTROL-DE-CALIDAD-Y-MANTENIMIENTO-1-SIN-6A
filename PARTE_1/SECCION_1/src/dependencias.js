/**
Verifica si el arreglo está ordenado de forma ascendente.
Se separa como "dependencia" para poder mockearla en pruebas con createSpy
(como por ejemplo, forzar que retorne false y comprobar el manejo de errores).
**/
function estaOrdenadoAscendente(arreglo) {
  for (let i = 1; i < arreglo.length; i++) {
    // Si algún elemento anterior es mayor que el actual, no está ordenado
    if (arreglo[i - 1] > arreglo[i]) return false;
  }
  return true;
}

/**
Función simple de registro.
Esto no es un logger real como tal, es decir, se usa para demostrar que podemos espiar llamadas
(verificar cuántas veces se llamó y con qué argumento).
**/
function registrador(mensaje) {
  return `[registro] ${mensaje}`;
}

// Aquí se exporta ambas funciones para que busquedaBinaria las use y puedan ser espiadas en tests
module.exports = { estaOrdenadoAscendente, registrador };
