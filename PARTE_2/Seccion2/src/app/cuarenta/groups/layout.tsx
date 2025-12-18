'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type View = 'Inscritos' | 'Primera ronda' | 'Podios';

export default function GroupsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const activeView = (searchParams.get('view') ?? 'Inscritos') as View;

	const handleViewChange = (view: View) => {
		const params = new URLSearchParams(searchParams);
		params.set('view', view);
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center">Equipos Inscritos</h1>
			<div className="flex justify-center my-8">
				<div className="flex space-x-2 bg-muted p-1 rounded-xl">
					<button
						id="inscritos-btn"
						onClick={() => {
							handleViewChange('Inscritos');
						}}
						className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${activeView === 'Inscritos' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:bg-background/50'}`}
					>
						Inscritos
					</button>
					<button
						id="primera-ronda-btn"
						onClick={() => {
							handleViewChange('Primera ronda');
						}}
						className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${activeView === 'Primera ronda' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:bg-background/50'}`}
					>
						Primera Ronda
					</button>
					<button
						id="podios-btn"
						onClick={() => {
							handleViewChange('Podios');
						}}
						className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${activeView === 'Podios' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:bg-background/50'}`}
					>
						Podios
					</button>
				</div>
			</div>
			<hr className="mb-8 border-t border-border" />
			{children}
		</div>
	);
}
