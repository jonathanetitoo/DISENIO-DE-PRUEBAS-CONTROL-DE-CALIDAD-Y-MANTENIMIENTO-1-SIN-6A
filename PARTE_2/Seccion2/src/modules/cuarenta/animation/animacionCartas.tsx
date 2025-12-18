'use client';

import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Card {
	id: number;
	suit: string;
	value: string;
	color: string;
}

interface FallingCardsAnimationProps {
	children: ReactNode;
	cardCount?: number;
	mobileCardCount?: number;
}

const FallingCardsAnimation: React.FC<FallingCardsAnimationProps> = ({
	children,
	cardCount = 50,
	mobileCardCount = 30,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const cardsContainerRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(false);
	const [cards, setCards] = useState<Card[]>([]);

	// Palos y valores de las cartas
	const suits = [
		{ symbol: '♠', name: 'spades', color: '#000' },
		{ symbol: '♥', name: 'hearts', color: '#e63946' },
		{ symbol: '♦', name: 'diamonds', color: '#e63946' },
		{ symbol: '♣', name: 'clubs', color: '#000' },
	];

	const values = [
		'A',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
	];

	// Generar cartas aleatorias
	const generateCards = (count: number): Card[] => {
		const cards: Card[] = [];
		for (let i = 0; i < count; i++) {
			const suit = suits[Math.floor(Math.random() * suits.length)];
			const value = values[Math.floor(Math.random() * values.length)];
			cards.push({
				id: i,
				suit: suit.symbol,
				value: value,
				color: suit.color,
			});
		}
		return cards;
	};

	// Detectar cambios de tamaño de pantalla
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			setCards(generateCards(mobile ? mobileCardCount : cardCount));
		};

		// Inicializar
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [cardCount, mobileCardCount]);

	useEffect(() => {
		if (!cardsContainerRef.current || cards.length === 0) return;

		const cardElements = cardsContainerRef.current.querySelectorAll('.card');

		// Configurar posiciones iniciales aleatorias
		cardElements.forEach((card, index) => {
			const cardWidth = isMobile ? 70 : 100;
			const randomX = Math.random() * (window.innerWidth - cardWidth);
			const randomRotation = Math.random() * 360;

			gsap.set(card, {
				x: randomX,
				y: -200,
				rotation: randomRotation,
				opacity: 0,
			});

			const horizontalMovement = isMobile
				? window.innerWidth * 0.8
				: window.innerWidth * 0.6;

			// Animación de caída con scroll
			gsap.to(card, {
				scrollTrigger: {
					trigger: containerRef.current,
					start: `top+=${String(index * 50)} top`,
					end: 'bottom bottom',
					scrub: 0.5,
					onEnter: () => {
						gsap.to(card, {
							opacity: 1,
							duration: 0.3,
						});
					},
				},
				y: window.innerHeight + 200,
				rotation: randomRotation + (Math.random() * 720 - 360),
				x: `+=${String(
					Math.random() * horizontalMovement - horizontalMovement / 2
				)}`,
				ease: 'none',
			});

			// Animación de balanceo adicional
			gsap.to(card, {
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 2,
				},
				rotationY: Math.sin(index) * 180,
				ease: 'sine.inOut',
			});
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill();
			});
		};
	}, [cards, isMobile]);

	return (
		<div ref={containerRef} className="scroll-container">
			{/* Contenedor fijo de las cartas */}
			<div ref={cardsContainerRef} className="cards-container">
				{cards.map((card) => (
					<div key={card.id} className="card">
						<div className="card-content">
							<div className="card-corner top-left">
								<div className="value" style={{ color: card.color }}>
									{card.value}
								</div>
								<div className="suit" style={{ color: card.color }}>
									{card.suit}
								</div>
							</div>
							<div className="card-center" style={{ color: card.color }}>
								{card.suit}
							</div>
							<div className="card-corner bottom-right">
								<div className="value" style={{ color: card.color }}>
									{card.value}
								</div>
								<div className="suit" style={{ color: card.color }}>
									{card.suit}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Contenido de scroll */}
			<div className="content">{children}</div>

			<style>{`
				:root {
					--card-bg: white;
					--card-border: #333;
					--card-shadow: rgba(0, 0, 0, 0.4);
					--text-color-dark: #000;
					--text-color-red: #e63946;
				}

				.dark {
					--card-bg: #2d3748;
					--card-border: #a0aec0;
					--card-shadow: rgba(0, 0, 0, 0.6);
					--text-color-dark: #f7fafc;
					--text-color-red: #f56565;
				}

				.scroll-container {
					min-height: 400vh;
					position: relative;
				}

				.cards-container {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100vh;
					pointer-events: none;
					overflow: hidden;
					z-index: 10;
				}

				.card {
					position: absolute;
					width: 100px;
					height: 140px;
					background: var(--card-bg);
					border-radius: 8px;
					box-shadow: 0 10px 30px var(--card-shadow);
					will-change: transform;
					backface-visibility: hidden;
				}

				.card-content {
					width: 100%;
					height: 100%;
					padding: 8px;
					position: relative;
					background: var(--card-bg);
					border-radius: 8px;
					border: 2px solid var(--card-border);
				}

				.card-corner {
					position: absolute;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-weight: bold;
				}

				.top-left {
					top: 8px;
					left: 8px;
				}

				.bottom-right {
					bottom: 8px;
					right: 8px;
					transform: rotate(180deg);
				}

				.value {
					font-size: 18px;
					line-height: 1;
				}

				.suit {
					font-size: 14px;
					line-height: 1;
				}

				.card-center {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 48px;
					opacity: 0.15;
				}

				.content {
					position: relative;
					z-index: 1;
				}

				@media (max-width: 768px) {
					.card {
						width: 70px;
						height: 98px;
					}

					.value {
						font-size: 14px;
					}

					.suit {
						font-size: 10px;
					}

					.card-center {
						font-size: 32px;
					}

					.card-content {
						padding: 6px;
					}

					.top-left {
						top: 6px;
						left: 6px;
					}

					.bottom-right {
						bottom: 6px;
						right: 6px;
					}
				}
			`}</style>
		</div>
	);
};

export default FallingCardsAnimation;
