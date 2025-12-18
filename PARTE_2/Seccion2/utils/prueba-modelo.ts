// utils/prueba-modelo.ts
import { calculateReliabilityPrediction } from './reliabilityModel';

// 1. Datos simulados
const datosHistoricos = [
	{ timeIndex: 1, cumulativeFailures: 5 },
	{ timeIndex: 2, cumulativeFailures: 12 },
	{ timeIndex: 3, cumulativeFailures: 18 },
	{ timeIndex: 4, cumulativeFailures: 22 },
	{ timeIndex: 5, cumulativeFailures: 25 },
	{ timeIndex: 6, cumulativeFailures: 27 },
];

console.log('--- 📊 Datos Históricos ---');
console.table(datosHistoricos);

// 2. Ejecutar tu función
const resultado = calculateReliabilityPrediction(datosHistoricos);

console.log('\n--- 🧠 Ecuación del Modelo (Regresión Logarítmica) ---');

// CORRECCIÓN AQUÍ:
// Usamos resultado.model.b (Intercepto/Constante)
// y resultado.model.m (Pendiente/Multiplicador del Logaritmo)
console.log(
	`Fórmula: y = ${resultado.model.b.toFixed(2)} + ${resultado.model.m.toFixed(2)} * ln(x)`
);

console.log('\n--- 🔮 Predicciones para los próximos 5 días ---');
console.table(resultado.predictions);
