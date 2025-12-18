// components/ui/Card.tsx
import React from 'react';
import Image from 'next/image';

// Definir interfaz para los datos de la tarjeta
interface CardData {
	image?: string;
	badge?: string;
	provider?: string;
	title?: string;
	description?: string;
	tags?: string[];
}

interface CardProps {
	cardData: CardData;
}

const Card: React.FC<CardProps> = ({ cardData }) => {
	// Desestructuración de los datos del JSON
	const { image, badge, provider, title, description, tags } = cardData;

	// Número máximo de tags a mostrar
	const maxVisibleTags = 3;
	const visibleTags = tags ? tags.slice(0, maxVisibleTags) : [];
	const hiddenTagsCount =
		tags && tags.length > maxVisibleTags ? tags.length - maxVisibleTags : 0;

	return (
		// Establecemos el ancho fijo del componente Card aquí
		<div className="w-80">
			{/* Image visualization */}
			<div className="relative bg-(--color-card) rounded-3xl overflow-hidden">
				{/* Contenedor de la imagen ajustado */}
				<div className="w-full h-32 relative">
					<Image
						src={image ?? '/api/placeholder/300/120'}
						alt={title ?? 'Network visualization'}
						fill
						className="object-cover"
					/>
				</div>

				{/* Badge overlay - solo se muestra si hay un badge */}
				{badge && (
					<div className="absolute top-4 left-4">
						<span className="bg-(--color-sidebar-primary) text-(--text-color) text-xs px-3 py-1 rounded-md font-semibold tracking-wide">
							{badge}
						</span>
					</div>
				)}
			</div>

			{/* Text content */}
			<div className="py-3">
				<div className="text-(--color-muted-foreground) text-sm mb-1">
					{provider ?? 'provider'}
				</div>
				<h3 className="text-xl font-bold mb-2 text-(--color-foreground)">
					{title ?? 'Title'}
				</h3>
				<p className="text-(--color-muted-foreground) text-sm mb-4">
					{description ?? 'Description goes here'}
				</p>

				{/* Tags dinámicos con límite y contador */}
				<div className="flex gap-1 mb-4 flex-wrap">
					{visibleTags.map((tag, index) => (
						<span
							key={index}
							className="bg-(--color-accent) text-(--color-accent-foreground) px-2 py-1 rounded-full text-xs"
						>
							{tag}
						</span>
					))}
					{hiddenTagsCount > 0 && (
						<span className="bg-(--color-accent) text-(--color-accent-foreground) px-2 py-1 rounded-full text-xs">
							+{hiddenTagsCount}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
