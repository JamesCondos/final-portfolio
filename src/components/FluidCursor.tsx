import { useEffect, useState } from 'react'
import './FluidCursor.css'

type IdleCapableWindow = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number
  cancelIdleCallback?: (handle: number) => void
}

let fluidModulePromise: Promise<typeof import('./Fluid')> | undefined

const loadFluidModule = () => {
  fluidModulePromise ??= import('./Fluid')
  return fluidModulePromise
}

const shouldUseFluidCursor = () => {
  if (typeof window === 'undefined') return false

  return !(
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function FluidCursor() {
  const [isEnabled] = useState(shouldUseFluidCursor)
  const [shouldMountCanvas, setShouldMountCanvas] = useState(false)

  useEffect(() => {
    if (!isEnabled) return

    const idleWindow = window as IdleCapableWindow
    let idleCallbackId: number | undefined

    const handleFirstPointerMove = () => {
      setShouldMountCanvas(true)
    }

    const prepareCursor = () => {
      void loadFluidModule()
      window.addEventListener('pointermove', handleFirstPointerMove, {
        once: true,
        passive: true,
      })
    }

    const timeoutId = window.setTimeout(() => {
      if (idleWindow.requestIdleCallback) {
        idleCallbackId = idleWindow.requestIdleCallback(prepareCursor, {
          timeout: 1000,
        })
      } else {
        prepareCursor()
      }
    }, 1400)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('pointermove', handleFirstPointerMove)

      if (idleCallbackId !== undefined) {
        idleWindow.cancelIdleCallback?.(idleCallbackId)
      }
    }
  }, [isEnabled])

  useEffect(() => {
    if (!shouldMountCanvas) return

    let isCancelled = false
    let disposeFluidCursor: (() => void) | undefined

    const animationFrameId = window.requestAnimationFrame(() => {
      void loadFluidModule().then(({ default: startFluidCursor }) => {
        if (isCancelled) return
        disposeFluidCursor = startFluidCursor()
      })
    })

    return () => {
      isCancelled = true
      window.cancelAnimationFrame(animationFrameId)
      disposeFluidCursor?.()
    }
  }, [shouldMountCanvas])

  if (!isEnabled || !shouldMountCanvas) return null

  return <canvas id="fluid" className="fluid-canvas" aria-hidden="true" />
}
