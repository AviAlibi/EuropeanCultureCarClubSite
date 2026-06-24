"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks: { label: string; href: string }[] = [
	{ label: "European Culture", href: "/" },
	{ label: "Events", href: "/events" },
	{ label: "Gallery", href: "/gallery" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

type NavLink = { label: string; href: string };

export default function Navbar({ links = navLinks }: { links?: NavLink[] }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 inset-x-0 w-full bg-[#0a0614]/82 border-b border-[#9f6bff]/45 shadow-[0_0_30px_rgba(159,107,255,0.35)] backdrop-blur-md z-50 overflow-visible">
			{/* Desktop nav */}
			<div className="hidden lg:flex items-center px-8 h-14 w-full">
				<Link
					key={links[0].href}
					href={links[0].href}
					className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#b690ff]/60 bg-[#1b1034]/75 shadow-[0_0_18px_rgba(159,107,255,0.45)] text-xl font-bold tracking-[0.05em] font-[family-name:var(--font-orbitron)] hover:bg-[#241549]/85 hover:border-[#d7c2ff]/70 transition-all"
					aria-label="Home - European Culture"
				>
					<span>{links[0].label}</span>
				</Link>
				<div className="flex items-center gap-8 ml-auto">
					{links.slice(1).map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-lg font-semibold uppercase tracking-[0.08em] font-[family-name:var(--font-orbitron)] hover:text-[#d7c2ff] transition-colors"
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>

			{/* Mobile nav */}
			<div className="flex lg:hidden items-center justify-between px-4 h-14 w-full">
				<Link
					href={links[0].href}
					className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#b690ff]/60 bg-[#1b1034]/70 shadow-[0_0_14px_rgba(159,107,255,0.4)] text-sm font-bold tracking-[0.05em] whitespace-nowrap font-[family-name:var(--font-orbitron)]"
					aria-label="Home - European Culture"
				>
					<span>{links[0].label}</span>
				</Link>
				<button
					aria-label="Toggle menu"
					onClick={() => setMenuOpen((prev) => !prev)}
					className="h-10 w-10 inline-flex items-center justify-center"
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile dropdown */}
			<div
				className={`lg:hidden absolute left-0 right-0 top-full flex flex-col bg-[#20163a]/92 backdrop-blur-sm shadow-[0_14px_26px_rgba(0,0,0,0.42)] transition-[max-height,opacity,transform] duration-300 ease-out overflow-hidden ${
					menuOpen
						? "max-h-96 opacity-100 translate-y-0 pointer-events-auto"
						: "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
				}`}
			>
				{links.slice(1).map((link) => (
					<Link
						key={link.href}
						href={link.href}
						onClick={() => setMenuOpen(false)}
						className="px-4 py-3 text-lg font-semibold uppercase tracking-[0.08em] font-[family-name:var(--font-orbitron)] hover:bg-[#9f6bff]/20 transition-colors"
					>
						{link.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
