import { forwardRef } from 'react'
import './style.css'

const About = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} id="about" className="about-section" role="region" aria-labelledby="about-heading" tabIndex={-1}>
      <header className="section-heading">
        <p className="section-eyebrow">About</p>
        <h2 id="about-heading">From first principles to working systems.</h2>
      </header>

      <div className="about-introduction">
        <p className="about-text">
          I’m an electrical engineering master’s student at the University of Melbourne,
          with a BSc in Mathematical Physics and a Diploma in Computer Science.
        </p>
        <p className="about-text">
          My interests span machine learning, AI, autonomous systems, computer science,
          physics and embedded systems. I enjoy working across these disciplines,
          understanding the ideas behind them and finding ways to put them into practice.
          My work has ranged from satellite attitude control and simulation research
          to quantum machine learning and teaching physics.
        </p>
        <p className="about-text">
          I’m keen to get involved in interesting engineering and research projects
          while continuing to build experience in industry. Outside of that work,
          I’m also a Lego enjoyer.
        </p>
      </div>
    </div>
  )
})

About.displayName = 'About'

export { About }
