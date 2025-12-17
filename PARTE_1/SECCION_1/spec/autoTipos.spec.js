// Se importa la función principal a probar (busqueda binaria).
const { busquedaBinaria } = require("../src/busquedaBinaria");

/**
Aquí la idea es generar pruebas automáticamente a partir de estos casos,
en lugar de escribir un it(...) manual por cada escenario.
**/
const casosPorTipo = {
  // Casos donde el parámetro "arreglo" no es un array válido
  arregloInvalido: [
    { nombre: "null", valor: null },
    { nombre: "string", valor: "no-es-array" },
    { nombre: "objeto", valor: { a: 1 } },
    { nombre: "número", valor: 123 },
  ],

  // Casos donde el "objetivo" no es un número válido.
  objetivoInvalido: [
    { nombre: "string", valor: "7" },
    { nombre: "null", valor: null },
    { nombre: "NaN", valor: NaN },
    { nombre: "objeto", valor: { x: 1 } },
  ],

  // Casos donde el array existe, pero sus elementos no cumplen el tipo esperado.
  elementosInvalidos: [
    { nombre: "elemento string", valor: [1, "2", 3] },
    { nombre: "elemento NaN", valor: [1, NaN, 3] },
    { nombre: "elemento objeto", valor: [1, { a: 2 }, 3] },
  ],
};

describe("Auto-pruebas por tipos - busquedaBinaria", () => {
  // Por cada caso inválido de arreglo, se crea
  // un it(...) dinámico que verifique que se lanza TypeError.
  casosPorTipo.arregloInvalido.forEach(({ nombre, valor }) => {
    it(`lanza TypeError si el arreglo es ${nombre}`, () => {
      expect(() => busquedaBinaria(valor, 2)).toThrowError(TypeError);
    });
  });

  // Aquí se Genera automáticamente para el objetivo inválido
  casosPorTipo.objetivoInvalido.forEach(({ nombre, valor }) => {
    it(`lanza TypeError si el objetivo es ${nombre}`, () => {
      expect(() => busquedaBinaria([1, 2, 3], valor)).toThrowError(TypeError);
    });
  });

  // Aquí se genera automáticamente para el array con elementos inválidos
  casosPorTipo.elementosInvalidos.forEach(({ nombre, valor }) => {
    it(`lanza TypeError si el arreglo contiene ${nombre}`, () => {
      expect(() => busquedaBinaria(valor, 2)).toThrowError(TypeError);
    });
  });
});
