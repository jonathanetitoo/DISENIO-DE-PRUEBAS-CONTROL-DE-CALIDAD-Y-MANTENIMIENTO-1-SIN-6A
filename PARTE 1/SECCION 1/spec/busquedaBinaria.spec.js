const dependencias = require("../src/dependencias");
const { busquedaBinaria } = require("../src/busquedaBinaria");
const { createSpy } = require("./helpers/espiaPersonalizado");

describe("busquedaBinaria - funcional", () => {
  it("encuentra un elemento y devuelve su índice", () => {
    expect(busquedaBinaria([1, 3, 5, 7, 9], 7)).toBe(3);
  });

  it("si no existe, devuelve -1", () => {
    expect(busquedaBinaria([1, 2, 3, 4], 10)).toBe(-1);
  });

  it("maneja arreglo vacío", () => {
    expect(busquedaBinaria([], 5)).toBe(-1);
  });
});

describe("busquedaBinaria - mocking con espías personalizados", () => {
  it("fuerza error si estaOrdenadoAscendente retorna false (mock)", () => {
    const spy = createSpy(dependencias, "estaOrdenadoAscendente", () => false);

    expect(() => busquedaBinaria([1, 2, 3], 2))
      .toThrowError("El arreglo debe estar ordenado de forma ascendente");

    expect(spy.count()).toBe(1);

    spy.restore();
  });

  it("espía el registrador y confirma que fue llamado", () => {
    const spy = createSpy(dependencias, "registrador", () => "[registro simulado]");
    const indice = busquedaBinaria([1, 3, 5, 7, 9], 9);

    expect(indice).toBe(4);
    expect(spy.count()).toBeGreaterThan(0);
    expect(spy.lastCall().args[0]).toContain("medio=");

    spy.restore();
  });
});
