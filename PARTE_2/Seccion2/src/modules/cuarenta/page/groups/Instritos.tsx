'use client';

import { useState } from 'react';
import { useGrup, TeamData } from '@/modules/sheets/usegrup';
import { EventCard } from './EvenCard';
import { TeamDetailsModal } from './TeamDetailsModal';

function TeamsViewPage() {
	const { teams, loading, error } = useGrup();
	const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
					<p className="text-muted-foreground">Cargando equipos...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center space-y-2">
					<p className="text-destructive text-lg font-semibold">Error</p>
					<p className="text-muted-foreground">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-4 md:p-6 flex justify-center">
			<div className="w-full max-w-7xl mx-auto">
				{/* Grid de Cards */}
				{teams.length === 0 ? (
					<div className="text-center py-12">
						<span className="text-6xl mb-4 block">🎴</span>
						<p className="text-muted-foreground">
							No hay equipos inscritos todavía
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{teams.map((team) => (
							<EventCard
								key={team.id}
								team={team}
								onClick={() => {
									setSelectedTeam(team);
								}}
							/>
						))}
					</div>
				)}

				{/* Modal de Detalles */}
				{selectedTeam && (
					<TeamDetailsModal
						team={selectedTeam}
						onClose={() => {
							setSelectedTeam(null);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default TeamsViewPage;
