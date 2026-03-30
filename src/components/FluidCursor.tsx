import { useEffect } from 'react'
import useFluidCursor from './Fluid'
import './FluidCursor.css'

export default function FluidCursor() {
  useEffect(() => {
    useFluidCursor()
  }, [])

  return <canvas id="fluid" className="fluid-canvas" />
}
