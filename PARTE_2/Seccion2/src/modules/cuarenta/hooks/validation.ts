import { z } from 'zod';

// --- Zod Schemas ---
export const participantSchema = z.object({
	name: z
		.string()
		.min(1, 'El nombre es requerido')
		.max(25, 'El nombre de la pareja no debe exceder los 25 caracteres'),
	phone: z
		.string()
		.min(1, 'El celular es requerido')
		.regex(/^[0-9]{10}$/, 'El celular debe tener 10 dígitos'),
	course: z.string().min(1, 'El curso es requerido'),
});

export const cuarentaFormSchema = z.object({
	teamName: z
		.string()
		.min(1, 'El nombre del equipo es requerido')
		.max(12, 'El nombre del equipo no debe exceder los 12 caracteres'),
	participants: z.array(participantSchema).min(2).max(2),
});

// --- Types ---
type Participant = z.infer<typeof participantSchema>;

export interface CuarentaFormErrors {
	teamName?: string;
	participants: [
		Partial<Record<keyof Participant, string>>,
		Partial<Record<keyof Participant, string>>,
	];
}

// --- Validation Function ---
export const validateCuarentaForm = (data: {
	teamName: string;
	participants: [Participant, Participant];
}): { success: boolean; errors?: CuarentaFormErrors } => {
	const result = cuarentaFormSchema.safeParse(data);

	if (result.success) {
		return { success: true };
	}

	const newErrors: CuarentaFormErrors = {
		participants: [{}, {}],
	};

	result.error.issues.forEach((err) => {
		const path = err.path;

		if (path[0] === 'teamName') {
			newErrors.teamName = err.message;
		}

		if (path[0] === 'participants' && typeof path[1] === 'number') {
			const participantIndex = path[1] as 0 | 1;
			const field = path[2] as keyof Participant;
			newErrors.participants[participantIndex][field] = err.message;
		}
	});

	return { success: false, errors: newErrors };
};
