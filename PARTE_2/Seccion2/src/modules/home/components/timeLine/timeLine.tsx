import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getDotColor, getCategoryColor } from './timeLineUtils';
import { Activity } from './timeLineData';

interface TimelineDotProps {
	category: string;
}

export function TimelineDot({ category }: TimelineDotProps) {
	return (
		<div
			className={`absolute left-0 md:left-[80px] top-5 w-4 h-4 rounded-full z-10 transform -translate-x-1/2 ${getDotColor(category)}`}
		></div>
	);
}

interface MonthMarkerProps {
	month: string;
}

export function MonthMarker({ month }: MonthMarkerProps) {
	return (
		<div className="relative pl-8 md:pl-[120px] mb-6">
			<div className="absolute left-0 md:left-[80px] top-1/2 w-6 h-6 rounded-full bg-primary z-10 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
				<div className="w-2 h-2 bg-white rounded-full"></div>
			</div>
			<h2 className="text-xl font-bold bg-muted inline-block px-4 py-2 rounded-3xl">
				{month}
			</h2>
		</div>
	);
}

interface ActivityCardProps {
	activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
	return (
		<div className="relative pl-8 md:pl-[120px]">
			<TimelineDot category={activity.category} />

			<div className="bg-card shadow-md rounded-3xl p-5 ml-4 md:ml-0">
				{/* Fecha siempre en la parte superior */}
				<div className="text-sm font-medium text-muted-foreground mb-2">
					{activity.date}
				</div>

				{/* Contenido flexible para nombre y categoría */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
					<h3 className="font-medium text-lg">{activity.name}</h3>
					<Badge
						className="font-normal bg-transparent" // Fondo transparente
					>
						<span className={`text-lg ${getCategoryColor(activity.category)}`}>
							{activity.category}
						</span>
					</Badge>
				</div>
			</div>
		</div>
	);
}
