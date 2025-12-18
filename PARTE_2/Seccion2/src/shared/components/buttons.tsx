// Importaciones necesarias
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// Definición de las variantes del botón usando `cva`
const buttonVariants = cva(
	// Clases base que se aplican a todos los botones
	'rounded-md',
	{
		// Definición de las variantes
		variants: {
			// Variante "variant" para estilos específicos
			variant: {
				default: 'bg-primary hover:bg-primary-hover active:bg-primary-active', // Estilo por defecto
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
			},
			// Variante "size" para tamaños específicos
			size: {
				default: 'h-12 px-8 py-4', // Tamaño por defecto
				sm: 'h-10 rounded-md px-2 py-2', // Tamaño pequeño
			},
		},
		// Variantes por defecto si no se especifican
		defaultVariants: {
			variant: 'default', // Variante por defecto: "default"
			size: 'default', // Tamaño por defecto: "default"
		},
	}
);

// Definición de las propiedades del botón extraida de StackOverFlow
export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Extiende las propiedades nativas de un botón HTML
		VariantProps<typeof buttonVariants> {
	// Extiende las propiedades de las variantes definidas en `buttonVariants`
	lefticon?: React.ReactNode; // Propiedad opcional para un ícono a la izquierda
	rightIcon?: React.ReactNode; // Propiedad opcional para un ícono a la derecha
	loading?: boolean; // Propiedad opcional para indicar si el botón está en estado de carga
}

// Componente del botón
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	// Desestructuración de las props
	({ className, variant, size, loading = false, ...props }, ref) => {
		// Si el botón está en estado de carga, renderiza un botón deshabilitado con un ícono de carga
		if (loading) {
			return (
				<button
					// Combina las clases de las variantes con clases adicionales y estilos para el estado de carga
					className={cn(
						buttonVariants({ variant, size, className }),
						'disabled:bg-[#CC9200] disabled:text-white'
					)}
					ref={ref} // Referencia al botón
					disabled // Deshabilita el botón
					{...props} // Propiedades adicionales
				>
					{/* Ícono de carga animado (SVG) */}
					<svg
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						className="animate-spin mr-2" // Animación de giro
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* Paths y gradientes para el ícono de carga */}
						<path
							d="M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12ZM6 12C6 15.5898 8.91015 18.5 12.5 18.5C16.0898 18.5 19 15.5898 19 12C19 8.41015 16.0898 5.5 12.5 5.5C8.91015 5.5 6 8.41015 6 12Z"
							fill="url(#paint0_angular_4184_5231)"
						/>
						<path
							d="M12.5 2C13.8132 2 15.1136 2.25866 16.3268 2.76121C17.5401 3.26375 18.6425 4.00035 19.5711 4.92893C20.4997 5.85752 21.2362 6.95991 21.7388 8.17317C22.2413 9.38642 22.5 10.6868 22.5 12L19 12C19 11.1464 18.8319 10.3012 18.5052 9.51256C18.1786 8.72394 17.6998 8.00739 17.0962 7.40381C16.4926 6.80023 15.7761 6.32144 14.9874 5.99478C14.1988 5.66813 13.3536 5.5 12.5 5.5L12.5 2Z"
							fill="url(#paint1_angular_4184_5231)"
						/>
						<defs>
							<radialGradient
								id="paint0_angular_4184_5231"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(12.5 12) scale(10)"
							>
								<stop offset="0.9999" stopColor="rgb(255,255,255,0.2)" />
								<stop offset="1" stopColor="white" stopOpacity="0.01" />
							</radialGradient>
							<radialGradient
								id="paint1_angular_4184_5231"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(12.5 12) rotate(-90) scale(10)"
							>
								<stop offset="0.9999" stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0.01" />
							</radialGradient>
						</defs>
					</svg>
				</button>
			);
		}

		// Si no está en estado de carga, renderiza el botón normal
		return (
			<button
				// Combina las clases de las variantes con clases adicionales
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref} // Referencia al botón
				{...props} // Propiedades adicionales
			>
				{/* Renderiza el ícono izquierdo si está definido */}
				{props.lefticon && <span className="mr-2">{props.lefticon}</span>}
				{/* Renderiza el contenido del botón (children) */}
				{props.children}
				{/* Renderiza el ícono derecho si está definido */}
				{props.rightIcon && <span className="ml-2">{props.rightIcon}</span>}
			</button>
		);
	}
);

// Asigna un nombre al componente para facilitar la depuración
Button.displayName = 'Button';

// Exporta el componente y las variantes para su uso en otros archivos
export { Button, buttonVariants };
