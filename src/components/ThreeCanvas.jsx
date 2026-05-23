import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene with premium minimalist white background color
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020817, 0.01)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 40

    // WebGL Renderer with alpha and high antialiasing
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Soft biological/spraying mist particles
    const particleCount = 150
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // High quality soft bio-droplet particle texture
    const createDropletTexture = () => {
      const size = 64
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      
      const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
      // Soft premium royal blue and cyan tones representing modern agritech and moisture
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0.6)')
      gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.3)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)
      
      return new THREE.CanvasTexture(canvas)
    }

    const material = new THREE.PointsMaterial({
      size: 2.0,
      map: createDropletTexture(),
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Mouse Interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let scrollY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) / 150
      mouseY = (e.clientY - height / 2) / 150
    }

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    const clock = new THREE.Clock()

    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Natural floating waving behavior (like pollen or crop spray)
      const posArray = geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsedTime * 0.3 + i) * 0.01
        posArray[i * 3] += Math.cos(elapsedTime * 0.2 + i) * 0.005
      }
      geometry.attributes.position.needsUpdate = true

      // Camera reacting gently to mouse & scroll
      camera.position.y = -scrollY * 0.008
      camera.position.x = targetX * 0.3
      
      particleSystem.rotation.y = elapsedTime * 0.015

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-transparent" 
    />
  )
}
