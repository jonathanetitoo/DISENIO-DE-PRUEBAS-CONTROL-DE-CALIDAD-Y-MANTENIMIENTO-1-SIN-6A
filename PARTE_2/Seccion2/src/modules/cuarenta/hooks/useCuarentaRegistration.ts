'use client';

import { useState } from 'react';
import { submitCuarentaRegistration } from './registrationService';
import { triggerCoinFlipErrorAnimation } from '../components/coinFlipAnimation';
import { triggerSuccessAnimation } from '../components/successAnimation';

// Declaración para extender la interfaz global Window y añadir la propiedad dataLayer
declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
		gtag?: (...args: unknown[]) => void;
	}
}

import { RegistrationData } from '../types/registration';

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseCuarentaRegistrationProps {
	validateForm: () => boolean;
	getRegistrationData: () => RegistrationData;
}

export function useCuarentaRegistration({
	validateForm,
	getRegistrationData,
}: UseCuarentaRegistrationProps) {
	const [status, setStatus] = useState<SubmissionStatus>('idle');

	const isSubmitting = status === 'submitting';

	// --- Lógica de Envío ---
	const handleRegistration = async () => {
		if (status === 'submitting') return;

		// 1. Validar el formulario
		if (!validateForm()) {
			setStatus('error');
			// NO disparar animación de moneda aquí (solo falla validación)
			setTimeout(() => {
				setStatus('idle');
			}, 1500);
			return;
		}

		setStatus('submitting');

		try {
			const registrationData = getRegistrationData();
			console.log('Enviando datos de registro:', registrationData);

			// 2. Enviar datos al backend
			await submitCuarentaRegistration(registrationData);

			// 3. Éxito
			setStatus('success');
			localStorage.setItem(
				'lastRegistration',
				JSON.stringify(registrationData)
			);
			window.dataLayer?.push({ event: 'form_submit_success' });
			window.gtag?.('event', 'generate_lead');

			// Disparar animación de éxito
			triggerSuccessAnimation();
			setTimeout(triggerSuccessAnimation, 150);
		} catch (error) {
			// 4. Error de servidor - AQUÍ sí dispara la moneda roja ❌
			console.error('Error en el registro:', error);
			setStatus('error');
			triggerCoinFlipErrorAnimation(); // ✅ Moneda roja con X rebotando
			setTimeout(() => {
				setStatus('idle');
			}, 2000);
		}
	};

	return { status, isSubmitting, handleRegistration };
}
