import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Fathom from "./fathom"

const departureMono = localFont({
	src: "../public/DepartureMono-Regular.woff2",
	display: "swap",
	variable: "--font-departure-mono",
})

export const metadata: Metadata = {
	title: "John Meguerian",
	description: "Design manager based in New York City",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={`${departureMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<Fathom />
				{children}
			</body>
		</html>
	)
}
