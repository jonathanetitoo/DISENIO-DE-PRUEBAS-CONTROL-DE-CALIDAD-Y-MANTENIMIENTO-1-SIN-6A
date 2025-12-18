'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Effect = 'default' | 'spark' | 'wave' | 'vortex';
type AdditionalEffect = 'explode' | 'scatter' | 'implode' | 'spiral' | 'morph';
type ColorMode = 'default' | 'sapphire' | 'gold';

export default function V0ParticleAnimation() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentEffect] = useState<Effect>('default');
	const [activeEffects] = useState<Partial<Record<AdditionalEffect, boolean>>>(
		{}
	);
	const [colorMode] = useState<ColorMode>('default');
	const [svgMask, setSvgMask] = useState<ImageData | null>(null);
	const [isLoading, setIsLoading] = useState(true); // Mantener setIsLoading para la pantalla de carga
	const [isMobile, setIsMobile] = useState(false);

	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		points: THREE.Points;
		geometry: THREE.BufferGeometry;
		originalPositions: Float32Array;
		velocities: Float32Array;
		phases: Float32Array;
		intersectionPoint: THREE.Vector3 | null;
		rotationX: number;
		rotationY: number;
		isDragging: boolean;
		previousMouseX: number;
		previousMouseY: number;
		particleCount: number;
	} | null>(null);

	const currentEffectRef = useRef<Effect>(currentEffect);
	const activeEffectsRef =
		useRef<Partial<Record<AdditionalEffect, boolean>>>(activeEffects);
	const colorModeRef = useRef<ColorMode>(colorMode);
	const svgMaskRef = useRef<ImageData | null>(null);

	// Detectar si es móvil
	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	// Clamp utility
	const clamp = (value: number, min: number, max: number) => {
		return Math.max(min, Math.min(max, value));
	};

	// Cargar SVG
	useEffect(() => {
		const loadSVG = () => {
			try {
				console.log('Intentando cargar SVG...');
				const img = new Image();
				img.crossOrigin = 'anonymous';

				img.onerror = (e) => {
					console.error('Error cargando imagen:', e);
					console.log(
						'Asegúrate de que el archivo esté en /public/iconAeccDark.svg'
					);
					createDefaultShape();
				};

				img.onload = () => {
					console.log('SVG cargado exitosamente');
					console.log('Dimensiones originales:', img.width, 'x', img.height);

					try {
						const canvas = document.createElement('canvas');
						const ctx = canvas.getContext('2d', { willReadFrequently: true });
						if (!ctx) {
							console.error('No se pudo obtener contexto 2d');
							createDefaultShape();
							return;
						}

						// Dimensiones del canvas - ajusta según necesites
						canvas.width = 1000;
						canvas.height = 600;

						console.log('Canvas creado:', canvas.width, 'x', canvas.height);

						// Fondo negro para detectar mejor las formas
						ctx.fillStyle = 'black';
						ctx.fillRect(0, 0, canvas.width, canvas.height);

						// Dibuja el SVG centrado y escalado
						const scale =
							Math.min(canvas.width / img.width, canvas.height / img.height) *
							0.9;
						const x = (canvas.width - img.width * scale) / 2;
						const y = (canvas.height - img.height * scale) / 2;

						ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

						// Obtiene los datos
						const imageData = ctx.getImageData(
							0,
							0,
							canvas.width,
							canvas.height
						);
						console.log(
							'ImageData obtenido:',
							imageData.width,
							'x',
							imageData.height
						);

						// Contar píxeles de color para verificar
						let colorPixels = 0;
						for (let i = 0; i < imageData.data.length; i += 4) {
							const r = imageData.data[i];
							const g = imageData.data[i + 1];
							const b = imageData.data[i + 2];
							const a = imageData.data[i + 3];

							// No es negro y tiene alpha
							if (a > 10 && (r > 10 || g > 10 || b > 10)) {
								colorPixels++;
							}
						}
						console.log('Píxeles con color encontrados:', colorPixels);

						if (colorPixels < 100) {
							console.warn(
								'Muy pocos píxeles detectados, puede haber un problema'
							);
						}

						setSvgMask(imageData);
						svgMaskRef.current = imageData;
						setIsLoading(false);
					} catch (error) {
						console.error('Error procesando imagen:', error);
						createDefaultShape();
					}
				};

				img.src = '/iconAeccDark.svg';

				// Timeout de seguridad
				setTimeout(() => {
					if (isLoading) {
						console.log('Timeout cargando SVG, usando forma por defecto');
						createDefaultShape();
					}
				}, 5000);
			} catch (error) {
				console.error('Error en loadSVG:', error);
				createDefaultShape();
			}
		};

		// Función para crear una forma por defecto si el SVG falla
		const createDefaultShape = () => {
			console.log('Creando forma por defecto');
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			canvas.width = 400;
			canvas.height = 200;

			// Fondo negro
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Dibujar texto "AECC" como forma por defecto
			ctx.fillStyle = 'white';
			ctx.font = 'bold 80px Arial';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('AECC', canvas.width / 2, canvas.height / 2);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			console.log('Forma por defecto creada');
			setSvgMask(imageData);
			svgMaskRef.current = imageData;
			setIsLoading(false);
		};

		loadSVG();
	}, []);

	useEffect(() => {
		currentEffectRef.current = currentEffect;
	}, [currentEffect]);

	useEffect(() => {
		activeEffectsRef.current = activeEffects;
	}, [activeEffects]);

	useEffect(() => {
		colorModeRef.current = colorMode;
	}, [colorMode]);

	useEffect(() => {
		svgMaskRef.current = svgMask;
	}, [svgMask]);

	useEffect(() => {
		if (!canvasRef.current || !containerRef.current || !svgMask) {
			console.log('Esperando recursos...', {
				canvas: !!canvasRef.current,
				container: !!containerRef.current,
				svgMask: !!svgMask,
			});
			return;
		}

		console.log('Iniciando renderizado de partículas');
		console.log('Modo móvil:', isMobile);

		const container = containerRef.current;
		const canvas = canvasRef.current;

		// Función dist que usa el SVG mask - MEJORADA para detectar cualquier color
		const dist = (px: number, py: number): number => {
			if (!svgMaskRef.current) return 1;

			// Convierte las coordenadas del mundo (-2 a 2, -1 a 1) a coordenadas de imagen
			const imgX = Math.floor(((px + 2) / 4) * svgMaskRef.current.width);
			const imgY = Math.floor(((1 - py) / 2) * svgMaskRef.current.height);

			if (
				imgX < 0 ||
				imgX >= svgMaskRef.current.width ||
				imgY < 0 ||
				imgY >= svgMaskRef.current.height
			) {
				return 1;
			}

			const index = (imgY * svgMaskRef.current.width + imgX) * 4;
			const r = svgMaskRef.current.data[index];
			const g = svgMaskRef.current.data[index + 1];
			const b = svgMaskRef.current.data[index + 2];
			const a = svgMaskRef.current.data[index + 3];

			// Considera un píxel como parte del logo si NO es negro y tiene alpha
			// Negro puro es r=0, g=0, b=0
			const isBlack = r < 20 && g < 20 && b < 20;
			const hasAlpha = a > 10;

			// Retorna valor negativo si está dentro del logo (no es negro y tiene alpha)
			return hasAlpha && !isBlack ? -0.1 : 1;
		};

		const handleResize = () => {
			if (sceneRef.current) {
				const { camera, renderer } = sceneRef.current;
				const newWidth = container.clientWidth;
				const newHeight = container.clientHeight;

				camera.aspect = newWidth / newHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(newWidth, newHeight);
			}
		};

		window.addEventListener('resize', handleResize);

		// Set initial size
		const initialWidth = container.clientWidth;
		const initialHeight = container.clientHeight;

		console.log(
			'Dimensiones del contenedor:',
			initialWidth,
			'x',
			initialHeight
		);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			initialWidth / initialHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: !isMobile, // Desactivar antialiasing en móvil para mejor rendimiento
			alpha: true,
			powerPreference: isMobile ? 'low-power' : 'high-performance',
		});

		// Reducir pixelRatio en móviles para mejor rendimiento
		renderer.setPixelRatio(
			isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
		);
		renderer.setSize(initialWidth, initialHeight);

		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();
		const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

		// Generate particles - Reducir cantidad en móviles
		console.log('Generando partículas...');
		const numParticles = isMobile ? 2000 : 15000; // Menos partículas en móvil
		const thickness = 0.2;
		const positions = new Float32Array(numParticles * 3);
		const colors = new Float32Array(numParticles * 3);
		let i = 0;
		const maxAttempts = isMobile ? 1000000 : 2000000; // Menos intentos en móvil
		let attempts = 0;

		while (i < numParticles && attempts < maxAttempts) {
			attempts++;
			const x = Math.random() * 4 - 2;
			const y = Math.random() * 2 - 1;
			const z = Math.random() * thickness - thickness / 2;

			if (dist(x, y) <= 0) {
				positions[i * 3] = x;
				positions[i * 3 + 1] = y;
				positions[i * 3 + 2] = z;
				colors[i * 3] = 1;
				colors[i * 3 + 1] = 1;
				colors[i * 3 + 2] = 1;
				i++;
			}

			// Log de progreso cada 1000 partículas
			if (i > 0 && i % 1000 === 0) {
				console.log(
					`Partículas generadas: ${String(i)}/${String(numParticles)}`
				);
			}
		}

		console.log(
			'Partículas generadas:',
			i,
			'de',
			numParticles,
			'intentos:',
			attempts
		);

		if (i === 0) {
			console.error('No se generaron partículas! Verifica la función dist()');
			console.log('Probando algunos puntos de la función dist:');
			console.log('dist(0, 0):', dist(0, 0));
			console.log('dist(-1, 0):', dist(-1, 0));
			console.log('dist(1, 0):', dist(1, 0));
			console.log('dist(0, -0.5):', dist(0, -0.5));
			console.log('dist(0, 0.5):', dist(0, 0.5));
			return;
		}

		const originalPositions = positions.slice();
		const phases = new Float32Array(i);
		const velocities = new Float32Array(i * 3);

		for (let j = 0; j < i; j++) {
			phases[j] = Math.random() * Math.PI * 2;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		// Tamaño de partículas más grande en móvil
		const material = new THREE.PointsMaterial({
			size: isMobile ? 0.012 : 0.008,
			sizeAttenuation: true,
			vertexColors: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		// Posición de cámara más alejada en móvil para ver mejor
		camera.position.set(0, 0, isMobile ? 4.2 : 1.5);

		console.log('Escena configurada, iniciando animación');

		// Store scene data
		sceneRef.current = {
			scene,
			camera,
			renderer,
			points,
			geometry,
			originalPositions,
			velocities,
			phases,
			intersectionPoint: null,
			rotationX: 0,
			rotationY: 0,
			isDragging: false,
			previousMouseX: 0,
			previousMouseY: 0,
			particleCount: i,
		};

		// Mouse move handler for particle effects
		const handleMouseMove = (event: MouseEvent) => {
			if (!sceneRef.current) return;
			const rect = canvas.getBoundingClientRect();
			const offsetX = event.clientX - rect.left;
			const offsetY = event.clientY - rect.top;
			mouse.x = (offsetX / canvas.clientWidth) * 2 - 1;
			mouse.y = -(offsetY / canvas.clientHeight) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);
			const intersect = new THREE.Vector3();
			if (raycaster.ray.intersectPlane(plane, intersect)) {
				sceneRef.current.intersectionPoint = intersect;
			}
		};

		const handleMouseLeave = () => {
			if (sceneRef.current) {
				sceneRef.current.intersectionPoint = null;
			}
		};

		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseleave', handleMouseLeave);

		// Animation loop
		let animationId: number;
		let lastTime = 0;
		const targetFPS = isMobile ? 30 : 60; // Limitar FPS en móvil
		const frameInterval = 1000 / targetFPS;

		const animate = (timestamp: number) => {
			if (!sceneRef.current) return;

			// Control de FPS en móvil
			if (isMobile) {
				const elapsed = timestamp - lastTime;
				if (elapsed < frameInterval) {
					animationId = requestAnimationFrame(animate);
					return;
				}
				lastTime = timestamp - (elapsed % frameInterval);
			}

			const time = timestamp * 0.001;
			const {
				geometry,
				points,
				originalPositions,
				velocities,
				phases,
				intersectionPoint,
				rotationX,
				rotationY,
				particleCount,
			} = sceneRef.current;

			const positionAttribute = geometry.getAttribute(
				'position'
			) as THREE.BufferAttribute;
			const colorAttribute = geometry.getAttribute(
				'color'
			) as THREE.BufferAttribute;

			const radiusSwirl = 0.01;
			const angularSpeed = 1;
			const effectRadius = 0.3;

			let repelStrength = 0;
			if (currentEffectRef.current === 'default') {
				repelStrength = 0.05;
			} else if (currentEffectRef.current === 'spark') {
				repelStrength = 0.5;
			}

			const attractStrength = 0.05;
			const damping = 0.95;

			// Update rotations
			points.rotation.y += (rotationY - points.rotation.y) * 0.1;
			points.rotation.x += (rotationX - points.rotation.x) * 0.1;

			// Compute inverse quaternion
			const euler = new THREE.Euler(
				points.rotation.x,
				points.rotation.y,
				points.rotation.z,
				'XYZ'
			);
			const inverseQuaternion = new THREE.Quaternion()
				.setFromEuler(euler)
				.invert();

			let localIntersection: THREE.Vector3 | null = null;
			if (intersectionPoint) {
				localIntersection = intersectionPoint
					.clone()
					.applyQuaternion(inverseQuaternion);
			}

			// Compute factors for additional effects
			const additionalFactors: Partial<Record<AdditionalEffect, number>> = {};
			Object.keys(activeEffectsRef.current).forEach((key) => {
				const effectKey = key as AdditionalEffect;
				additionalFactors[effectKey] = activeEffectsRef.current[effectKey]
					? 1
					: 0;
			});

			// Update particles
			for (let j = 0; j < particleCount; j++) {
				const idx = j * 3;
				const ox = originalPositions[idx];
				const oy = originalPositions[idx + 1];
				const oz = originalPositions[idx + 2];

				const theta = angularSpeed * time + phases[j];
				const swirlDx = radiusSwirl * Math.cos(theta);
				const swirlDy = radiusSwirl * Math.sin(theta);

				const targetX = ox + swirlDx;
				const targetY = oy + swirlDy;
				const targetZ = oz;

				let px = positionAttribute.getX(j);
				let py = positionAttribute.getY(j);
				let pz = positionAttribute.getZ(j);

				let vx = velocities[idx];
				let vy = velocities[idx + 1];
				let vz = velocities[idx + 2];

				// Additional global effects with factors
				const explodeFactor = additionalFactors.explode ?? 0;
				const scatterFactor = additionalFactors.scatter ?? 0;
				const implodeFactor = additionalFactors.implode ?? 0;
				const spiralFactor = additionalFactors.spiral ?? 0;
				const morphFactor = additionalFactors.morph ?? 0;

				// Explode
				const cx = px - 0;
				const cy = py - 0;
				const cz = pz - 0;
				const cdistSq = cx * cx + cy * cy + cz * cz;
				const cdist = Math.sqrt(cdistSq);

				if (explodeFactor > 0 && cdist > 0.001) {
					vx += (cx / cdist) * 0.1 * explodeFactor;
					vy += (cy / cdist) * 0.1 * explodeFactor;
					vz += (cz / cdist) * 0.1 * explodeFactor;
				}

				// Scatter
				if (scatterFactor > 0) {
					vx += (Math.random() - 0.5) * 0.05 * scatterFactor;
					vy += (Math.random() - 0.5) * 0.05 * scatterFactor;
					vz += (Math.random() - 0.5) * 0.05 * scatterFactor;
				}

				// Implode
				if (implodeFactor > 0 && cdist > 0.001) {
					vx -= (cx / cdist) * 0.1 * implodeFactor;
					vy -= (cy / cdist) * 0.1 * implodeFactor;
					vz -= (cz / cdist) * 0.1 * implodeFactor;
				}

				// Spiral (global vortex)
				if (spiralFactor > 0 && cdist > 0.05) {
					const vortexStrength = 0.15 * spiralFactor;
					const tangentX = -cy;
					const tangentY = cx;
					const tangentLength = Math.sqrt(
						tangentX * tangentX + tangentY * tangentY
					);
					if (tangentLength > 0.001) {
						vx += (tangentX / tangentLength) * vortexStrength;
						vy += (tangentY / tangentLength) * vortexStrength;
					}
					const pullStrength = vortexStrength * 0.3;
					vx -= (cx / cdist) * pullStrength;
					vy -= (cy / cdist) * pullStrength;
				}

				// Morph
				if (morphFactor > 0) {
					const angle = Math.atan2(py, px) + time * 2;
					const radius = Math.sqrt(px * px + py * py + pz * pz);
					const offsetX =
						Math.cos(angle) * Math.sin(radius * 2) * 0.2 * morphFactor;
					const offsetY = Math.sin(angle * 1.5) * 0.15 * morphFactor;
					const offsetZ = 0;
					vx += offsetX;
					vy += offsetY;
					vz += offsetZ;
				}

				// Special effects (mouse-based)
				if (localIntersection) {
					const dx = px - localIntersection.x;
					const dy = py - localIntersection.y;
					const dz = pz - localIntersection.z;
					const distSq = dx * dx + dy * dy + dz * dz;
					const dist = Math.sqrt(distSq);

					if (currentEffectRef.current === 'wave') {
						if (distSq < effectRadius * effectRadius) {
							const waveStrength = 0.3;
							const waveFreq = 15;
							const wavePhase = time * 8 - dist * waveFreq;
							const waveForce =
								Math.sin(wavePhase) * waveStrength * (1 - dist / effectRadius);
							if (dist > 0.001) {
								vx += (dx / dist) * waveForce;
								vy += (dy / dist) * waveForce;
								vz += waveForce * 0.5;
							}
						}
					} else if (currentEffectRef.current === 'vortex') {
						if (distSq < effectRadius * effectRadius && dist > 0.05) {
							const vortexStrength = 0.15;
							const spiralForce = vortexStrength * (1 - dist / effectRadius);
							const tangentX = -dy;
							const tangentY = dx;
							const tangentLength = Math.sqrt(
								tangentX * tangentX + tangentY * tangentY
							);
							if (tangentLength > 0.001) {
								vx += (tangentX / tangentLength) * spiralForce;
								vy += (tangentY / tangentLength) * spiralForce;
							}
							const pullStrength = spiralForce * 0.3;
							vx -= (dx / dist) * pullStrength;
							vy -= (dy / dist) * pullStrength;
						}
					} else if (currentEffectRef.current === 'spark') {
						if (distSq < effectRadius * effectRadius && distSq > 0.0001) {
							const force = (1 - dist / effectRadius) * repelStrength;
							vx += (dx / dist) * force;
							vy += (dy / dist) * force;
							vz += (dz / dist) * force;
						}
					}
				}

				// Attract to target
				const attractDx = targetX - px;
				const attractDy = targetY - py;
				const attractDz = targetZ - pz;
				vx += attractDx * attractStrength;
				vy += attractDy * attractStrength;
				vz += attractDz * attractStrength;

				// Damping
				vx *= damping;
				vy *= damping;
				vz *= damping;

				// Update position
				px += vx;
				py += vy;
				pz += vz;

				positionAttribute.setXYZ(j, px, py, pz);
				velocities[idx] = vx;
				velocities[idx + 1] = vy;
				velocities[idx + 2] = vz;

				// Color effects
				let r: number, g: number, b: number;
				const minX = -2;
				const range = 4;
				const t = clamp((ox - minX) / range, 0, 1);

				if (colorModeRef.current === 'sapphire') {
					r = (1 - t) * 0 + t * 0.0588;
					g = (1 - t) * 0.1216 + t * 0.3216;
					b = (1 - t) * 0.2471 + t * 0.7294;
				} else if (colorModeRef.current === 'gold') {
					r = (1 - t) * 0.7216 + t * 1;
					g = (1 - t) * 0.5255 + t * 0.8431;
					b = (1 - t) * 0.0431 + t * 0;
				} else {
					r = 4;
					g = 4;
					b = 4;
				}

				if (localIntersection) {
					const dx = px - localIntersection.x;
					const dy = py - localIntersection.y;
					const dz = pz - localIntersection.z;
					const distSq = dx * dx + dy * dy + dz * dz;
					const dist = Math.sqrt(distSq);

					if (
						currentEffectRef.current === 'wave' &&
						distSq < effectRadius * effectRadius
					) {
						const wavePhase = time * 8 - dist * 15;
						const intensity =
							Math.abs(Math.sin(wavePhase)) * (1 - dist / effectRadius) + 1;
						r = intensity * 2.0 + 3.0;
						g = intensity * 3.0 + 2.5;
						b = intensity * 4.5 + 1.5;
					} else if (
						currentEffectRef.current === 'vortex' &&
						distSq < effectRadius * effectRadius
					) {
						const angle = Math.atan2(dy, dx) + time * 5;
						const intensity = (1 - dist / effectRadius) * 3.5 + 1;
						r = (Math.sin(angle) * 0.5 + 0.5) * intensity * 3.5;
						g =
							(Math.sin(angle + (Math.PI * 2) / 3) * 0.5 + 0.5) *
							intensity *
							3.5;
						b =
							(Math.sin(angle + (Math.PI * 4) / 3) * 0.5 + 0.5) *
							intensity *
							3.5;
					}
				}

				// Additional color effects
				if (explodeFactor > 0) {
					const intensity =
						1 + Math.sin(time * 8 - cdist * 15) * 0.5 * explodeFactor;
					r = intensity * 10.0;
					g = intensity * 5.0;
					b = intensity * 2.0;
				}
				if (scatterFactor > 0) {
					r = 3.0 + Math.random() * 1.5 * scatterFactor;
					g = 6.0 + Math.random() * 1.5 * scatterFactor;
					b = 3.0 + Math.random() * 1.5 * scatterFactor;
				}
				if (implodeFactor > 0) {
					const intensity =
						1 + Math.sin(time * 8 - cdist * 15) * 0.5 * implodeFactor;
					r = intensity * 2.0;
					g = intensity * 2.0;
					b = intensity * 10.0;
				}
				if (spiralFactor > 0) {
					const angle = Math.atan2(cy, cx) + time * 5;
					const intensity = 10;
					r = (Math.sin(angle) * 0.5 + 0.5) * intensity;
					g = (Math.sin(angle + (Math.PI * 2) / 3) * 0.5 + 0.5) * intensity;
					b = (Math.sin(angle + (Math.PI * 4) / 3) * 0.5 + 0.5) * intensity;
				}
				if (morphFactor > 0) {
					const angle = Math.atan2(py, px) + time * 2;
					const intensity = (Math.sin(angle) * 0.5 + 0.5) * 2 + 1 * morphFactor;
					r = intensity * 7.0;
					g = intensity * 4.0;
					b = intensity * 5.5;
				}

				colorAttribute.setXYZ(j, r, g, b);
			}

			positionAttribute.needsUpdate = true;
			colorAttribute.needsUpdate = true;
			renderer.render(scene, camera);
			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		// Cleanup
		return () => {
			cancelAnimationFrame(animationId);
			canvas.removeEventListener('mousemove', handleMouseMove);
			canvas.removeEventListener('mouseleave', handleMouseLeave);
			geometry.dispose();
			window.removeEventListener('resize', handleResize);
			material.dispose();
			renderer.dispose();
		};
	}, [svgMask, isMobile]);

	// Mouse drag handlers
	const handleMouseDown = (event: React.MouseEvent) => {
		if (!sceneRef.current) return;
		sceneRef.current.isDragging = true;
		sceneRef.current.previousMouseX = event.clientX;
		sceneRef.current.previousMouseY = event.clientY;
	};

	const handleMouseMoveDrag = (event: React.MouseEvent) => {
		if (!sceneRef.current?.isDragging) return;
		const deltaX = event.clientX - sceneRef.current.previousMouseX;
		const deltaY = event.clientY - sceneRef.current.previousMouseY;
		sceneRef.current.rotationY -= deltaX * 0.005;
		sceneRef.current.rotationX -= deltaY * 0.005;
		sceneRef.current.previousMouseX = event.clientX;
		sceneRef.current.previousMouseY = event.clientY;
	};

	const handleMouseUp = () => {
		if (sceneRef.current) {
			sceneRef.current.isDragging = false;
		}
	};

	// Touch handlers
	const handleTouchStart = (event: React.TouchEvent) => {
		if (!sceneRef.current) return;
		sceneRef.current.isDragging = true;
		sceneRef.current.previousMouseX = event.touches[0].clientX;
		sceneRef.current.previousMouseY = event.touches[0].clientY;
	};

	const handleTouchMove = (event: React.TouchEvent) => {
		if (!sceneRef.current?.isDragging) return;
		const deltaX = event.touches[0].clientX - sceneRef.current.previousMouseX;
		const deltaY = event.touches[0].clientY - sceneRef.current.previousMouseY;
		sceneRef.current.rotationY -= deltaX * 0.005;
		sceneRef.current.rotationX -= deltaY * 0.005;
		sceneRef.current.previousMouseX = event.touches[0].clientX;
		sceneRef.current.previousMouseY = event.touches[0].clientY;
	};

	const handleTouchEnd = () => {
		if (sceneRef.current) {
			sceneRef.current.isDragging = false;
		}
	};

	return (
		<div
			ref={containerRef}
			className="relative flex items-center justify-center min-h-screen w-full h-screen "
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMoveDrag}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center text-white z-10">
					<div className="text-center">
						<div className="text-xl mb-2">Cargando...</div>
						{isMobile && (
							<div className="text-sm text-gray-400">
								Optimizando para móvil
							</div>
						)}
					</div>
				</div>
			)}
			<canvas
				ref={canvasRef}
				className="block"
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}
