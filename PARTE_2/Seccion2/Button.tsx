import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
	'font-bold rounded inline-flex items-center justify-center',
	{
		variants: {
			variant: {
				primary: 'bg-blue-500 text-white hover:bg-blue-700',
				secondary: 'bg-gray-500 text-white hover:bg-gray-700',
				danger: 'bg-red-500 text-white hover:bg-red-700',
			},
			size: {
				small: 'px-2 py-1 text-sm',
				medium: 'px-4 py-2 text-base',
				large: 'px-6 py-3 text-lg',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'medium',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = ({
	className,
	variant,
	size,
	children,
	...props
}: ButtonProps) => {
	return (
		<button
			className={twMerge(buttonVariants({ variant, size }), className)}
			{...props}
		>
			{children}
		</button>
	);
};
