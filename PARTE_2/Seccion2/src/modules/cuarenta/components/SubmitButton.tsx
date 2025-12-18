'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttom';
import { RegistrationData } from '../types/registration';
import {
	useCuarentaRegistration,
	SubmissionStatus,
} from '../hooks/useCuarentaRegistration';

interface SubmitButtonProps {
	validateForm: () => boolean;
	getRegistrationData: () => RegistrationData;
	children: React.ReactNode;
	redirectUrl?: string;
}

export default function SubmitButton({
	validateForm,
	getRegistrationData,
	children,
	redirectUrl,
}: SubmitButtonProps) {
	const router = useRouter();
	const { status, isSubmitting, handleRegistration } = useCuarentaRegistration({
		validateForm,
		getRegistrationData,
	});

	useEffect(() => {
		if (status === 'success' && redirectUrl) {
			const timer = setTimeout(() => {
				router.push(redirectUrl);
			}, 500); // Espera 0.5 segundos antes de redirigir
			return () => {
				clearTimeout(timer);
			};
		}
	}, [status, router, redirectUrl]);

	const getButtonContent = (status: SubmissionStatus) => {
		switch (status) {
			case 'submitting':
				return 'Enviando...';
			case 'success':
				return '¡Registrado!';
			case 'error':
				return 'Inténtalo de nuevo';
			default:
				return children;
		}
	};

	return (
		<div className="pt-6 pb-8 relative">
			<Button
				onClick={handleRegistration}
				className="w-full py-4 rounded-2xl font-medium shadow-lg transform active:scale-95 duration-150 disabled:opacity-50 disabled:cursor-not-allowed ronded-lg"
				disabled={isSubmitting || status === 'success'}
			>
				{getButtonContent(status)}
			</Button>
		</div>
	);
}
