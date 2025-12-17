/**
Aquí se reemplaza temporalmente un método de un objeto para:
- Registrar cuántas veces se llamó y con qué argumentos.
- Cambiar su comportamiento usando una implementación falsa.
**/
function createSpy(obj, methodName, fakeImpl) {
  // Validación mínima para evitar errores silenciosos en tests.
  if (!obj) throw new Error("El objeto es obligatorio");

  // Aquí se asegura de que exista el método y que sea una función.
  if (typeof obj[methodName] !== "function") {
    throw new Error(`El método ${methodName} debe existir y ser una función`);
  }

  // Se guarda el método original para poder restaurarlo después.
  const original = obj[methodName];

  // Aquí se almacena el historial de llamadas (argumentos).
  const calls = [];

  // Se reemplaza el método original por una función “envoltura”.
  obj[methodName] = function (...args) {
    // Se registran los argumentos de cada llamada.
    calls.push({ args });

    // Si se provee una implementación falsa, se usa esa mock.
    if (fakeImpl) return fakeImpl.apply(this, args);

    // Si no es el caso, se delega al método original.
    return original.apply(this, args);
  };

  // Se devuelve una pequeña API para inspeccionar y restaurar.
  return {
    calls,
    // Se obtiene la cantidad de veces que se llamó al método.
    count: () => calls.length,
    // Se obtiene la última llamada registrada, la cual es útil para validar argumentos.
    lastCall: () => (calls.length ? calls[calls.length - 1] : null),
    // Aquí se restaura el método original, lo cual es clave para no afectar otras pruebas.
    restore: () => {
      obj[methodName] = original;
    },
  };
}

// Se exporta para poder usarlo desde los archivos .spec.js.
module.exports = { createSpy };
