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
