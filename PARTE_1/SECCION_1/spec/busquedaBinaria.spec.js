// Aquí se importan las dependencias para poder mockearlas en pruebas, 
// el algoritmo principal y el mini framework con spy personalizado.
const dependencias = require("../src/dependencias");
const { busquedaBinaria } = require("../src/busquedaBinaria");
const { createSpy } = require("./helpers/espiaPersonalizado");

describe("busquedaBinaria - funcional", () => {
  // Se realiza una prueba básica basada en un caso exitoso (elemento presente).
  it("encuentra un elemento y devuelve su índice", () => {
    expect(busquedaBinaria([1, 3, 5, 7, 9], 7)).toBe(3);
  });

  // Se realiza una prueba básica basada en un caso no encontrado.
  it("si no existe, devuelve -1", () => {
    expect(busquedaBinaria([1, 2, 3, 4], 10)).toBe(-1);
  });

  // Se realiza una prueba de borde basada en un arreglo vacío.
  it("maneja arreglo vacío", () => {
    expect(busquedaBinaria([], 5)).toBe(-1);
  });
});

describe("busquedaBinaria - mocking con espías personalizados", () => {
  it("fuerza error si estaOrdenadoAscendente retorna false (mock)", () => {
    // Aquí se reemplaza temporalmente estaOrdenadoAscendente para simular "arreglo desordenado"
    // sin tener que cambiar el algoritmo o pasar un arreglo realmente desordenado.
    const spy = createSpy(dependencias, "estaOrdenadoAscendente", () => false);

    // Se verifica que el algoritmo reaccione correctamente (lanzando el error esperado).
    expect(() => busquedaBinaria([1, 2, 3], 2))
      .toThrowError("El arreglo debe estar ordenado de forma ascendente");

    // Se valida que la dependencia fue consultada exactamente una vez.
    expect(spy.count()).toBe(1);

    // Aquí se restaura el método original para no afectar otras pruebas
    spy.restore();
  });

  it("espía el registrador y confirma que fue llamado", () => {
    // Aquí se "espia" el registrador para confirmar que el algoritmo va
    // avanzando por medias ("medio=") y para contar cuántas veces se llamó.
    const spy = createSpy(dependencias, "registrador", () => "[registro simulado]");
    const indice = busquedaBinaria([1, 3, 5, 7, 9], 9);

    // Se obtiene el resultado funcional correcto.
    expect(indice).toBe(4);

    // Aquí se llama al registrador al menos una vez.
    expect(spy.count()).toBeGreaterThan(0);

    // Se comprueba que el mensaje incluye el patrón esperado.
    expect(spy.lastCall().args[0]).toContain("medio=");

    // Restauración para no “contaminar” otras pruebas (al igual que antes).
    spy.restore();
  });
});
