export interface Participant {
	name: string;
	course: string;
	phone: string;
}

export interface RegistrationData {
	teamName: string;
	participants: {
		participant1: Participant;
		participant2: Participant;
	};
	carrera: string;
	paymentMethod: string;
	timestamp: string;
}
