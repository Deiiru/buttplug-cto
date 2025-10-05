import React from 'react';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{
			label: 'Discord',
			href: 'https://discord.gg/qYvvGPvsps',
			icon: () => (
				<svg 
					className="w-5 h-5" 
					viewBox="0 0 24 24" 
					fill="white"
					style={{
						filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 16px rgba(220, 38, 38, 0.4)) drop-shadow(0 0 24px rgba(185, 28, 28, 0.3))'
					}}
				>
					<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
				</svg>
			),
		},
		{
			label: 'Telegram',
			href: 'https://t.me/buttplugstaysin',
			icon: () => (
				<svg 
					className="w-5 h-5" 
					viewBox="0 0 24 24" 
					fill="white"
					style={{
						filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 16px rgba(220, 38, 38, 0.4)) drop-shadow(0 0 24px rgba(185, 28, 28, 0.3))'
					}}
				>
					<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
				</svg>
			),
		},
		{
			label: 'Dex',
			href: 'https://dexscreener.com/solana/72uues3swrjrgoswxjvcaixgilpmac8fp8nwsz7s7jri',
			icon: () => (
				<img 
					src="/DEX.png" 
					alt="DexScreener" 
					className="w-6 h-6 object-contain"
					style={{
						filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.8)) drop-shadow(0 0 24px rgba(220, 38, 38, 0.6)) drop-shadow(0 0 36px rgba(185, 28, 28, 0.5)) drop-shadow(0 0 48px rgba(153, 27, 27, 0.3))'
					}}
				/>
			),
		},
	];

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b border-white/20',
				'bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/10',
				'shadow-lg shadow-black/10',
			)}
		>
			<nav className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-0">
				<div className="hover:bg-white/10 flex cursor-pointer items-center gap-2 rounded-md px-0 py-1 duration-100">
					<h1 
						className="text-lg font-mono font-bold text-black dark:text-red-400"
						style={{
							filter: `
								drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))
								drop-shadow(0 0 16px rgba(37, 99, 235, 0.4))
								drop-shadow(0 0 24px rgba(29, 78, 216, 0.3))
							`
						}}
					>
						<span className="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] drop-shadow-[0_0_20px_rgba(37,99,235,0.6)] drop-shadow-[0_0_30px_rgba(29,78,216,0.4)] dark:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] dark:drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] dark:drop-shadow-[0_0_30px_rgba(185,28,28,0.4)]">
							Buttplug CTO
						</span>
					</h1>
				</div>
				<div className="flex items-center gap-8">
					<div className="hidden items-center gap-6 lg:flex">
						{links.map((link) => {
							const IconComponent = link.icon;
							const hasIcon = !!link.icon;
							return (
								<a
									className={`text-blue-400 hover:text-blue-500 hover:bg-white/10 rounded-md transition-all duration-200 flex items-center ${
										hasIcon ? 'p-2 justify-center' : 'px-3 py-2 gap-2'
									} dark:text-red-400 dark:hover:text-red-300`}
									href={link.href}
									target={link.href.startsWith('http') ? '_blank' : '_self'}
									rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
									title={hasIcon ? link.label : undefined}
									style={{
										filter: hasIcon ? `
											drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))
											drop-shadow(0 0 16px rgba(37, 99, 235, 0.4))
											drop-shadow(0 0 24px rgba(29, 78, 216, 0.3))
										` : undefined
									}}
								>
									{hasIcon && IconComponent && <IconComponent />}
									{!hasIcon && link.label}
								</a>
							);
						})}
						{/* <Button variant="outline">Sign In</Button>
					<Button>Get Started</Button> */}
					</div>
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
							showClose={false}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => {
									const IconComponent = link.icon;
									return (
										<a
											className={buttonVariants({
												variant: 'ghost',
												className: 'justify-start',
											})}
											href={link.href}
											target={link.href.startsWith('http') ? '_blank' : '_self'}
											rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
										>
											{IconComponent && <IconComponent />}
											{link.label}
										</a>
									);
								})}
							</div>
							<SheetFooter>
								<Button variant="outline">Sign In</Button>
								<Button>Get Started</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}

