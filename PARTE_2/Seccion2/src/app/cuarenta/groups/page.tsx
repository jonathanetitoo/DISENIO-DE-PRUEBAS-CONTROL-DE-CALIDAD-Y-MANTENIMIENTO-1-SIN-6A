'use client';

import { useSearchParams } from 'next/navigation';
import TeamsViewPage from '@/modules/cuarenta/page/groups/Instritos';
import TournamentBracket from '@/modules/cuarenta/page/groups/PrimeraRonda';

export default function CuarentaGroupsPage() {
	const searchParams = useSearchParams();
	const view = searchParams.get('view') ?? 'Inscritos';

	const renderContent = () => {
		switch (view) {
			case 'Inscritos':
				return <TeamsViewPage />;
			case 'Primera ronda':
				return (
					<div className="text-center mt-8">
						<TournamentBracket />
					</div>
				);
			case 'Podios':
				return (
					<div className="text-center mt-8">
						Contenido de Podios (próximamente)
					</div>
				);
			default:
				return <TeamsViewPage />;
		}
	};

	return renderContent();
}
