'use client';

import Image from 'next/image';
import React from 'react';
import { Check, X, Trash2, Phone as PhoneIcon } from 'lucide-react';
import { useGrup, TeamData } from './usegrup';

const TeamNameCell: React.FC<{ team: TeamData }> = ({ team }) => (
	<div className="flex flex-col">
		<span className="text-foreground font-semibold text-sm">
			{team.teamName}
		</span>
	</div>
);

const ParticipantCell: React.FC<{ name: string }> = ({ name }) => (
	<div className="flex items-center gap-3">
		<span className="text-foreground text-sm font-medium">{name}</span>
	</div>
);

const CourseCell: React.FC<{ course: string }> = ({ course }) => (
	<span className="text-secondary-foreground text-sm">{course}</span>
);

const CarreraCell: React.FC<{ carrera: string }> = ({ carrera }) => (
	<span className="text-secondary-foreground text-sm">{carrera}</span>
);

const ContactCell: React.FC<{ phone: string }> = ({ phone }) => (
	<div className="flex items-center gap-1.5 text-muted-foreground text-xs">
		<PhoneIcon className="w-3.5 h-3.5" />
		<span className="font-mono">{phone}</span>
	</div>
);

const PaymentMethodCell: React.FC<{ method: string }> = ({ method }) => (
	<span className="inline-flex items-center px-2.5 py-1 rounded-md bg-input text-foreground text-xs font-medium border border-border">
		{method}
	</span>
);

const DateCell: React.FC<{
	timestamp: string;
	formatDate: (ts: string) => string;
}> = ({ timestamp, formatDate }) => (
	<span className="text-muted-foreground text-xs whitespace-nowrap">
		{formatDate(timestamp)}
	</span>
);

const StatusCell: React.FC<{
	team: TeamData;
	onToggle: (id: string, pagado: boolean) => void;
}> = ({ team, onToggle }) => (
	<button
		onClick={() => {
			onToggle(team.id, team.pagado);
		}}
		className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
			team.pagado
				? 'bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20'
				: 'bg-destructive/10 text-destructive hover:bg-destructive/20'
		}`}
	>
		{team.pagado ? (
			<>
				<Check className="w-3.5 h-3.5" /> Pagado
			</>
		) : (
			<>
				<X className="w-3.5 h-3.5" /> Pendiente
			</>
		)}
	</button>
);

const ActionsCell: React.FC<{
	team: TeamData;
	onToggle: (id: string, pagado: boolean) => void;
	onDelete: (id: string) => void;
}> = ({ team, onToggle, onDelete }) => (
	<div className="flex items-center justify-center gap-2">
		<button
			onClick={() => {
				onToggle(team.id, team.pagado);
			}}
			className={`p-1.5 rounded-md transition-all hover:scale-105 ${
				team.pagado
					? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20'
					: 'bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20'
			}`}
			title={team.pagado ? 'Marcar como no pagado' : 'Marcar como pagado'}
		>
			{team.pagado ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
		</button>
		<button
			onClick={() => {
				if (
					window.confirm(
						`¿Estás seguro de eliminar al equipo "${team.teamName}"?`
					)
				) {
					onDelete(team.id);
				}
			}}
			className="p-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all hover:scale-105"
			title="Eliminar equipo"
		>
			<Trash2 className="w-4 h-4" />
		</button>
	</div>
);

// --- Tipos y Configuración ---

interface ColumnConfig {
	header: string;
	cell: (team: TeamData) => React.ReactNode;
	textAlign?: 'left' | 'center' | 'right';
}

interface ParticipantConfig {
	key: 'participant1' | 'participant2';
	label: string;
}

// --- Componente Principal ---

export default function GrupManagement() {
	const { teams, loading, togglePayment, deleteTeam, formatDate } = useGrup();

	// Configuración de participantes (dinámico)
	const participants: ParticipantConfig[] = [
		{ key: 'participant1', label: 'Participante 1' },
		{ key: 'participant2', label: 'Participante 2' },
	];

	// Generar columnas dinámicamente
	const generateColumns = (): ColumnConfig[] => {
		const columns: ColumnConfig[] = [
			{
				header: 'Equipo',
				cell: (team) => <TeamNameCell team={team} />,
			},
		];

		// Agregar columnas de participantes dinámicamente
		participants.forEach((participant) => {
			columns.push(
				{
					header: participant.label,
					cell: (team) => (
						<ParticipantCell name={team.participants[participant.key].name} />
					),
				},
				{
					header: 'Curso',
					cell: (team) => (
						<CourseCell course={team.participants[participant.key].course} />
					),
				},
				{
					header: 'Carrera',
					cell: (team) => (
						<CarreraCell carrera={team.participants[participant.key].carrera} />
					),
				},
				{
					header: 'Contacto',
					cell: (team) => (
						<ContactCell phone={team.participants[participant.key].phone} />
					),
				}
			);
		});

		// Agregar columnas finales
		columns.push(
			{
				header: 'Método',
				cell: (team) => <PaymentMethodCell method={team.paymentMethod} />,
			},
			{
				header: 'Imagen',
				cell: (team) =>
					team.ImageUrl ? (
						<Image
							src={team.ImageUrl}
							alt="Team"
							width={32}
							height={32}
							className="object-cover rounded-full border border-border"
						/>
					) : (
						<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
							<span className="text-muted-foreground text-xs">N/A</span>
						</div>
					),
			},
			{
				header: 'Fecha',
				cell: (team) => (
					<DateCell timestamp={team.timestamp} formatDate={formatDate} />
				),
			},
			{
				header: 'Estado',
				cell: (team) => <StatusCell team={team} onToggle={togglePayment} />,
				textAlign: 'center',
			},
			{
				header: 'Acciones',
				cell: (team) => (
					<ActionsCell
						team={team}
						onToggle={togglePayment}
						onDelete={deleteTeam}
					/>
				),
				textAlign: 'center',
			}
		);

		return columns;
	};

	const columns = generateColumns();

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
					<p className="text-muted-foreground text-lg">Cargando equipos...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-6">
			<div className="max-w-[1600px] mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="title-h1 text-foreground mb-2">
						Administración de Equipos
					</h1>
					<p className="text-muted-foreground text-sm">
						Total de equipos:{' '}
						<span className="font-semibold text-foreground">
							{teams.length}
						</span>
					</p>
				</div>

				{/* Table Container */}
				<div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full">
							{/* Table Header */}
							<thead>
								<tr className="border-b border-border bg-muted/30">
									{columns.map((col, index) => (
										<th
											key={index}
											className={`px-6 py-3 text-${col.textAlign ?? 'left'} text-muted-foreground text-xs font-medium uppercase tracking-wider`}
										>
											{col.header}
										</th>
									))}
								</tr>
							</thead>

							{/* Table Body */}
							<tbody className="divide-y divide-border">
								{teams.length === 0 ? (
									<tr>
										<td
											colSpan={columns.length}
											className="px-6 py-12 text-center text-muted-foreground"
										>
											<div className="flex flex-col items-center gap-2">
												<span className="text-4xl">📋</span>
												<p>No hay equipos registrados</p>
											</div>
										</td>
									</tr>
								) : (
									teams.map((team) => (
										<tr
											key={team.id}
											className="hover:bg-muted/20 transition-colors"
										>
											{columns.map((col, index) => (
												<td
													key={index}
													className={`px-6 py-4 text-${col.textAlign ?? 'left'}`}
												>
													{col.cell(team)}
												</td>
											))}
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Summary */}
				{teams.length > 0 && (
					<div className="mt-6 flex gap-6 text-sm">
						<div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
							<Check className="w-4 h-4 text-green-600 dark:text-green-400" />
							<span className="text-muted-foreground">
								Pagados:{' '}
								<span className="font-semibold text-green-600 dark:text-green-400">
									{teams.filter((team) => team.pagado).length}
								</span>
							</span>
						</div>
						<div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-lg border border-destructive/20">
							<X className="w-4 h-4 text-destructive" />
							<span className="text-muted-foreground">
								Pendientes:{' '}
								<span className="font-semibold text-destructive">
									{teams.filter((team) => !team.pagado).length}
								</span>
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
