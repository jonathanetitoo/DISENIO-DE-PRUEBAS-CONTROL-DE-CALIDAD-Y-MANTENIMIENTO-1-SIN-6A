'use client';

import { useMemo } from 'react';
import { useGrup, TeamData } from '@/modules/sheets/usegrup';

interface Match {
	mesa: number;
	pareja1: TeamData;
	pareja2: TeamData;
}

function TournamentBracket() {
	const { teams, loading, error } = useGrup();

	// Generar solo primera ronda
	const firstRound = useMemo(() => {
		if (teams.length < 2) return [];

		const matches: Match[] = [];
		const availableTeams = [...teams];
		let mesaCounter = 1;

		// Crear parejas de 2 en 2
		for (let i = 0; i < availableTeams.length; i += 2) {
			if (i + 1 < availableTeams.length) {
				matches.push({
					mesa: mesaCounter,
					pareja1: availableTeams[i],
					pareja2: availableTeams[i + 1],
				});
				mesaCounter++;
			}
		}

		return matches;
	}, [teams]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-3 h-3 bg-(--text-color) animate-pulse" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-(--text-color-error) font-mono text-xs">{error}</p>
			</div>
		);
	}

	if (teams.length < 2) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4">
				<div className="border-2 border-(--text-color) p-4">
					<p className="text-(--text-color) text-xs font-mono uppercase tracking-wider">
						MIN 2 EQUIPOS
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-12 border-b-4 border-(--text-color) pb-6">
					<h1 className="text-4xl md:text-6xl font-black text-(--text-color) uppercase tracking-tight leading-none mb-2">
						ENFRENT
						<br />
						AMIENTOS
					</h1>
					<div className="pt-5 flex gap-4 text-xs font-mono uppercase tracking-widest text-(--text-color-secondary)">
						<span className="bg-(--text-color) text-background px-2 py-1">
							{firstRound.length} MESAS
						</span>
						<span className="border border-(--text-color-secondary) px-2 py-1">
							{teams.length} EQUIPOS
						</span>
					</div>
				</div>

				{/* Grid Brutalista */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
					{firstRound.map((match, index) => (
						<div
							key={match.mesa}
							className="relative border-4 border-(--text-color) bg-background 
							hover:bg-(--text-color) hover:text-background 
							transition-all duration-150 group"
							style={{
								transform:
									index % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)',
							}}
						>
							{/* Número de mesa - brutal y directo */}
							<div className="absolute -top-4 -right-4 w-12 h-12 bg-(--text-color) border-4 border-background flex items-center justify-center z-10">
								<span className="text-2xl font-black text-background">
									{match.mesa}
								</span>
							</div>

							<div className="p-6">
								{/* Pareja 1 */}
								<div className="mb-8 relative">
									<div className="absolute -left-6 top-0 w-1 h-full bg-(--text-color) group-hover:bg-background" />

									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-baseline gap-2 mb-3">
												<span className="text-3xl font-black text-(--text-color) group-hover:text-background">
													01
												</span>
												<h3 className="text-lg font-bold text-(--text-color) uppercase tracking-tight group-hover:text-background break-word">
													{match.pareja1.teamName}
												</h3>
											</div>
											<div className="space-y-1 pl-12 border-l-2 border-(--text-color-muted) group-hover:border-background">
												<p className="text-xs font-mono text-(--text-color-secondary) group-hover:text-background opacity-70">
													{match.pareja1.participants.participant1.name}
												</p>
												<p className="text-xs font-mono text-(--text-color-secondary) group-hover:text-background opacity-70">
													{match.pareja1.participants.participant2.name}
												</p>
											</div>
										</div>

										{match.pareja1.pagado && (
											<div className="w-6 h-6 bg-(--color) dark:bg-(--button-hover-bg) flex items-center justify-center">
												<span className="text-background text-xs font-black">
													✓
												</span>
											</div>
										)}
									</div>
								</div>

								{/* Separador VS Brutalista */}
								<div className="relative my-6 h-12 flex items-center justify-center">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t-2 border-dashed border-(--text-color-muted) group-hover:border-background" />
									</div>
									<div className="relative bg-background px-4 group-hover:bg-(--text-color)">
										<span className="text-2xl font-black text-(--text-color) group-hover:text-background tracking-widest">
											VS
										</span>
									</div>
								</div>

								{/* Pareja 2 */}
								<div className="relative">
									<div className="absolute -right-6 top-0 w-1 h-full bg-(--text-color) group-hover:bg-background" />

									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-baseline gap-2 mb-3">
												<span className="text-3xl font-black text-(--text-color) group-hover:text-background">
													02
												</span>
												<h3 className="text-lg font-bold text-(--text-color) uppercase tracking-tight group-hover:text-background break-word">
													{match.pareja2.teamName}
												</h3>
											</div>
											<div className="space-y-1 pl-12 border-l-2 border-(--text-color-muted) group-hover:border-background">
												<p className="text-xs font-mono text-(--text-color-secondary) group-hover:text-background opacity-70">
													{match.pareja2.participants.participant1.name}
												</p>
												<p className="text-xs font-mono text-(--text-color-secondary) group-hover:text-background opacity-70">
													{match.pareja2.participants.participant2.name}
												</p>
											</div>
										</div>

										{match.pareja2.pagado && (
											<div className="w-6 h-6 bg-(--color) dark:bg-(--button-hover-bg) flex items-center justify-center">
												<span className="text-background text-xs font-black">
													✓
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Footer Brutalista */}
				<div className="mt-16 border-t-4 border-(--text-color) pt-6">
					<p className="text-xs font-mono text-(--text-color-muted) uppercase tracking-widest">
						RONDA 01 / CUARENTA TOURNAMENT
					</p>
				</div>
			</div>
		</div>
	);
}

export default TournamentBracket;
