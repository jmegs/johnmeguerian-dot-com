"use client"

import { useEffect, useRef } from "react"

export function GlitchAvatar({
	src,
	alt,
	size = 64,
	delay = 0,
	duration = 900,
	className,
}: {
	src: string
	alt: string
	size?: number
	delay?: number
	duration?: number
	className?: string
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const img = new window.Image()
		img.src = src
		img.crossOrigin = "anonymous"

		let animFrame: number
		let timeout: ReturnType<typeof setTimeout>

		img.onload = () => {
			const MAX_BLOCK = 16 // starting block size (most pixelated)
			const MIN_BLOCK = 1  // ending block size — stays pixelated, no smooth snap
			const startTime = { value: 0 }

			function drawPixelated(blockSize: number) {
				if (!ctx || !canvas) return
				ctx.clearRect(0, 0, size, size)

				// Draw image at reduced resolution then scale up (pixelate)
				const offscreen = document.createElement("canvas")
				const cols = Math.ceil(size / blockSize)
				const rows = Math.ceil(size / blockSize)
				offscreen.width = cols
				offscreen.height = rows
				const offCtx = offscreen.getContext("2d")
				if (!offCtx) return
				offCtx.drawImage(img, 0, 0, cols, rows)

				ctx.imageSmoothingEnabled = false
				ctx.drawImage(offscreen, 0, 0, size, size)
			}

			function animate(timestamp: number) {
				if (!startTime.value) startTime.value = timestamp
				const elapsed = timestamp - startTime.value
				const progress = Math.min(elapsed / duration, 1)

				// Ease out: fast initial resolve, slows at end
				const eased = 1 - Math.pow(1 - progress, 2.5)

				// Block size goes from MAX_BLOCK down to MIN_BLOCK
				const blockSize = Math.max(
					MIN_BLOCK,
					Math.round(MAX_BLOCK * (1 - eased))
				)

				// Occasionally skip a frame for a glitchy stutter effect
				const shouldGlitch =
					progress < 0.85 && Math.random() < 0.08
				if (!shouldGlitch) {
					drawPixelated(blockSize)
				}

				if (progress < 1) {
					animFrame = requestAnimationFrame(animate)
				}
			}

			// Start fully pixelated immediately (before delay)
			drawPixelated(MAX_BLOCK)

			timeout = setTimeout(() => {
				animFrame = requestAnimationFrame(animate)
			}, delay)
		}

		return () => {
			clearTimeout(timeout)
			cancelAnimationFrame(animFrame)
		}
	}, [src, size, delay, duration])

	return (
		<canvas
			ref={canvasRef}
			width={size}
			height={size}
			aria-label={alt}
			role="img"
			className={className}
			style={{ imageRendering: "pixelated" }}
		/>
	)
}
