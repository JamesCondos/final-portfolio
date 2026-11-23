import { forwardRef } from 'react'
import { FileText, Maximize2, Plus } from 'lucide-react'
import { Github } from '../../../library/icons'
import { additionalProjects, featuredProjects, type FeaturedProject } from '../../../library/projects'
import './style.css'

type ProjectImageData = {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
  fit?: 'cover' | 'contain'
  aspectRatio?: '16 / 9' | '4 / 3' | 'auto'
}

function ProjectImage({ image, loading = 'lazy' }: {
  image: ProjectImageData
  loading?: 'eager' | 'lazy'
}) {
  const imageUrl = `${import.meta.env.BASE_URL}${image.src}`
  const aspectRatio = image.aspectRatio === 'auto' && image.width && image.height
    ? `auto ${image.width} / ${image.height}`
    : image.aspectRatio

  return (
    <figure className="project-media project-media--image">
      <a
        className="project-image-link"
        href={imageUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size image: ${image.alt} (opens in a new tab)`}
      >
        <img
          src={imageUrl}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={loading}
          decoding="async"
          style={{ aspectRatio, objectFit: image.fit, height: 'auto' }}
        />
        <span className="project-image-open" aria-hidden="true">
          <span>View full size</span>
          <Maximize2 size={14} />
        </span>
      </a>
      <figcaption>{image.caption}</figcaption>
    </figure>
  )
}

function ProjectMedia({ project }: { project: FeaturedProject }) {
  return project.media ? <ProjectImage image={project.media} loading="eager" /> : null
}

const Projects = forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} id="projects" className="projects" role="region" aria-labelledby="projects-heading" tabIndex={-1}>
    <header className="section-heading">
      <p className="section-eyebrow">Robotics</p>
      <h2 id="projects-heading">From software to the physical world.</h2>
      <p className="section-intro">An autonomous plant-monitoring robot, and the interface I built to understand what it was doing.</p>
    </header>

    <div className="projects-selected">
      {featuredProjects.map((project) => (
        <article
          className={`project-feature${project.media ? '' : ' project-feature--text'}`}
          key={project.id}
          aria-labelledby={`${project.id}-title`}
        >
          <ProjectMedia project={project} />
          <div className="project-feature-content">
            <div className="project-heading">
              <div className="project-meta">
                <p className="project-category">{project.category}</p>
                {project.year && <time className="project-year" dateTime={String(project.year)}>{project.year}</time>}
              </div>
              <h3 id={`${project.id}-title`}>{project.title}</h3>
            </div>
            <p className="project-summary">{project.summary}</p>
            <ul className="project-technologies" aria-label="Technologies">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>

            {(project.report || project.repository) && (
              <div className="project-resources">
                {project.report && (
                  <a
                    className="text-link project-resource"
                    href={`${import.meta.env.BASE_URL}${project.report.href}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.report.label}: ${project.title} (PDF, opens in a new tab)`}
                  >
                    <FileText size={16} strokeWidth={1.5} aria-hidden="true" />
                    {project.report.label}
                  </a>
                )}
                {project.repository && (
                  <a
                    className="text-link project-resource"
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View repository for ${project.title} (opens in a new tab)`}
                  >
                    <Github size={16} aria-hidden="true" />
                    View repository
                  </a>
                )}
              </div>
            )}

            <details className="project-disclosure">
              <summary>
                <span>Project details<span className="project-sr-only">: {project.title}</span></span>
                <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <div className="project-detail-content">
                <div>
                  <h4>{project.contributionLabel ?? 'My contribution'}</h4>
                  <p>{project.contribution}</p>
                </div>
                <div>
                  <h4>{project.outcomeLabel}</h4>
                  <p>{project.outcome}</p>
                </div>
                {project.gallery && project.gallery.length > 0 && (
                  <div className="project-gallery-section">
                    <h4>From the project</h4>
                    <div className="project-gallery">
                      {project.gallery.map((image) => <ProjectImage key={image.src} image={image} />)}
                    </div>
                  </div>
                )}
              </div>
            </details>
          </div>
        </article>
      ))}
    </div>

    {additionalProjects.length > 0 && (
      <details className="projects-more">
        <summary>
          <span>Other engineering work <span className="projects-more-count">{additionalProjects.length}</span></span>
          <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
        </summary>
        <div className="projects-more-list">
          {additionalProjects.map((project) => (
            <article className="project-additional" key={project.id}>
              <p className="project-category">{project.technologies}</p>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary}</p>
              {project.repository && (
                <a
                  className="text-link project-resource"
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View repository for ${project.title} (opens in a new tab)`}
                >
                  <Github size={16} aria-hidden="true" />
                  View repository
                </a>
              )}
            </article>
          ))}
        </div>
      </details>
    )}
  </div>
))

Projects.displayName = 'Projects'

export { Projects }
