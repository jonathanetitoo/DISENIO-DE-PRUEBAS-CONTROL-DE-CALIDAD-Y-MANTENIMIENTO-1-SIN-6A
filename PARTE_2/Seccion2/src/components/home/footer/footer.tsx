'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import footerData from './footerData';

export default function CustomFooter() {
	const { theme } = useTheme();
	const isDarkTheme = theme === 'dark';

	return (
		<div
			className="py-6 px-4 sm:px-8 md:px-26 lg:px-40 transition-colors "
			style={{
				backgroundColor: isDarkTheme ? 'var(--background)' : 'var(--card)',
				color: 'var(--foreground)',
			}}
		>
			{/* Primera fila */}
			<div className="flex justify-between items-center mb-4">
				{/* Redes Sociales */}
				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">{footerData.titleFollow}</h3>
					<div className="flex gap-3">
						{footerData.socials.map((social, index) => (
							<a
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-xl text-(--text-color-icon)"
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>
				{/* Logo */}
				<div
					className="text-2xl font-bold"
					style={{ color: 'var(--muted-foreground)' }}
				>
					AECC
				</div>
			</div>
			{/* Línea divisoria */}
			<hr className="my-4" style={{ borderColor: 'var(--border)' }} />
			{/* Segunda fila */}
			<div className="flex items-center gap-6">
				<h3 className="font-bold text-lg">{footerData.title}</h3>
				<div className="flex gap-6">
					{footerData.authors.map((author, index) => (
						<div
							className="flex items-center gap-2"
							key={`${author.name}-${String(index)}`}
						>
							<div
								className="w-6 h-6 bg-cover bg-center rounded-full"
								style={{ backgroundImage: `url(${author.perfilGithub})` }}
							></div>
							<a href={author.href} target="_blank" rel="noopener noreferrer">
								<p className="text-sm">{author.name}</p>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
