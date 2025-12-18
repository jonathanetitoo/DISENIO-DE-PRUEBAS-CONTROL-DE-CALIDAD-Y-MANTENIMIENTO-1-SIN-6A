'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface ParticipantData {
	name: string;
	course: string;
	carrera: string;
	phone: string;
}

export interface TeamData {
	id: string;
	teamName: string;
	participants: {
		participant1: ParticipantData;
		participant2: ParticipantData;
	};
	paymentMethod: string;
	pagado: boolean;
	ImageUrl: string;
	timestamp: string;
}

// Interface for the raw data from Supabase to avoid using 'any'
interface DbTeamRecord {
	id: string;
	team_name: string;
	participant1_name: string;
	participant1_course: string;
	participant1_phone: string;
	participant2_name: string;
	participant2_course: string;
	participant2_phone: string;
	payment_method: string;
	carrera: string;
	pagado: boolean;
	image_url: string;
	created_at: string;
}

async function fetchTeams(): Promise<TeamData[]> {
	const { data, error } = await supabase
		.from('cuarenta_registrations')
		.select<'*', DbTeamRecord>('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching teams:', error);
		throw new Error('No se pudieron obtener los equipos');
	}

	// Now 'data' is correctly typed as DbTeamRecord[]
	return data.map((team) => ({
		id: team.id,
		teamName: team.team_name,
		participants: {
			participant1: {
				name: team.participant1_name,
				course: team.participant1_course,
				carrera: team.carrera,
				phone: team.participant1_phone,
			},
			participant2: {
				name: team.participant2_name,
				course: team.participant2_course,
				carrera: team.carrera,
				phone: team.participant2_phone,
			},
		},
		paymentMethod: team.payment_method,
		pagado: team.pagado,
		ImageUrl: team.image_url,
		timestamp: team.created_at,
	}));
}

export const useGrup = () => {
	const [teams, setTeams] = useState<TeamData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadTeams = useCallback(async () => {
		try {
			setLoading(true);
			const data = await fetchTeams();
			setTeams(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Ocurrió un error');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadTeams();
	}, [loadTeams]);

	const togglePayment = async (id: string, currentStatus: boolean) => {
		const { error } = await supabase
			.from('cuarenta_registrations')
			.update({ pagado: !currentStatus })
			.eq('id', id)
			.select<'*', DbTeamRecord>()
			.single();

		if (error) {
			console.error('Error updating payment status:', error);
			// Optionally, show an error to the user
			return;
		}

		setTeams((currentTeams) =>
			currentTeams.map((t) => (t.id === id ? { ...t, pagado: !t.pagado } : t))
		);
	};

	const deleteTeam = async (id: string) => {
		const { error } = await supabase
			.from('cuarenta_registrations')
			.delete()
			.eq('id', id);

		if (error) {
			console.error('Error deleting team:', error);
			// Optionally, show an error to the user
			return;
		}

		setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
	};

	const formatDate = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleString('es-EC', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return {
		teams,
		loading,
		error,
		togglePayment,
		deleteTeam,
		formatDate,
		reloadTeams: loadTeams,
	};
};
