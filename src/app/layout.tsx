import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import Navbar from "./Navbar";
import "./globals.css";

const rajdhani = Rajdhani({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-rajdhani",
});

const orbitron = Orbitron({
	weight: ["500", "700"],
	subsets: ["latin"],
	variable: "--font-orbitron",
});

export const metadata: Metadata = {
	title: "European Culture",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${rajdhani.variable} ${orbitron.variable}`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
