import { useState } from 'react'
import { navbarData } from '../../../library'
import './style.css'

type NavProps = {
  scrollToSection: (elementRef: React.RefObject<HTMLDivElement>) => void
  homeRef: React.RefObject<HTMLDivElement>
  aboutRef: React.RefObject<HTMLDivElement>
  projectsRef: React.RefObject<HTMLDivElement>
  contactRef: React.RefObject<HTMLDivElement>
}

export function Navbar({
  scrollToSection,
  homeRef,
  aboutRef,
  projectsRef,
  contactRef,
}: NavProps) {
  const [activeLink, setActiveLink] = useState<number>()

  const navItems = navbarData.navigator.filter((item) => item.name !== 'Works')

  // Handle navigation link clicks to scroll to sections
  const handleLinkClick = (index: number) => {
    setActiveLink(index)
    switch (index) {
      case 0:
        scrollToSection(homeRef)
        break
      case 1:
        scrollToSection(aboutRef)
        break
      case 2:
        scrollToSection(projectsRef)
        break
      case 3:
        scrollToSection(contactRef)
        break
      default:
        break
    }
  }

  return (
    <div className="nav">
      <div className="nav-links-filled">
        {navItems.map((nav, index) => (
          <span
            key={index}
            onClick={() => handleLinkClick(index)}
            className={`nav-links-item ${activeLink === index ? 'active' : ''}`}
          >
            {nav.name}
          </span>
        ))}

        <div
          className={`nav-slider ${
            activeLink === 0
              ? 'Home'
              : activeLink === 1
              ? 'About'
              : activeLink === 2
              ? 'Projects'
              : activeLink === 3 && 'Contact'
          }`}
        />
      </div>
    </div>
  )
}
