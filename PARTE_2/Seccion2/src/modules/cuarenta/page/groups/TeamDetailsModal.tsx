'use client';

import React from 'react';
import Image from 'next/image';
import {
	Phone,
	BookOpen,
	Users,
	CreditCard,
	Calendar,
	CheckCircle2,
	AlertCircle,
} from 'lucide-react';
import { TeamData } from '@/modules/sheets/usegrup';

interface TeamDetailsModalProps {
	team: TeamData;
	onClose: () => void;
}

export const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({
	team,
	onClose,
}) => {
	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
			onClick={handleBackdropClick}
		>
			<div className="bg-background w-full sm:w-auto sm:min-w-[650px] max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
				{/* Header con imagen de fondo */}
				<div className="relative overflow-hidden">
					{/* Gradiente de fondo */}
					<div className="absolute inset-0 bg-linear-to-br from-yellow-400/20 via-transparent to-red-900/20 dark:from-yellow-500/10 dark:to-red-900/30" />

					<div className="relative flex items-start justify-between p-6 sm:p-8">
						<div className="flex items-center gap-4 sm:gap-6">
							{team.ImageUrl && (
								<div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 ring-4 ring-white/10 shadow-xl">
									<Image
										src={team.ImageUrl}
										alt={team.teamName}
										fill
										className="object-cover"
									/>
								</div>
							)}
							<div>
								<h2 className="text-(--text-color) font-bold text-2xl sm:text-3xl tracking-tight mb-1">
									{team.teamName}
								</h2>
								<p className="text-(--text-color-muted) text-xs sm:text-sm font-mono bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full inline-block">
									ID:{' '}
									{typeof team.id === 'string'
										? team.id.slice(0, 8)
										: String(team.id).slice(0, 8)}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="bg-background p-6 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(92vh-200px)]">
					{/* Participantes */}
					<div className="space-y-4">
						<div className="flex items-center gap-2 mb-4">
							<div className="p-2 bg-(--text-color-icon)/10 rounded-xl">
								<Users className="w-5 h-5 text-(--text-color-icon)" />
							</div>
							<h3 className="text-(--text-color) font-semibold text-lg">
								Participantes
							</h3>
						</div>

						{[1, 2].map((num) => {
							const key = `participant${String(num)}` as
								| 'participant1'
								| 'participant2';
							const participant = team.participants[key];
							return (
								<div
									key={num}
									className="group bg-(--background-input) rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-(--text-color-icon)/20"
								>
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 rounded-full bg-linear-to-br from-(--text-color-icon) to-yellow-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
											{num}
										</div>
										<h4 className="text-(--text-color) font-semibold text-lg">
											{participant.name}
										</h4>
									</div>
									<div className="space-y-3 ml-13">
										<div className="flex items-center gap-3 text-(--text-color-secondary)">
											<div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg">
												<BookOpen className="w-4 h-4" />
											</div>
											<span className="text-sm">{participant.course}</span>
										</div>
										<div className="flex items-center gap-3 text-(--text-color-secondary)">
											<div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg">
												<Phone className="w-4 h-4" />
											</div>
											<span className="text-sm font-mono">
												{participant.phone}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Info adicional */}
					<div className="space-y-4">
						<div className="flex items-center gap-2 mb-4">
							<div className="p-2 bg-(--text-color-icon)/10 rounded-xl">
								<Calendar className="w-5 h-5 text-(--text-color-icon)" />
							</div>
							<h3 className="text-(--text-color) font-semibold text-lg">
								Información del registro
							</h3>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="bg-(--background-input) rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-(--text-color-icon)/20">
								<div className="flex items-center gap-2 text-(--text-color-muted) text-xs uppercase tracking-wider mb-3">
									<CreditCard className="w-4 h-4" />
									Método de pago
								</div>
								<p className="text-(--text-color) font-semibold text-lg">
									{team.paymentMethod}
								</p>
							</div>

							<div className="bg-(--background-input) rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-(--text-color-icon)/20">
								<div className="flex items-center gap-2 text-(--text-color-muted) text-xs uppercase tracking-wider mb-3">
									<Calendar className="w-4 h-4" />
									Fecha de registro
								</div>
								<p className="text-(--text-color) font-semibold text-base">
									{new Date(team.timestamp).toLocaleDateString('es-EC', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</p>
								<p className="text-(--text-color-muted) text-sm mt-1">
									{new Date(team.timestamp).toLocaleTimeString('es-EC', {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</div>
						</div>
					</div>

					{/* Estado de pago - Rediseñado */}
					<div
						className={`rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 ${
							team.pagado
								? 'bg-green-500/10 border-2 border-green-500/30 shadow-green-500/10 shadow-lg'
								: 'bg-red-500/10 border-2 border-red-500/30 shadow-red-500/10 shadow-lg'
						}`}
					>
						<div
							className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
								team.pagado ? 'bg-green-500/20' : 'bg-red-500/20'
							}`}
						>
							{team.pagado ? (
								<CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
							) : (
								<AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
							)}
						</div>
						<div className="flex-1">
							<p
								className={`font-bold text-base mb-1 ${
									team.pagado
										? 'text-green-600 dark:text-green-400'
										: 'text-red-600 dark:text-red-400'
								}`}
							>
								{team.pagado ? 'Pago confirmado' : 'Pago pendiente'}
							</p>
							<p
								className={`text-sm ${
									team.pagado
										? 'text-green-600/80 dark:text-green-400/80'
										: 'text-red-600/80 dark:text-red-400/80'
								}`}
							>
								{team.pagado
									? 'El equipo está registrado correctamente'
									: 'Esperando confirmación de pago'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
