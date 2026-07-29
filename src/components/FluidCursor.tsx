import { useEffect, useState } from 'react'
import useFluidCursor from './Fluid'
import './FluidCursor.css'

const shouldUseFluidCursor = () => {
  if (typeof window === 'undefined') return false

  return !(
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

export default function FluidCursor() {
  const [isEnabled] = useState(shouldUseFluidCursor)
  const [shouldMountCanvas, setShouldMountCanvas] = useState(false)

  useEffect(() => {
    if (!isEnabled) return

    const timeoutId = window.setTimeout(() => {
      setShouldMountCanvas(true)
    }, 900)

    return () => window.clearTimeout(timeoutId)
  }, [isEnabled])

  useEffect(() => {
    if (!shouldMountCanvas) return

    useFluidCursor()
  }, [shouldMountCanvas])

  if (!isEnabled || !shouldMountCanvas) return null

  return <canvas id="fluid" className="fluid-canvas" />
}
