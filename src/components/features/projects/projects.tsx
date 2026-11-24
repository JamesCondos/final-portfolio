import { forwardRef } from 'react'
import { Plus } from 'lucide-react'
import { Github } from '../../../library/icons'
import { engineeringProjects } from '../../../library/projects'
import './style.css'

const Projects = forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} id="projects" className="projects" role="region" aria-labelledby="projects-heading" tabIndex={-1}>
    <header className="section-heading">
      <p className="section-eyebrow">Projects</p>
      <h2 id="projects-heading">Other engineering work</h2>
    </header>

    <ul className="projects-list">
      {engineeringProjects.map(({ id, title, technologies, summary, repository, figure }) => (
        <li className="project-entry" key={id}>
          <p className="project-category">{technologies}</p>
          <h3 id={`${id}-title`}>{title}</h3>
          <p className="project-summary">{summary}</p>
          {repository && (
            <a
              className="text-link project-resource"
              href={repository}
              target="_blank"
              rel="noreferrer"
              aria-label={`View repository for ${title} (opens in a new tab)`}
            >
              <Github size={16} aria-hidden="true" />
              View repository
            </a>
          )}
          {repository === null && (
            <button type="button" className="project-resource" disabled>
              <Github size={16} aria-hidden="true" />
              View repository (coming soon)
            </button>
          )}
          {figure && (
            <details className="project-disclosure">
              <summary>
                {figure.label}
                <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <figure className="project-media">
                <a
                  className="project-image-link"
                  href={`${import.meta.env.BASE_URL}${figure.src}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full-size image: ${figure.alt} (opens in a new tab)`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${figure.src}`}
                    alt={figure.alt}
                    width={figure.width}
                    height={figure.height}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <figcaption>{figure.caption}</figcaption>
              </figure>
            </details>
          )}
        </li>
      ))}
    </ul>
  </div>
))

Projects.displayName = 'Projects'
export { Projects }
