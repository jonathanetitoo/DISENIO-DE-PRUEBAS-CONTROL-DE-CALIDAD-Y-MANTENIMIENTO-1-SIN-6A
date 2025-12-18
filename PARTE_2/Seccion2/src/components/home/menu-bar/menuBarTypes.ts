'use client';

import type * as React from 'react';

export interface MenuItem {
	icon: React.ReactNode;
	label: string;
	href: string;
	gradient: string;
	iconColor: string;
}
