'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { navGlowVariants } from './menuBarData';
import { MenuBarMobile } from './components/menuBarMobile.tsx';
import { MenuBarDesktop } from './components/menuBarDesktop.tsx';

export function MenuBar() {
	const { theme } = useTheme();
	const isDarkTheme = theme === 'dark';

	return (
		<motion.nav
			className="fixed p-1 lg:flex lg:min-h-12 lg:gap-sm lg:px-4 backdrop-blur-md bg-background/60 from-white/20 to-white/5 shadow-[0_1px_6px_rgba(0,0,0,0.03)] border-white/5 overflow-hidden top-0 left-0 right-0 z-50"
			initial="initial"
			whileHover="hover"
		>
			<motion.div
				className={`absolute -inset-2 bg-gradient-radial from-transparent ${
					isDarkTheme
						? 'via-purple-400/20 via-40%'
						: 'via-purple-400/15 via-40%'
				} to-transparent rounded-3xl z-0 pointer-events-none`}
				variants={navGlowVariants}
			/>

			{/* Borde inferior sutil con degradado */}
			<div className="absolute bottom-0 left-0 right-0 h-px from-transparent via-white/20 to-transparent" />

			{/* Vista móvil */}
			<MenuBarMobile />

			{/* Vista escritorio */}
			<MenuBarDesktop />
		</motion.nav>
	);
}
