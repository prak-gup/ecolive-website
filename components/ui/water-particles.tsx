"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseX: number
  baseY: number
}

interface WaterParticlesProps {
  className?: string
  intensity?: number
  particleCount?: number
  interactive?: boolean
}

export function WaterParticles({
  className,
  intensity = 0.4,
  particleCount = 50,
  interactive = true,
}: WaterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, isActive: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Only initialize if container has valid dimensions
    if (width === 0 || height === 0) return

    particlesRef.current = Array.from({ length: particleCount }, () => {
      const size = 2 + Math.random() * 3
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size,
        opacity: 0.5 + Math.random() * 0.5,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
      }
    })
  }, [particleCount])

  const updateParticles = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouse = mouseRef.current

    // Don't update if container has no dimensions
    if (width === 0 || height === 0) return

    particlesRef.current.forEach((particle) => {
      // Base floating motion
      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary wrapping
      if (particle.x < 0) particle.x = width
      if (particle.x > width) particle.x = 0
      if (particle.y < 0) particle.y = height
      if (particle.y > height) particle.y = 0

      // Interactive cursor effect
      if (interactive && mouse.isActive) {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)

          // Push particles away from cursor
          particle.vx += Math.cos(angle) * force * 0.1
          particle.vy += Math.sin(angle) * force * 0.1

          // Increase opacity near cursor
          particle.opacity = Math.min(1, particle.opacity + force * 0.1)
        }
      }

      // Damping
      particle.vx *= 0.98
      particle.vy *= 0.98

      // Return to base position gradually
      const returnForce = 0.02
      particle.vx += (particle.baseX - particle.x) * returnForce
      particle.vy += (particle.baseY - particle.y) * returnForce

      // Fade opacity back to base
      particle.opacity *= 0.95
      particle.opacity = Math.max(0.3, particle.opacity)
    })
  }, [interactive])

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Don't draw if container has no dimensions
    if (width === 0 || height === 0) return

    // Clear canvas completely
    ctx.clearRect(0, 0, width, height)

    const particles = particlesRef.current

    // Don't draw if no particles initialized
    if (particles.length === 0) return

    // Draw connections between nearby particles
    ctx.lineWidth = 1

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const opacity = (1 - distance / 100) * intensity * 0.4
          ctx.strokeStyle = `rgba(0, 153, 213, ${opacity})`
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Draw particles
    particles.forEach((particle) => {
      // Create gradient for each particle
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2
      )
      gradient.addColorStop(0, `rgba(0, 153, 213, ${particle.opacity * intensity})`)
      gradient.addColorStop(0.5, `rgba(0, 153, 213, ${particle.opacity * intensity * 0.5})`)
      gradient.addColorStop(1, `rgba(0, 153, 213, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw center dot
      ctx.fillStyle = `rgba(0, 153, 213, ${particle.opacity * intensity * 0.8})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw wave effect from cursor
    if (interactive && mouseRef.current.isActive) {
      const mouse = mouseRef.current
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80)
      gradient.addColorStop(0, `rgba(0, 153, 213, ${intensity * 0.3})`)
      gradient.addColorStop(0.5, `rgba(0, 153, 213, ${intensity * 0.1})`)
      gradient.addColorStop(1, `rgba(0, 153, 213, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [intensity, interactive])

  const animate = useCallback(() => {
    updateParticles()
    drawParticles()
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updateParticles, drawParticles])

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    
    // Ensure container has dimensions
    if (rect.width === 0 || rect.height === 0) {
      // Retry after a short delay
      setTimeout(() => setupCanvas(), 100)
      return
    }

    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    // Initialize particles after canvas is properly sized
    initParticles()
  }, [initParticles])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isActive = false
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const container = containerRef.current
    if (!container || !e.touches[0]) return

    const rect = container.getBoundingClientRect()
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      isActive: true,
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    mouseRef.current.isActive = false
  }, [])

  useEffect(() => {
    setIsMounted(true)
    setupCanvas()

    const container = containerRef.current
    if (!container) return

    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
      container.addEventListener("touchmove", handleTouchMove)
      container.addEventListener("touchend", handleTouchEnd)
    }

    const handleResize = () => {
      setupCanvas()
    }

    window.addEventListener("resize", handleResize)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [setupCanvas, animate, interactive, handleMouseMove, handleMouseLeave, handleTouchMove, handleTouchEnd])

  if (!isMounted) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "auto" }}
      />
    </div>
  )
}

