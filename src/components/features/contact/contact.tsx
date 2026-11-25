import { forwardRef } from 'react'
import { socialLinks } from '../../../library'
import './style.css'

const Contact = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} id="contact" className="contact" role="region" aria-labelledby="contact-heading" tabIndex={-1}>
      <div className="contact-grid">
        <header className="section-heading contact-heading">
          <p className="section-eyebrow">Contact</p>
          <h2 id="contact-heading">Have something interesting in mind?</h2>
          <p className="section-intro">
            Get in touch. I’m always happy to talk about a project, a research question, or something you’re building.
          </p>
        </header>

        <div className="contact-details">
          <div className="contact-email-group">
            <p className="contact-label">Say hello</p>
            <a className="contact-email" href="mailto:Jamesacondos@gmail.com">
              Jamesacondos@<wbr />gmail.com
            </a>
          </div>

          <div className="contact-elsewhere">
            <p className="contact-label">Elsewhere</p>
            <ul className="contact-social-links" aria-label="Social profiles">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    className="text-link"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${link.name} (opens in a new tab)`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            className="action-link contact-resume"
            href={`${import.meta.env.BASE_URL}James_Condos_Nov_Resume_2026.pdf`}
            download
          >
            Download résumé <span>PDF</span>
          </a>
        </div>
      </div>
    </div>
  )
})

Contact.displayName = 'Contact'

export { Contact }
