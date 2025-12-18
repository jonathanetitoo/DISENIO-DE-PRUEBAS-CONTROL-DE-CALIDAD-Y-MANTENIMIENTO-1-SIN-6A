import { motion, type Transition, type Variants } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import {
	menuItems,
	itemVariants,
	backVariants,
	glowVariants,
	sharedTransition,
} from '../menuBarData.tsx';

export function MenuBarDesktop() {
	return (
		<ul className="hidden sm:flex items-center gap-2 relative z-10 px-4 justify-between w-full">
			<div className="flex items-center">
				<div className="text-lg font-bold">
					<a href="/aecc-uide-web">AECC</a>
				</div>

				<div className="ml-8 flex items-center">
					{menuItems.map((item) => (
						<motion.li key={item.label} className="relative">
							<motion.div
								className="block rounded-xl overflow-visible group relative"
								style={{ perspective: '600px' }}
								whileHover="hover"
								initial="initial"
							>
								<motion.div
									className="absolute inset-0 z-0 pointer-events-none"
									variants={glowVariants as Variants}
									style={{
										background: item.gradient,
										opacity: 0,
										borderRadius: '16px',
									}}
								/>
								<motion.a
									href={item.href}
									className="flex items-center gap-2 px-4 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
									variants={itemVariants}
									transition={sharedTransition as Transition}
									style={{
										transformStyle: 'preserve-3d',
										transformOrigin: 'center bottom',
									}}
								>
									<span
										className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}
									>
										{item.icon}
									</span>
									<span>{item.label}</span>
								</motion.a>
								<motion.a
									href={item.href}
									className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
									variants={backVariants}
									transition={sharedTransition as Transition}
									style={{
										transformStyle: 'preserve-3d',
										transformOrigin: 'center top',
										rotateX: 90,
									}}
								>
									<span
										className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}
									>
										{item.icon}
									</span>
									<span>{item.label}</span>
								</motion.a>
							</motion.div>
						</motion.li>
					))}
				</div>
			</div>

			<div className="flex items-center">
				<ThemeToggle />
			</div>
		</ul>
	);
}
