'use client';

import React from 'react';
import { useReducer, Reducer } from 'react';
import { CreditCard, ChevronDown, BookMarked } from 'lucide-react';
import ParticipantCard from '@/modules/cuarenta/components/ParticipantCard';
import SubmitButton from '@/modules/cuarenta/components/SubmitButton';
import { validateCuarentaForm } from '@/modules/cuarenta/hooks/validation';

// --- Constants ---
const PAYMENT_METHODS = ['Efectivo', 'Transferencia'];
const CARRERAS = ['Sistemas', 'Mecatrónica'];

// --- Types ---
import {
	Participant,
	RegistrationData,
} from '@/modules/cuarenta/types/registration';

interface State {
	teamName: string;
	participants: [Participant, Participant];
	carrera: string;
	paymentMethod: string;
	activeDropdown: string | null;
	errors: {
		teamName?: string;
		participants: [
			Partial<Record<keyof Participant, string>>,
			Partial<Record<keyof Participant, string>>,
		];
	};
	touched: boolean;
	showConfetti: boolean;
}

type Action =
	| { type: 'SET_TEAM_NAME'; payload: string }
	| {
			type: 'SET_PARTICIPANT_FIELD';
			payload: { index: number; field: keyof Participant; value: string };
	  }
	| { type: 'SET_CARRERA'; payload: string }
	| { type: 'SET_PAYMENT_METHOD'; payload: string }
	| { type: 'TOGGLE_DROPDOWN'; payload: string | null }
	| { type: 'SET_ERRORS'; payload: State['errors'] }
	| {
			type: 'SET_PARTICIPANT_ERRORS';
			payload: {
				index: number;
				errors: Partial<Record<keyof Participant, string>>;
			};
	  }
	| { type: 'SET_TOUCHED'; payload: boolean }
	| { type: 'SET_SHOW_CONFETTI'; payload: boolean };

// --- Reducer ---
const initialState: State = {
	teamName: '',
	participants: [
		{ name: '', course: '', phone: '' },
		{ name: '', course: '', phone: '' },
	],
	carrera: 'Sistemas',
	paymentMethod: 'Efectivo',
	activeDropdown: null,
	errors: {
		participants: [{}, {}],
	},
	touched: false,
	showConfetti: false,
};

const registrationReducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'SET_TEAM_NAME':
			return { ...state, teamName: action.payload };
		case 'SET_PARTICIPANT_FIELD': {
			const newParticipants = [...state.participants] as [
				Participant,
				Participant,
			];
			const { index, field, value } = action.payload;
			newParticipants[index] = { ...newParticipants[index], [field]: value };
			return { ...state, participants: newParticipants };
		}
		case 'SET_CARRERA':
			return { ...state, carrera: action.payload, activeDropdown: null };
		case 'SET_PAYMENT_METHOD':
			return { ...state, paymentMethod: action.payload, activeDropdown: null };
		case 'TOGGLE_DROPDOWN':
			return {
				...state,
				activeDropdown:
					state.activeDropdown === action.payload ? null : action.payload,
			};
		case 'SET_ERRORS':
			return { ...state, errors: action.payload };
		case 'SET_PARTICIPANT_ERRORS': {
			const newErrors = { ...state.errors };
			newErrors.participants[action.payload.index] = action.payload.errors;
			return { ...state, errors: newErrors };
		}
		case 'SET_TOUCHED':
			return { ...state, touched: action.payload };
		case 'SET_SHOW_CONFETTI':
			return { ...state, showConfetti: action.payload };
		default:
			return state;
	}
};

// --- Reusable Components ---
const FormField = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-(--background-input) rounded-2xl px-4 py-4 transition-colors">
		{children}
	</div>
);

export default function TeamRegistration() {
	const [state, dispatch] = useReducer(registrationReducer, initialState);

	const handleParticipantChange = (
		index: number,
		field: keyof Participant,
		value: string
	) => {
		dispatch({
			type: 'SET_PARTICIPANT_FIELD',
			payload: { index, field, value },
		});
	};

	const handleParticipantErrors = (
		index: number,
		errors: Partial<Record<keyof Participant, string>>
	) => {
		dispatch({
			type: 'SET_PARTICIPANT_ERRORS',
			payload: { index, errors },
		});
	};

	const validateForm = (): boolean => {
		dispatch({ type: 'SET_TOUCHED', payload: true });

		const result = validateCuarentaForm({
			teamName: state.teamName,
			participants: state.participants,
		});

		if (result.success) {
			dispatch({
				type: 'SET_ERRORS',
				payload: { participants: [{}, {}] },
			});
			return true;
		} else {
			dispatch({
				type: 'SET_ERRORS',
				payload: result.errors ?? { participants: [{}, {}] },
			});
			return false;
		}
	};

	const getRegistrationData = (): RegistrationData => {
		return {
			teamName: state.teamName,
			participants: {
				participant1: state.participants[0],
				participant2: state.participants[1],
			},
			carrera: state.carrera,
			paymentMethod: state.paymentMethod,
			timestamp: new Date().toISOString(),
		};
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-stone-50 via-stone-100 to-stone-200 dark:from-zinc-900 dark:via-neutral-900 dark:to-stone-900 p-0 transition-colors">
			<div className="max-w-2xl mx-auto">
				{/* Team Name */}
				<div className="px-6 py-8">
					<input
						type="text"
						value={state.teamName}
						onChange={(e) => {
							dispatch({ type: 'SET_TEAM_NAME', payload: e.target.value });
						}}
						placeholder="Nombre del Equipo"
						className={`w-full bg-transparent border-none text-3xl md:text-4xl font-bold tracking-wider placeholder-(--text-color-placeholder) focus:outline-none transition-colors ${
							state.teamName
								? 'text-(--text-color)'
								: 'text-(--text-color-placeholder)'
						}`}
					/>
					{state.errors.teamName && state.touched && (
						<p className="text-(--text-color-error) text-sm mt-2 px-1">
							{state.errors.teamName}
						</p>
					)}
				</div>

				<div className="px-6 py-6 space-y-6">
					{/* Participants */}
					<div>
						<h3 className="text-(--text-color-secondary) text-xs font-medium mb-3 px-1 transition-colors">
							Participantes
						</h3>
						<div className="space-y-2">
							{state.participants.map((participant, index) => (
								<ParticipantCard
									key={index}
									participant={participant}
									index={index}
									isDropdownOpen={
										state.activeDropdown === `course${(index + 1).toString()}`
									}
									onFieldChange={(field, value) => {
										handleParticipantChange(index, field, value);
									}}
									onDropdownToggle={() => {
										dispatch({
											type: 'TOGGLE_DROPDOWN',
											payload: `course${(index + 1).toString()}`,
										});
									}}
									onErrorsChange={(errors) => {
										handleParticipantErrors(index, errors);
									}}
									externalErrors={
										state.touched ? state.errors.participants[index] : {}
									}
								/>
							))}
						</div>
					</div>

					{/* Payment Method */}
					<div>
						<h3 className="text-(--text-color-secondary) text-xs font-medium mb-3 px-1 transition-colors">
							Información del registro
						</h3>
						<div className="space-y-2">
							<FormField>
								<div className="flex items-center justify-between relative">
									<div className="flex items-center gap-3">
										<BookMarked className="w-5 h-5 text-(--text-color-muted) transition-colors" />
										<span className="text-(--text-color-secondary) text-sm transition-colors">
											Carrera
										</span>
									</div>
									<div className="relative">
										<button
											onClick={() => {
												dispatch({
													type: 'TOGGLE_DROPDOWN',
													payload: 'carrera',
												});
											}}
											className="flex items-center gap-2 text-(--text-color-secondary) text-sm transition-colors hover:text-(--text-color)"
										>
											<span>{state.carrera}</span>
											<ChevronDown className="w-4 h-4" />
										</button>
										{state.activeDropdown === 'carrera' && (
											<div className="absolute right-0 top-full mt-2 bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded shadow-lg overflow-hidden z-10 min-w-[140px] transition-colors">
												{CARRERAS.map((carrera) => (
													<button
														key={carrera}
														onClick={() => {
															dispatch({
																type: 'SET_CARRERA',
																payload: carrera,
															});
														}}
														className="w-full px-4 py-2.5 text-left text-(--text-color) text-sm hover:bg-(--hover-yellow) dark:hover:bg-(--hover-gray) transition-colors"
													>
														{carrera}
													</button>
												))}
											</div>
										)}
									</div>
								</div>
							</FormField>
							<FormField>
								<div className="flex items-center justify-between relative">
									<div className="flex items-center gap-3">
										<CreditCard className="w-5 h-5 text-(--text-color-muted) transition-colors" />
										<span className="text-(--text-color-secondary) text-sm transition-colors">
											Método de pago
										</span>
									</div>
									<div className="relative">
										<button
											onClick={() => {
												dispatch({
													type: 'TOGGLE_DROPDOWN',
													payload: 'payment',
												});
											}}
											className="flex items-center gap-2 text-(--text-color-secondary) text-sm transition-colors hover:text-(--text-color)"
										>
											<span>{state.paymentMethod}</span>
											<ChevronDown className="w-4 h-4" />
										</button>
										{state.activeDropdown === 'payment' && (
											<div className="absolute right-0 top-full mt-2 bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded shadow-lg overflow-hidden z-10 min-w-[140px] transition-colors">
												{PAYMENT_METHODS.map((method) => (
													<button
														key={method}
														onClick={() => {
															dispatch({
																type: 'SET_PAYMENT_METHOD',
																payload: method,
															});
														}}
														className="w-full px-4 py-2.5 text-left text-(--text-color) text-sm hover:bg-(--hover-yellow) dark:hover:bg-(--hover-gray) transition-colors"
													>
														{method}
													</button>
												))}
											</div>
										)}
									</div>
								</div>
							</FormField>
						</div>
					</div>

					{/* Submit Button */}
					<SubmitButton
						validateForm={validateForm}
						getRegistrationData={getRegistrationData}
						redirectUrl="/cuarenta/groups"
					>
						Registrar equipo
					</SubmitButton>
				</div>
			</div>
		</div>
	);
}
