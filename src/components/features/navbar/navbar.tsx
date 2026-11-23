import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { RefObject } from 'react'
import { navbarData } from '../../../library'
import './style.css'

type NavProps = {
  homeRef: RefObject<HTMLDivElement>
  aboutRef: RefObject<HTMLDivElement>
  projectsRef: RefObject<HTMLDivElement>
  papersRef: RefObject<HTMLDivElement>
  contactRef: RefObject<HTMLDivElement>
}

export function Navbar({
  homeRef,
  aboutRef,
  projectsRef,
  papersRef,
  contactRef,
}: NavProps) {
  const [activeLink, setActiveLink] = useState(0)
  const navRef = useRef<HTMLElement>(null)
  const requestedAnchor = useRef('')

  const navItems = useMemo(
    () => navbarData.navigator.filter((item) => item.name !== 'Works'),
    [],
  )

  const sectionRefs = useMemo(
    () => [homeRef, aboutRef, papersRef, projectsRef, contactRef],
    [aboutRef, contactRef, homeRef, papersRef, projectsRef],
  )

  useLayoutEffect(() => {
    const navigation = navRef.current
    if (!navigation) return

    const updateClearance = () => {
      const top = Number.parseFloat(window.getComputedStyle(navigation).top) || 0
      const clearance = Math.ceil(top + navigation.getBoundingClientRect().height + 24)
      document.documentElement.style.setProperty('--nav-clearance', `${clearance}px`)
    }

    updateClearance()
    const resizeObserver = new ResizeObserver(updateClearance)
    resizeObserver.observe(navigation)
    window.addEventListener('resize', updateClearance)
    window.addEventListener('orientationchange', updateClearance)
    document.fonts.addEventListener('loadingdone', updateClearance)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateClearance)
      window.removeEventListener('orientationchange', updateClearance)
      document.fonts.removeEventListener('loadingdone', updateClearance)
      document.documentElement.style.removeProperty('--nav-clearance')
    }
  }, [])

  useEffect(() => {
    let frameId: number | null = null
    let wasAtPageBottom = false

    const syncActiveLink = () => {
      frameId = null

      if (document.body.classList.contains('project-modal-open')) {
        return
      }

      const navBottom = Math.max(0, navRef.current?.getBoundingClientRect().bottom ?? 0)
      const marker = navBottom + Math.min(window.innerHeight * 0.25, 160)
      const documentHeight = document.documentElement.scrollHeight
      const viewportBottom = window.scrollY + window.innerHeight
      const isAtPageBottom = viewportBottom >= documentHeight - 2
      let nextActiveLink = 0

      if (isAtPageBottom) {
        // Short final sections can share the same scroll destination.
        const requestedIndex = sectionRefs.findIndex(({ current }) => {
          if (!current || requestedAnchor.current !== `#${current.id}`) return false
          const top = current.getBoundingClientRect().top
          return top >= navBottom && top < window.innerHeight
        })
        nextActiveLink = requestedIndex >= 0 ? requestedIndex : sectionRefs.length - 1
      } else {
        if (wasAtPageBottom) requestedAnchor.current = ''
        sectionRefs.forEach((sectionRef, index) => {
          const section = sectionRef.current

          if (section && section.getBoundingClientRect().top <= marker) {
            nextActiveLink = index
          }
        })
      }
      wasAtPageBottom = isAtPageBottom

      setActiveLink((currentLink) =>
        currentLink === nextActiveLink ? currentLink : nextActiveLink,
      )
    }

    const requestSync = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(syncActiveLink)
    }

    const syncAnchor = () => {
      requestedAnchor.current = window.location.hash
      requestSync()
    }

    syncAnchor()

    const resizeObserver = new ResizeObserver(requestSync)
    const main = document.querySelector('main')
    if (main) resizeObserver.observe(main)
    if (navRef.current) resizeObserver.observe(navRef.current)

    window.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('hashchange', syncAnchor)
    window.addEventListener('resize', requestSync)
    window.addEventListener('orientationchange', requestSync)

    return () => {
      resizeObserver.disconnect()
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', requestSync)
      window.removeEventListener('hashchange', syncAnchor)
      window.removeEventListener('resize', requestSync)
      window.removeEventListener('orientationchange', requestSync)
    }
  }, [sectionRefs])

  return (
    <nav ref={navRef} className="nav" aria-label="Main navigation">
      <div className="nav-links-filled">
        {navItems.map((nav, index) => (
          <a
            key={nav.name}
            href={nav.href}
            aria-current={activeLink === index ? 'location' : undefined}
            onClick={(event) => {
              if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                requestedAnchor.current = nav.href
                setActiveLink(index)
              }
            }}
            className={`nav-links-item ${activeLink === index ? 'active' : ''}`}
          >
            {nav.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
