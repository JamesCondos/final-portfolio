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

  useEffect(() => {
    if (!isEnabled) return

    useFluidCursor()
  }, [isEnabled])

  if (!isEnabled) return null

  return <canvas id="fluid" className="fluid-canvas" />
}
