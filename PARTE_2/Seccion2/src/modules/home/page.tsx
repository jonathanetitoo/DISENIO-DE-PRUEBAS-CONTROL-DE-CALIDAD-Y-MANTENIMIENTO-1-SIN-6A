// app/page.tsx
'use client';
import Logo from './components/aeccIcon.tsx';
import CardContainer from './components/cardContainer.tsx';

const cardsData = [
	{
		image:
			'https://i.pinimg.com/736x/94/e4/5d/94e45d12c714cd677f6d1d89f44b0b46.jpg',
		badge: 'Fiestas de quito',
		provider: 'Anual Event',
		title: 'Cuarenta',
		description:
			'Por fiestas de quito se organiza el evento de Cuarenta para la Escuela de Ciencias de la Computación.',
		tags: ['math', 'advanced reasoning', 'chat'],
		slug: 'cuarenta',
	},

	// Puedes añadir más objetos para crear más tarjetas
];

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex justify-center">
				<Logo className="w-50 h-70 sm:w-100 sm:h-100 md:w-100 md:h-100 lg:w-140 lg:h-140" />
			</div>
			<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20">
				<div className="mb-3">
					<h1 className="title-h1">Eventos</h1>
				</div>
				<CardContainer cardsData={cardsData} />
			</div>

			<hr
				className="mx-8 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-20 my-20"
				style={{ borderColor: 'var(--border)' }}
			/>
		</div>
	);
}
