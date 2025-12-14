function estaOrdenadoAscendente(arreglo) {
  for (let i = 1; i < arreglo.length; i++) {
    if (arreglo[i - 1] > arreglo[i]) return false;
  }
  return true;
}

function registrador(mensaje) {
  // intencionalmente simple
  return `[registro] ${mensaje}`;
}

module.exports = { estaOrdenadoAscendente, registrador };
