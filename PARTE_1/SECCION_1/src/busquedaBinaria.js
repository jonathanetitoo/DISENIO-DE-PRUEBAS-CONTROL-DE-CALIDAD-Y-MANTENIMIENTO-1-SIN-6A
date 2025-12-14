const dependencias = require("./dependencias");

/**
- Retorna el índice si encuentra, o -1 si no existe.
- Valida tipos y exige orden ascendente.
**/
function busquedaBinaria(arreglo, objetivo) {
  if (!Array.isArray(arreglo)) throw new TypeError("El arreglo debe ser un array");
  if (typeof objetivo !== "number" || Number.isNaN(objetivo)) {
    throw new TypeError("El objetivo debe ser un número válido");
  }

  // Validación: el arreglo debe contener solo números válidos
  for (const valor of arreglo) {
    if (typeof valor !== "number" || Number.isNaN(valor)) {
      throw new TypeError("El arreglo debe contener solo números válidos");
    }
  }

  // Dependencia mockeable
  if (!dependencias.estaOrdenadoAscendente(arreglo)) {
    throw new Error("El arreglo debe estar ordenado de forma ascendente");
  }

  let izquierda = 0;
  let derecha = arreglo.length - 1;

  while (izquierda <= derecha) {
    const medio = Math.floor((izquierda + derecha) / 2);
    const valorMedio = arreglo[medio];

    // Dependencia “inofensiva” pero útil para spy
    dependencias.registrador(`medio=${medio}`);

    if (valorMedio === objetivo) return medio;
    if (valorMedio < objetivo) izquierda = medio + 1;
    else derecha = medio - 1;
  }

  return -1;
}

module.exports = { busquedaBinaria };
