import { forwardRef } from 'react'
import { FileText } from 'lucide-react'
import './style.css'

const Home = forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} id="home" className="home" role="region" aria-labelledby="home-heading" tabIndex={-1}>
    <div className="home-copy">
      <div className="home-identity">
        <p className="section-eyebrow">Research & engineering</p>
        <h1 id="home-heading">James Condos<span>.</span></h1>
        <p className="home-focus">Machine learning, electrical engineering & autonomous systems.</p>
      </div>
      <p className="home-intro">
        I explore machine learning and efficient computing through research and writing,
        alongside projects in autonomous robotics.
      </p>
      <div className="home-actions">
        <a className="action-link" href="#papers">Read my research</a>
        <a
          className="text-link home-resume"
          href={`${import.meta.env.BASE_URL}James_Condos_Resume_July_2026_Updated.pdf`}
          target="_blank"
          rel="noreferrer"
          aria-label="Read my resume (PDF, opens in a new tab)"
        >
          <FileText size={17} strokeWidth={1.5} aria-hidden="true" />
          Resume
        </a>
      </div>
    </div>
    <img
      className="home-portrait"
      src={`${import.meta.env.BASE_URL}me.jpg`}
      width="1536"
      height="2048"
      alt="James Condos at his graduation"
      fetchPriority="high"
    />
  </div>
))

Home.displayName = 'Home'

export { Home }
