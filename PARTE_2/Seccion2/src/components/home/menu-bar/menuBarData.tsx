'use client';

import { type Variants, type Transition } from 'framer-motion';
import { Club } from 'lucide-react';
import { MenuItem } from './menuBarTypes';
/*
export const menuItems: MenuItem[] = [
	{
		icon: <Shirt className="h-5 w-5" />,
		label: 'Merch',
		href: '/aecc-uide-web/merch',
		gradient:
			'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
		iconColor: 'text-orange-500',
	},
	{
		icon: <Club className="h-5 w-5" />,
		label: 'Cuarenta',
		href: '/aecc-uide-web/cuarenta',
		gradient:
			'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(30,64,175,0) 100%)',
		iconColor: 'text-blue-500',
	},
];
*/
export const menuItems: MenuItem[] = [
	{
		icon: <Club className="h-5 w-5" />,
		label: 'Cuarenta',
		href: '/aecc-uide-web/cuarenta',
		gradient:
			'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(30,64,175,0) 100%)',
		iconColor: 'text-blue-500',
	},
];

export const itemVariants: Variants = {
	initial: { rotateX: 0, opacity: 1 },
	hover: { rotateX: -90, opacity: 0 },
};

export const backVariants: Variants = {
	initial: { rotateX: 90, opacity: 0 },
	hover: { rotateX: 0, opacity: 1 },
};

export const glowVariants: Variants = {
	initial: { opacity: 0, scale: 0.8 },
	hover: {
		opacity: 1,
		scale: 2,
		transition: {
			opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
			scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
		},
	},
};

export const navGlowVariants: Variants = {
	initial: { opacity: 0 },
	hover: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

export const sharedTransition: Transition = {
	type: 'spring',
	stiffness: 100,
	damping: 20,
	duration: 0.5,
};
