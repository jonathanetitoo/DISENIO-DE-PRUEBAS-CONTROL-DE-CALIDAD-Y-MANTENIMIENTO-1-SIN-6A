import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/card';

// Definir interfaces para el tipado
interface CardData {
	image?: string;
	badge?: string;
	provider?: string;
	title?: string;
	description?: string;
	tags?: string[];
	slug?: string; // Usamos slug en lugar de url
}

interface CardContainerProps {
	cardsData: CardData[];
}

const CardContainer: React.FC<CardContainerProps> = ({ cardsData }) => {
	const [visibleCards, setVisibleCards] = useState<CardData[]>([]);

	useEffect(() => {
		if (cardsData.length > 0) {
			setVisibleCards(cardsData);
		}
	}, [cardsData]);

	// Función para manejar el clic en una card
	const handleCardClick = (slug?: string) => {
		if (slug) {
			const fullUrl = `/aecc-uide-web/${slug}`; // Construimos la URL
			window.open(fullUrl, '_blank'); // Abre en una nueva pestaña
		}
	};

	return (
		<div className="w-full overflow-x-auto">
			<div className="flex gap-4 pb-4">
				{visibleCards.map((cardData, index) => (
					<div
						key={`card-${String(index)}`}
						className="cursor-pointer"
						onClick={() => {
							handleCardClick(cardData.slug);
						}}
					>
						<Card cardData={cardData} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CardContainer;
