const { busquedaBinaria } = require("../src/busquedaBinaria");

const casosPorTipo = {
  arregloInvalido: [
    { nombre: "null", valor: null },
    { nombre: "string", valor: "no-es-array" },
    { nombre: "objeto", valor: { a: 1 } },
    { nombre: "número", valor: 123 },
  ],
  objetivoInvalido: [
    { nombre: "string", valor: "7" },
    { nombre: "null", valor: null },
    { nombre: "NaN", valor: NaN },
    { nombre: "objeto", valor: { x: 1 } },
  ],
  elementosInvalidos: [
    { nombre: "elemento string", valor: [1, "2", 3] },
    { nombre: "elemento NaN", valor: [1, NaN, 3] },
    { nombre: "elemento objeto", valor: [1, { a: 2 }, 3] },
  ],
};

describe("Auto-pruebas por tipos - busquedaBinaria", () => {
  casosPorTipo.arregloInvalido.forEach(({ nombre, valor }) => {
    it(`lanza TypeError si el arreglo es ${nombre}`, () => {
      expect(() => busquedaBinaria(valor, 2)).toThrowError(TypeError);
    });
  });

  casosPorTipo.objetivoInvalido.forEach(({ nombre, valor }) => {
    it(`lanza TypeError si el objetivo es ${nombre}`, () => {
      expect(() => busquedaBinaria([1, 2, 3], valor)).toThrowError(TypeError);
    });
  });

  casosPorTipo.elementosInvalidos.forEach(({ nombre, valor }) => {
    it(`lanza TypeError si el arreglo contiene ${nombre}`, () => {
      expect(() => busquedaBinaria(valor, 2)).toThrowError(TypeError);
    });
  });
});