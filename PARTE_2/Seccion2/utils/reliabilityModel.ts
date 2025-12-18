// utils/reliabilityModel.ts
import * as ss from 'simple-statistics';

interface TestData {
	timeIndex: number; // Día 1, Día 2, etc.
	cumulativeFailures: number; // Fallos acumulados encontrados por Jest/Playwright
}

export const calculateReliabilityPrediction = (data: TestData[]) => {
	// 1. Extraer pares de datos (x = tiempo, y = fallos)
	const points = data.map((d) => [d.timeIndex, d.cumulativeFailures]);

	// 2. Crear una regresión logarítmica (simulando modelo de crecimiento)
	// y = a + b * ln(x)
	// Transform x values using logarithm for logarithmic regression
	const logPoints = data.map((d) => [
		Math.log(d.timeIndex),
		d.cumulativeFailures,
	]);
	const regressionModel = ss.linearRegression(logPoints);

	// 3. Predecir fallos para los próximos 5 días
	const futurePredictions = [];
	const lastDay = data[data.length - 1].timeIndex;

	for (let i = 1; i <= 5; i++) {
		const nextDay = lastDay + i;
		// La función predict nos da el estimado
		const predictedFailures =
			regressionModel.m * Math.log(nextDay) + regressionModel.b;

		futurePredictions.push({
			timeIndex: nextDay,
			cumulativeFailures: predictedFailures,
			isPrediction: true,
		});
	}

	return { model: regressionModel, predictions: futurePredictions };
};
