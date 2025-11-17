"use client"

import { useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface WaterSurfaceProps {
  className?: string
  intensity?: number
  dropletInterval?: number
}

export function WaterSurface({
  className,
  intensity = 0.3,
  dropletInterval = 2000,
}: WaterSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const waterHeightRef = useRef<number[][]>([])
  const waterVelocityRef = useRef<number[][]>([])
  const lastDropletTimeRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Water simulation parameters
  const DAMPING = 0.98
  const SPREAD = 0.25
  const RESOLUTION = 0.5 // Lower = higher resolution (more pixels)

  const initWaterArrays = useCallback((width: number, height: number) => {
    const cols = Math.floor(width * RESOLUTION)
    const rows = Math.floor(height * RESOLUTION)

    waterHeightRef.current = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0))

    waterVelocityRef.current = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0))
  }, [])

  const addDroplet = useCallback((x: number, y: number, radius: number, strength: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const cols = waterHeightRef.current[0]?.length || 0
    const rows = waterHeightRef.current.length || 0
    const cellWidth = canvas.width / cols
    const cellHeight = canvas.height / rows

    const col = Math.floor(x / cellWidth)
    const row = Math.floor(y / cellHeight)

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dx = c - col
        const dy = r - row
        const distance = Math.sqrt(dx * dx + dy * dy)
        const effect = Math.max(0, radius - distance)

        if (effect > 0 && r < rows && c < cols) {
          waterHeightRef.current[r][c] += effect * strength
        }
      }
    }
  }, [])

  const updateWater = useCallback(() => {
    const rows = waterHeightRef.current.length
    const cols = waterHeightRef.current[0]?.length || 0

    if (rows === 0 || cols === 0) return

    // Create new arrays for next frame
    const newHeight = waterHeightRef.current.map((row) => [...row])
    const newVelocity = waterVelocityRef.current.map((row) => [...row])

    // Update water physics
    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        const neighbors =
          waterHeightRef.current[r - 1][c] +
          waterHeightRef.current[r + 1][c] +
          waterHeightRef.current[r][c - 1] +
          waterHeightRef.current[r][c + 1]

        const average = neighbors / 4
        const diff = average - waterHeightRef.current[r][c]

        waterVelocityRef.current[r][c] += diff * SPREAD
        waterVelocityRef.current[r][c] *= DAMPING

        newHeight[r][c] = waterHeightRef.current[r][c] + waterVelocityRef.current[r][c]
        newVelocity[r][c] = waterVelocityRef.current[r][c]
      }
    }

    waterHeightRef.current = newHeight
    waterVelocityRef.current = newVelocity
  }, [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const rows = waterHeightRef.current.length
    const cols = waterHeightRef.current[0]?.length || 0

    if (rows === 0 || cols === 0) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw water surface using image data for better performance
    const cellWidth = width / cols
    const cellHeight = height / rows

    // Create gradient for water color (brand blue with transparency)
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, `rgba(0, 153, 213, ${intensity * 0.25})`) // #0099D5 with low opacity
    gradient.addColorStop(0.5, `rgba(0, 153, 213, ${intensity * 0.15})`)
    gradient.addColorStop(1, `rgba(0, 153, 213, ${intensity * 0.08})`)

    // Draw water surface with wave distortion
    ctx.fillStyle = gradient
    ctx.beginPath()

    // Draw top wave line
    for (let c = 0; c < cols; c++) {
      const x = c * cellWidth
      let waveHeight = 0

      // Average height for smoother waves
      if (rows > 0) {
        const centerRow = Math.floor(rows / 3)
        waveHeight = waterHeightRef.current[centerRow]?.[c] || 0
      }

      const y = height * 0.3 + waveHeight * 8

      if (c === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    // Complete the path
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()

    // Draw subtle ripple effects for active ripples only
    ctx.strokeStyle = `rgba(0, 153, 213, ${intensity * 0.15})`
    ctx.lineWidth = 0.5

    // Only draw ripples for significant height changes (performance optimization)
    for (let r = 2; r < rows - 2; r += 2) {
      for (let c = 2; c < cols - 2; c += 2) {
        const height = waterHeightRef.current[r]?.[c] || 0
        if (Math.abs(height) > 0.02) {
          const x = c * cellWidth
          const y = r * cellHeight
          const radius = Math.abs(height) * 12

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }
  }, [intensity])

  const animate = useCallback(() => {
    updateWater()
    render()

    // Add random droplets
    const now = Date.now()
    if (now - lastDropletTimeRef.current > dropletInterval) {
      const canvas = canvasRef.current
      if (canvas) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = 20 + Math.random() * 30
        const strength = 0.3 + Math.random() * 0.4

        addDroplet(x, y, radius, strength)
        lastDropletTimeRef.current = now
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updateWater, render, addDroplet, dropletInterval])

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    initWaterArrays(rect.width, rect.height)

    // Add initial droplets for visual interest
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height
        const radius = 30 + Math.random() * 40
        addDroplet(x, y, radius, 0.5)
      }, i * 500)
    }
  }, [initWaterArrays, addDroplet])

  useEffect(() => {
    setupCanvas()

    const handleResize = () => {
      setupCanvas()
    }

    window.addEventListener("resize", handleResize)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [setupCanvas, animate])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "auto" }}
      />
    </div>
  )
}

