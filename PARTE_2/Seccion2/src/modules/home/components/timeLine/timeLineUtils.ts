// data.ts - Archivo para datos y tipos
export interface Activity {
	name: string;
	category: string;
	date: string;
}

export interface MonthActivities {
	month: string;
	activities: Activity[];
}

// Datos de muestra para la línea de tiempo anual
export const activities: MonthActivities[] = [
	{
		month: 'Enero',
		activities: [
			{
				name: 'Planificación anual',
				category: 'Administración',
				date: '5 Ene',
			},
			{ name: 'Reunión de equipo', category: 'Interno', date: '15 Ene' },
			{ name: 'Revisión de presupuesto', category: 'Finanzas', date: '25 Ene' },
		],
	},
	{
		month: 'Febrero',
		activities: [
			{
				name: 'Capacitación de personal',
				category: 'Formación',
				date: '10 Feb',
			},
			{
				name: 'Lanzamiento de producto',
				category: 'Marketing',
				date: '20 Feb',
			},
		],
	},
];
// utils.ts - Archivo para funciones utilitarias

// Mapa de categorías a colores para badges
export const categoryColorMap: Record<string, string> = {
	Administración:
		'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-xs',
	Interno:
		'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-2 py-1 rounded-full text-xs',
	Finanzas:
		'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 px-2 py-1 rounded-full text-xs',
	Formación:
		'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 px-2 py-1 rounded-full text-xs',
	Marketing:
		'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100 px-2 py-1 rounded-full text-xs px-2 py-1 rounded-full text-xs',
	Relaciones:
		'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100 px-2 py-1 rounded-full text-xs',
	Producción:
		'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 px-2 py-1 rounded-full text-xs',
	RRHH: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100 px-2 py-1 rounded-full text-xs',
	Ventas:
		'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100 px-2 py-1 rounded-full text-xs',
	Operaciones:
		'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 px-2 py-1 rounded-full text-xs',
	Dirección:
		'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100',
};

// Mapa de categorías a colores para puntos en la línea de tiempo
export const dotColorMap: Record<string, string> = {
	Administración: 'bg-blue-500',
	Interno: 'bg-green-500',
	Finanzas: 'bg-purple-500',
	Formación: 'bg-yellow-500',
	Marketing: 'bg-pink-500',
	Relaciones: 'bg-indigo-500',
	Producción: 'bg-red-500',
	RRHH: 'bg-orange-500',
	Ventas: 'bg-cyan-500',
	Operaciones: 'bg-gray-500',
	Dirección: 'bg-emerald-500',
};

// Función para obtener el color del badge según la categoría
export function getCategoryColor(category: string): string {
	return (
		categoryColorMap[category] ||
		'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
	);
}

// Función para obtener el color del punto según la categoría
export function getDotColor(category: string): string {
	return dotColorMap[category] || 'bg-gray-500';
}
