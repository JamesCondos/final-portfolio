import { forwardRef } from 'react'
import { Headings } from '../../core/headings/headings'
import './style.css'

const About = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="about-section">
      <div className="about-signal" aria-label="Professional focus">
        <p className="about-signal-kicker">
          From first principles to working systems.
        </p>
        <p className="about-signal-text">
          Machine learning, embedded systems and hardware engineering.
        </p>
      </div>

      <Headings title="About" subtitle="Hi, I'm James." />

      <p className="about-text">
        Hello! My name is James Condos, I graduated from my BSc in Mathematical Physics and my Diploma in Computer Science in 2022, and I am currently studying a MSc in Electrical Engineering from the University of Melbourne, graduating at the end of 2026.
        <br />
        <br />
        My passion in STEM comes from my interests in Machine Learning, AI, Autonomous Systems, Computer Science, Physics and Embedded Systems specifically. These fundamental ideas are pushing the envelope of human nature, and what is inherently contributing to a better tomorrow.
        <br />
        <br />
        My experience and project work have been spread out across multiple disciplines, and I am actively trying to get more involved in interesting engineering and research projects, whilst also gaining more experience in industry.
        <br />
        <br />
        <a
          href="/final-portfolio/James_Condos_Resume_July_2026_Updated.pdf"
          download
          className="button about-resume-button"
          style={{ borderColor: 'var(--color-green)', color: 'var(--color-green)' }}
        >
          Download my Resume!
        </a>
      </p>
    </div>
  )
})

About.displayName = 'About'

export { About }
