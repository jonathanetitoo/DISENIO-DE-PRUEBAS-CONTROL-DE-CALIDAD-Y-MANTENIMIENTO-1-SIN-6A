import { supabase } from '@/lib/supabase';
import { RegistrationData } from '../types/registration';

export async function submitCuarentaRegistration(
	registrationData: RegistrationData
): Promise<unknown> {
	//	const { error } = await supabase.from('cuarenta_registrations').insert({
	const { error } = await supabase.from('cuarenta_registration').insert({
		team_name: registrationData.teamName,
		participant1_name: registrationData.participants.participant1.name,
		participant1_course: registrationData.participants.participant1.course,
		participant1_phone: registrationData.participants.participant1.phone,
		participant2_name: registrationData.participants.participant2.name,
		participant2_course: registrationData.participants.participant2.course,
		participant2_phone: registrationData.participants.participant2.phone,
		carrera: registrationData.carrera,
		payment_method: registrationData.paymentMethod,
	});

	if (error) {
		throw new Error(`Error en el servidor: ${error.message}`);
	}

	return { success: true };
}
