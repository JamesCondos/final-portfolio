
import { useRef } from 'react'
import { Navbar } from './components/features/navbar/navbar'
import { About } from './components/features/about/about'
import { Projects } from './components/features/projects/projects'
import { Papers } from './components/features/papers/papers'
import { Contact } from './components/features/contact/contact'
import { Footer } from './components/features/footer/footer'
import { Home } from './components/features/home/home'


export default function App() {
  // Refs for scrolling to specific sections
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const papersRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar
        homeRef={homeRef}
        aboutRef={aboutRef}
        projectsRef={projectsRef}
        papersRef={papersRef}
        contactRef={contactRef}
      />
      <main id="main-content" tabIndex={-1}>
        <Home ref={homeRef} />
        <About ref={aboutRef} />
        <Papers ref={papersRef} />
        <Projects ref={projectsRef} />
        <Contact ref={contactRef} />
        <Footer />
      </main>
    </>
  )
}
