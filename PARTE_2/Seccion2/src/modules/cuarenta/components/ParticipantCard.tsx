'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Phone, ChevronDown, School } from 'lucide-react';
import { z } from 'zod';
import { participantSchema } from '../hooks/validation';

// --- Constants ---
const COURSES = [
	'1ro A',
	'1ro B',
	'1ro C',
	'2do A',
	'2do B',
	'2do C',
	'3ro A',
	'3ro B',
	'3ro C',
	'4to A',
	'4to B',
	'4to C',
	'5to A',
	'5to B',
	'5to C',
	'6to A',
	'6to B',
	'6to C',
	'7mo A',
	'7mo B',
	'7mo C',
	'8vo A',
	'8vo B',
	'8vo C',
	'9no A',
];

// Estilos globales centralizados usando variables CSS
const StylesTextForms = {
	icon: 'w-6 h-6 shrink-0 text-[var(--text-color-muted)]',
	text: 'text-[var(--text-color)]',
	textSecondary: 'text-[var(--text-color-secondary)]',
	placeholder: 'placeholder-[var(--text-color-secondary)]',
	textSize: 'text-sm sm:text-sm',
	input: 'w-full bg-transparent focus:outline-none',
	container: 'flex items-center gap-3',
} as const;

// --- Types ---
export interface Participant {
	name: string;
	course: string;
	phone: string;
}

type ParticipantErrors = Partial<Record<keyof Participant, string>>;

interface ParticipantCardProps {
	participant: Participant;
	index: number;
	isDropdownOpen: boolean;
	onFieldChange: (field: keyof Participant, value: string) => void;
	onDropdownToggle: () => void;
	onErrorsChange?: (errors: ParticipantErrors) => void;
	externalErrors?: ParticipantErrors;
}

// --- Reusable Sub-components ---
const FormField = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-(--background-input) rounded-2xl px-5 py-5 transition-colors">
		{children}
	</div>
);

interface DropdownProps {
	options: readonly string[];
	value: string;
	placeholder: string;
	isOpen: boolean;
	onToggle: () => void;
	error?: string;
	onSelect: (value: string) => void;
}

const Dropdown = ({
	options,
	value,
	placeholder,
	isOpen,
	onToggle,
	onSelect,
	error,
}: DropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	return (
		<div className="relative w-full" ref={dropdownRef}>
			<button
				onClick={onToggle}
				className={`w-full text-left bg-transparent ${StylesTextForms.textSize} focus:outline-none flex items-center justify-between ${
					error ? 'text-(--text-color-error)' : ''
				}`}
			>
				<span
					className={`truncate ${
						value
							? StylesTextForms.text
							: error
								? 'text-(--text-color-error)'
								: StylesTextForms.textSecondary
					}`}
				>
					{value || placeholder}
				</span>
				<ChevronDown
					className={`w-5 h-5 shrink-0 ${
						error ? 'text-(--text-color-error)' : StylesTextForms.textSecondary
					}`}
				/>
			</button>
			{error && (
				<span className="text-(--text-color-error) text-xs mt-1 block">
					{error}
				</span>
			)}
			{isOpen && (
				<div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-800 rounded shadow-lg border border-stone-200 dark:border-zinc-700 overflow-hidden z-10 max-h-48 overflow-y-auto transition-colors">
					{options.map((option) => (
						<button
							key={option}
							onClick={() => {
								onSelect(option);
							}}
							className={`w-full px-4 py-3 text-left ${StylesTextForms.text} ${StylesTextForms.textSize} hover:bg-(--hover-yellow) dark:hover:bg-(--hover-gray) transition-colors`}
						>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

const InputField = ({
	icon: Icon,
	value,
	onChange,
	placeholder,
	type = 'text',
	error,
}: {
	icon: React.ElementType;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	type?: string;
	error?: string;
}) => (
	<div className="relative flex-1">
		<div className={StylesTextForms.container}>
			<Icon
				className={`${StylesTextForms.icon} ${
					error ? 'text-(--text-color-error)' : ''
				}`}
			/>
			<input
				type={type}
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				placeholder={placeholder}
				className={`${StylesTextForms.input} ${StylesTextForms.text} ${StylesTextForms.textSize} ${
					error
						? 'placeholder-(--text-color-error) text-(--text-color-error)'
						: StylesTextForms.placeholder
				}`}
			/>
		</div>
		{error && (
			<span className="text-(--text-color-error) text-xs block mt-1">
				{error}
			</span>
		)}
	</div>
);

// --- Main Component ---
export default function ParticipantCard({
	participant,
	index,
	isDropdownOpen,
	onFieldChange,
	onDropdownToggle,
	onErrorsChange,
	externalErrors = {},
}: ParticipantCardProps) {
	const pairNumber = index + 1;
	const [localErrors, setLocalErrors] = useState<ParticipantErrors>({});

	const errors = { ...localErrors, ...externalErrors };

	const validateField = (field: keyof Participant, value: string) => {
		try {
			participantSchema.shape[field].parse(value);

			const remainingErrors = Object.keys(
				localErrors
			).reduce<ParticipantErrors>((acc, key) => {
				if (key !== field) {
					acc[key as keyof Participant] = localErrors[key as keyof Participant];
				}
				return acc;
			}, {});

			setLocalErrors(remainingErrors);

			if (onErrorsChange) {
				onErrorsChange(remainingErrors);
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				const message = error.issues[0]?.message ?? 'Invalid';
				const newErrors = { ...localErrors, [field]: message };
				setLocalErrors(newErrors);
				if (onErrorsChange) {
					onErrorsChange(newErrors);
				}
			}
		}
	};

	const handleFieldChange = (field: keyof Participant, value: string) => {
		onFieldChange(field, value);
		validateField(field, value);
	};

	return (
		<FormField>
			<div className="space-y-5">
				<div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-4">
					<InputField
						icon={Users}
						value={participant.name}
						onChange={(value) => {
							handleFieldChange('name', value);
						}}
						placeholder={`Nombre de la pareja ${String(pairNumber)}`}
						error={errors.name}
					/>
					<InputField
						icon={Phone}
						value={participant.phone}
						onChange={(value) => {
							handleFieldChange('phone', value);
						}}
						placeholder="Celular"
						type="tel"
						error={errors.phone}
					/>
				</div>
				<div className={StylesTextForms.container}>
					<School
						className={`${StylesTextForms.icon} ${
							errors.course ? 'text-(--text-color-error)' : ''
						}`}
					/>
					<Dropdown
						options={COURSES}
						value={participant.course}
						placeholder={`Curso de la pareja ${String(pairNumber)}`}
						isOpen={isDropdownOpen}
						onToggle={onDropdownToggle}
						error={errors.course}
						onSelect={(value) => {
							handleFieldChange('course', value);
							onDropdownToggle();
						}}
					/>
				</div>
			</div>
		</FormField>
	);
}
