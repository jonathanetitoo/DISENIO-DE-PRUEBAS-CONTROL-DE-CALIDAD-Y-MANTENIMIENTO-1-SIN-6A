// Se importa dependencias separadas para poder mockearlas en pruebas (con createSpy).
const dependencias = require("./dependencias");

/**
 * busquedaBinaria(arreglo, objetivo)
- Retorna el índice si encuentra el objetivo, o -1 si no existe.
- Incluye validaciones de tipos y exige que el arreglo esté ordenado ascendentemente.
 **/
function busquedaBinaria(arreglo, objetivo) {
  // En la validacion principal se espera un array.
  if (!Array.isArray(arreglo)) throw new TypeError("El arreglo debe ser un array");

  // En la validación del objetivo debe ser número y no NaN.
  if (typeof objetivo !== "number" || Number.isNaN(objetivo)) {
    throw new TypeError("El objetivo debe ser un número válido");
  }

  // En la validación de contenido todos los elementos deben ser números válidos.
  // Esto ayuda a que las pruebas por tipos sean claras y controladas.
  for (const valor of arreglo) {
    if (typeof valor !== "number" || Number.isNaN(valor)) {
      throw new TypeError("El arreglo debe contener solo números válidos");
    }
  }

  // Si se cambia su comportamiento con un spy, se puede
  // simular arreglos "desordenados" sin cambiar el algoritmo.
  if (!dependencias.estaOrdenadoAscendente(arreglo)) {
    throw new Error("El arreglo debe estar ordenado de forma ascendente");
  }

  // Punteros para la búsqueda binaria.
  let izquierda = 0;
  let derecha = arreglo.length - 1;

  // Mientras el rango sea válido, se sigue buscando.
  while (izquierda <= derecha) {
    // Se calcula la posición media sin decimales.
    const medio = Math.floor((izquierda + derecha) / 2);
    const valorMedio = arreglo[medio];

    // Esta dependencia util para spy permite comprobar
    // desde tests que el algoritmo avanzó por ciertos puntos.
    dependencias.registrador(`medio=${medio}`);

    // Comparaciones típicas de la búsqueda binaria.
    if (valorMedio === objetivo) return medio;
    if (valorMedio < objetivo) izquierda = medio + 1;
    else derecha = medio - 1;
  }
  return -1;
}

// Se esporta la función para usarla desde las pruebas (Jasmine).
module.exports = { busquedaBinaria };
