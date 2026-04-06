"use client"

import { useEffect, useRef } from "react"

const GLYPHS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'\",./<>?`~'

function randomGlyph() {
	return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

function scramble(text: string, revealedCount: number) {
	return text
		.split("")
		.map((char, i) => {
			if (i < revealedCount) return char
			if (char === "\n" || char === " ") return char
			return randomGlyph()
		})
		.join("")
}

export function BaffleText({
	text,
	delay = 0,
	speed = 50,
	scrambleSpeed = 30,
	className,
}: {
	text: string
	delay?: number
	speed?: number
	scrambleSpeed?: number
	className?: string
}) {
	const ref = useRef<HTMLSpanElement>(null)
	const revealedRef = useRef(0)

	useEffect(() => {
		const node = ref.current
		if (!node) return

		let revealInterval: ReturnType<typeof setInterval> | undefined

		const scrambleInterval = setInterval(() => {
			node.textContent = scramble(text, revealedRef.current)
		}, scrambleSpeed)

		const delayTimeout = setTimeout(() => {
			revealInterval = setInterval(() => {
				revealedRef.current++
				while (
					revealedRef.current < text.length &&
					(text[revealedRef.current] === " " ||
						text[revealedRef.current] === "\n")
				) {
					revealedRef.current++
				}
				if (revealedRef.current >= text.length) {
					node.textContent = text
					clearInterval(revealInterval)
					clearInterval(scrambleInterval)
				}
			}, speed)
		}, delay)

		return () => {
			clearTimeout(delayTimeout)
			clearInterval(scrambleInterval)
			if (revealInterval) clearInterval(revealInterval)
		}
	}, [text, delay, speed, scrambleSpeed])

	return (
		<span ref={ref} className={className} style={{ whiteSpace: "pre-line" }}>
			{text}
		</span>
	)
}
