import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { CSSProperties, RefObject } from 'react'
import { navbarData } from '../../../library'
import './style.css'

type NavProps = {
  scrollToSection: (elementRef: RefObject<HTMLDivElement>) => void
  homeRef: RefObject<HTMLDivElement>
  aboutRef: RefObject<HTMLDivElement>
  projectsRef: RefObject<HTMLDivElement>
  contactRef: RefObject<HTMLDivElement>
}

export function Navbar({
  scrollToSection,
  homeRef,
  aboutRef,
  projectsRef,
  contactRef,
}: NavProps) {
  const [activeLink, setActiveLink] = useState(0)
  const [sliderStyle, setSliderStyle] = useState<CSSProperties>({ opacity: 0 })
  const itemRefs = useRef<Array<HTMLSpanElement | null>>([])

  const navItems = useMemo(
    () => navbarData.navigator.filter((item) => item.name !== 'Works'),
    [],
  )

  const sectionRefs = useMemo(
    () => [homeRef, aboutRef, projectsRef, contactRef],
    [aboutRef, contactRef, homeRef, projectsRef],
  )

  const updateSlider = useCallback(() => {
    const activeItem = itemRefs.current[activeLink]
    const navList = activeItem?.parentElement

    if (!activeItem || !navList) {
      setSliderStyle({ opacity: 0 })
      return
    }

    const itemRect = activeItem.getBoundingClientRect()
    const listRect = navList.getBoundingClientRect()

    setSliderStyle({
      left: `${itemRect.left - listRect.left}px`,
      width: `${itemRect.width}px`,
      opacity: 1,
    })
  }, [activeLink])

  useLayoutEffect(() => {
    updateSlider()
  }, [updateSlider])

  useEffect(() => {
    updateSlider()

    const resizeObserver = new ResizeObserver(updateSlider)
    const navList = itemRefs.current[activeLink]?.parentElement

    if (navList) {
      resizeObserver.observe(navList)
    }

    itemRefs.current.forEach((item) => {
      if (item) {
        resizeObserver.observe(item)
      }
    })

    window.addEventListener('resize', updateSlider)
    window.addEventListener('orientationchange', updateSlider)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateSlider)
      window.removeEventListener('orientationchange', updateSlider)
    }
  }, [activeLink, updateSlider])

  useEffect(() => {
    let frameId: number | null = null

    const syncActiveLink = () => {
      frameId = null

      const navHeight =
        document.querySelector<HTMLElement>('.nav')?.getBoundingClientRect().height ?? 0
      const marker = navHeight + Math.min(window.innerHeight * 0.25, 160)
      const documentHeight = document.documentElement.scrollHeight
      const viewportBottom = window.scrollY + window.innerHeight
      const isAtPageBottom = viewportBottom >= documentHeight - 80
      let nextActiveLink = 0

      if (isAtPageBottom) {
        nextActiveLink = sectionRefs.length - 1
      } else {
        sectionRefs.forEach((sectionRef, index) => {
          const section = sectionRef.current

          if (section && section.getBoundingClientRect().top <= marker) {
            nextActiveLink = index
          }
        })
      }

      setActiveLink((currentLink) =>
        currentLink === nextActiveLink ? currentLink : nextActiveLink,
      )
    }

    const requestSync = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(syncActiveLink)
    }

    requestSync()

    window.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('resize', requestSync)
    window.addEventListener('orientationchange', requestSync)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', requestSync)
      window.removeEventListener('resize', requestSync)
      window.removeEventListener('orientationchange', requestSync)
    }
  }, [sectionRefs])

  // Handle navigation link clicks to scroll to sections
  const handleLinkClick = (index: number) => {
    setActiveLink(index)

    const targetRef = sectionRefs[index]

    if (targetRef) {
      scrollToSection(targetRef)
    }
  }

  return (
    <div className="nav">
      <div className="nav-links-filled">
        {navItems.map((nav, index) => (
          <span
            key={nav.name}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            onClick={() => handleLinkClick(index)}
            className={`nav-links-item ${activeLink === index ? 'active' : ''}`}
          >
            {nav.name}
          </span>
        ))}

        <div className="nav-slider" style={sliderStyle} />
      </div>
    </div>
  )
}
