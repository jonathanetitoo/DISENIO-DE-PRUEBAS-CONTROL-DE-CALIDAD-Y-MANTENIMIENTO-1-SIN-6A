/**
 * Dispara una animación de moneda roja con X que rebota
 * indicando un fallo en el envío al servidor
 */
export function triggerCoinFlipErrorAnimation() {
	const coinSize = 5; // rem
	const coinThickness = coinSize / 11;

	// Crear el contenedor de la moneda
	const overlay = document.createElement('div');
	overlay.className = 'error-coin-overlay';
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 10%;
	`;

	const coinWrapper = document.createElement('div');
	coinWrapper.style.cssText = `
		position: relative;
		width: ${String(coinSize)}rem;
		height: ${String(coinSize)}rem;
	`;

	const coin = document.createElement('div');
	coin.style.cssText = `
		position: absolute;
		width: ${String(coinSize)}rem;
		height: ${String(coinSize)}rem;
		left: 50%;
		transform: translateX(-50%);
	`;

	// Cara frontal de la moneda (con X)
	const front = document.createElement('div');
	front.style.cssText = `
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 3;
		background:
			radial-gradient(circle at 50% 50%, transparent 50%, rgba(139, 0, 0, 0.4) 54%, #DC143C 54%),
			linear-gradient(135deg, #FF6B6B 0%, #DC143C 50%, #8B0000 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	const xFront = document.createElement('span');
	xFront.textContent = '✕';
	xFront.style.cssText = `
		font-size: 3.5rem;
		color: white;
		font-weight: bold;
		text-shadow: 
			0 2px 4px rgba(0, 0, 0, 0.5),
			0 0 10px rgba(255, 255, 255, 0.3);
	`;
	front.appendChild(xFront);

	// Parte media (grosor de la moneda)
	const middle = document.createElement('div');
	middle.style.cssText = `
		background: linear-gradient(90deg, #8B0000 0%, #DC143C 50%, #8B0000 100%);
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 2;
	`;

	// Cara trasera de la moneda (con X)
	const back = document.createElement('div');
	back.style.cssText = `
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 1;
		background:
			radial-gradient(circle at 50% 50%, transparent 50%, rgba(139, 0, 0, 0.4) 54%, #DC143C 54%),
			linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF6B6B 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	const xBack = document.createElement('span');
	xBack.textContent = '✕';
	xBack.style.cssText = `
		font-size: 3.5rem;
		color: white;
		font-weight: bold;
		text-shadow: 
			0 2px 4px rgba(0, 0, 0, 0.5),
			0 0 10px rgba(255, 255, 255, 0.3);
		transform: scaleX(-1);
	`;
	back.appendChild(xBack);

	// Brillo en la moneda
	const shine = document.createElement('div');
	shine.style.cssText = `
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 10;
		background:
			radial-gradient(circle at 25% 65%, transparent 50%, rgba(255, 255, 255, 0.9) 90%),
			linear-gradient(55deg, transparent 50%, #e9f4ff 50%, transparent 100%);
		pointer-events: none;
	`;

	// Borde lateral de la moneda
	const side = document.createElement('div');
	side.style.cssText = `
		background: linear-gradient(90deg, #8B0000 0%, #DC143C 50%, #8B0000 100%);
		content: '';
		height: ${String(coinThickness)}rem;
		left: 0;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		z-index: 2;
	`;

	// Sombras en las caras
	const frontShadow = document.createElement('div');
	frontShadow.style.cssText = `
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 4;
		background: rgba(0, 0, 0, 0.2);
		opacity: 0;
	`;

	const backShadow = document.createElement('div');
	backShadow.style.cssText = `
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 1;
		background: rgba(0, 0, 0, 0.2);
		opacity: 0;
	`;

	// Ensamblar la moneda
	coin.appendChild(back);
	coin.appendChild(backShadow);
	coin.appendChild(middle);
	coin.appendChild(side);
	coin.appendChild(front);
	coin.appendChild(frontShadow);
	coin.appendChild(shine);
	coinWrapper.appendChild(coin);
	overlay.appendChild(coinWrapper);
	document.body.appendChild(overlay);

	// Variables de animación
	const maxMoveLoopCount = 90;
	let moveLoopCount = 0;
	const sideRotationCount = 360; // Una rotación completa
	const maxFlipAngle = 4 * Math.PI; // 4 vueltas

	const flipCoinLoop = () => {
		moveLoopCount++;
		const percentageCompleted = moveLoopCount / maxMoveLoopCount;
		const angle =
			-maxFlipAngle * Math.pow(percentageCompleted - 1, 2) + maxFlipAngle;

		// Calcular posición y escala (parábola para el salto)
		const coinYMultiplier = -11 * Math.pow(percentageCompleted * 2 - 1, 4) + 11;
		const coinScaleMultiplier = percentageCompleted * 0.6;
		const coinRotationMultiplier = percentageCompleted * sideRotationCount;

		// Aplicar transformación principal
		coin.style.transform = `
			translateX(-50%)
			translateY(${String(-coinYMultiplier)}rem)
			scale(${String(0.4 + coinScaleMultiplier)})
			rotate(${String(-coinRotationMultiplier)}deg)
		`;

		// Calcular escalas para efecto 3D usando sin/cos (mantiene la forma circular)
		const frontScaleMultiplier = Math.max(Math.cos(angle), 0);
		const frontYMultiplier = Math.sin(angle);
		const middleScaleMultiplier = Math.abs(Math.cos(angle));
		const middleYMultiplier = Math.cos((angle + Math.PI / 2) % Math.PI);
		const backScaleMultiplier = Math.max(Math.cos(angle - Math.PI), 0);
		const backYMultiplier = Math.sin(angle - Math.PI);
		const shineOpacityMultiplier =
			4 * Math.sin((angle + Math.PI / 2) % Math.PI) - 3.2;
		const shineBgMultiplier =
			-40 * (Math.cos((angle + Math.PI / 2) % Math.PI) - 0.5);

		// Aplicar transformaciones a las caras (usa scaleY para mantener circular)
		front.style.transform = `translateY(${String(
			(frontYMultiplier * coinThickness) / 2
		)}rem) scaleY(${String(frontScaleMultiplier)})`;
		frontShadow.style.opacity = String(frontYMultiplier);
		frontShadow.style.transform = `translateY(${String(
			(frontYMultiplier * coinThickness) / 2
		)}rem) scaleY(${String(frontScaleMultiplier)})`;

		middle.style.transform = `translateY(${String(
			(middleYMultiplier * coinThickness) / 2
		)}rem) scaleY(${String(middleScaleMultiplier)})`;

		back.style.transform = `translateY(${String(
			(backYMultiplier * coinThickness) / 2
		)}rem) scaleY(${String(backScaleMultiplier)})`;
		backShadow.style.opacity = String(backYMultiplier);
		backShadow.style.transform = `translateY(${String(
			(backYMultiplier * coinThickness) / 2
		)}rem) scaleY(${String(backScaleMultiplier)})`;

		shine.style.opacity = String(Math.max(0, shineOpacityMultiplier));
		shine.style.transform = `
			translateY(${String((-middleYMultiplier * coinThickness) / 2)}rem)
			scaleY(${String(middleScaleMultiplier)})
			rotate(${String(coinRotationMultiplier)}deg)
		`;
		shine.style.background = `
			radial-gradient(circle at 25% 65%, transparent 50%, rgba(255, 255, 255, 0.9) 90%),
			linear-gradient(55deg, transparent ${String(
				shineBgMultiplier + 50
			)}%, #e9f4ff ${String(shineBgMultiplier + 50)}%, transparent ${String(
				shineBgMultiplier + 100
			)}%)
		`;

		// Continuar animación
		if (moveLoopCount < maxMoveLoopCount) {
			requestAnimationFrame(flipCoinLoop);
		} else {
			// Fade out final
			coin.style.opacity = '0';
			coin.style.transition = 'opacity 300ms linear';

			setTimeout(() => {
				document.body.removeChild(overlay);
			}, 300);
		}
	};

	flipCoinLoop();
}
