import confetti from 'canvas-confetti';

/**
 * Animación de éxito con confetti y emojis.
 */
export function triggerSuccessAnimation() {
	const defaults = {
		spread: 360,
		ticks: 100,
		gravity: 0,
		decay: 0.94,
		startVelocity: 30,
		origin: { x: 0.5, y: 0.5 },
	};

	// Confeti normal
	confetti({
		...defaults,
		particleCount: 30,
		scalar: 1.2,
		shapes: ['circle', 'square'],
		colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#F7DC6F'],
	});

	// Confeti con emojis de éxito y cartas
	const emojis = ['✅', '✔️', '🃏', '♠️', '♥️', '♦️', '♣️', '🏆'];
	const emojiShapes = emojis.map((emoji) =>
		confetti.shapeFromText({ text: emoji, scalar: 3 })
	);

	confetti({
		...defaults,
		particleCount: 25,
		scalar: 3,
		shapes: emojiShapes,
	});
}
