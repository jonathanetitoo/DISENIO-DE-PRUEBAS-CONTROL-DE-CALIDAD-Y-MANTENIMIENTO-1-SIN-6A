import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import type { ButtonProps } from './Button';

describe('Button Component', () => {
	// Pruebas combinatorias para renderizado y atributos
	const testCases: ButtonProps[] = [
		{ variant: 'primary', size: 'small', disabled: true },
		{ variant: 'primary', size: 'medium', disabled: false },
		{ variant: 'primary', size: 'large', disabled: true },
		{ variant: 'secondary', size: 'small', disabled: false },
		{ variant: 'secondary', size: 'medium', disabled: true },
		{ variant: 'secondary', size: 'large', disabled: false },
		{ variant: 'danger', size: 'small', disabled: true },
		{ variant: 'danger', size: 'medium', disabled: false },
		{ variant: 'danger', size: 'large', disabled: true },
	];

	test.each(testCases)(
		'debe renderizar correctamente con variant=$variant, size=$size, y disabled=$disabled',
		({ variant, size, disabled }) => {
			render(
				<Button variant={variant} size={size} disabled={disabled}>
					Test Button
				</Button>
			);

			const button = screen.getByRole('button', { name: /Test Button/i });

			// 1. Verificar que el botón se renderiza
			expect(button).toBeInTheDocument();

			// 2. Verificar el estado 'disabled'
			if (disabled) {
				expect(button).toBeDisabled();
			} else {
				expect(button).not.toBeDisabled();
			}
		}
	);

	// Prueba de funcionalidad (onClick)
	test('debe llamar a la función onClick cuando se hace clic', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Haz clic aquí</Button>);
		const buttonElement = screen.getByText(/haz clic aquí/i);
		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
