import { forwardRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Github, projects } from '../../../library'
import { Headings } from '../../core/headings/headings'
import { ShineBorder } from '@/components/ui/shine-border'
import './style.css'

const shouldPreviewTouchClick = () => {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(max-width: 1024px), (hover: none), (pointer: coarse)').matches
}

const Projects = forwardRef<HTMLDivElement>((_props, ref) => {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null)
  const [touchPreviewProjectTitle, setTouchPreviewProjectTitle] = useState<string | null>(null)
  const touchPreviewTimerRef = useRef<number | null>(null)

  const clearTouchPreviewTimer = () => {
    if (touchPreviewTimerRef.current === null) return

    window.clearTimeout(touchPreviewTimerRef.current)
    touchPreviewTimerRef.current = null
  }

  useEffect(() => {
    return () => clearTouchPreviewTimer()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!activeProject) return

    const scrollY = window.scrollY
    const bodyStyle = document.body.style
    const htmlStyle = document.documentElement.style
    const previousBodyStyles = {
      left: bodyStyle.left,
      overflow: bodyStyle.overflow,
      position: bodyStyle.position,
      right: bodyStyle.right,
      top: bodyStyle.top,
      width: bodyStyle.width,
    }
    const previousHtmlOverflow = htmlStyle.overflow

    document.documentElement.classList.add('project-modal-open')
    document.body.classList.add('project-modal-open')
    htmlStyle.overflow = 'hidden'
    bodyStyle.overflow = 'hidden'
    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.left = '0'
    bodyStyle.right = '0'
    bodyStyle.width = '100%'

    return () => {
      htmlStyle.overflow = previousHtmlOverflow
      bodyStyle.overflow = previousBodyStyles.overflow
      bodyStyle.position = previousBodyStyles.position
      bodyStyle.top = previousBodyStyles.top
      bodyStyle.left = previousBodyStyles.left
      bodyStyle.right = previousBodyStyles.right
      bodyStyle.width = previousBodyStyles.width
      document.documentElement.classList.remove('project-modal-open')
      document.body.classList.remove('project-modal-open')
      window.scrollTo(0, scrollY)
    }
  }, [activeProject])

  const openProjectModal = (project: (typeof projects)[number]) => {
    setActiveProject(project)
  }

  const closeProjectModal = () => {
    clearTouchPreviewTimer()
    setTouchPreviewProjectTitle(null)
    setActiveProject(null)
  }

  const handleProjectClick = (project: (typeof projects)[number]) => {
    if (!shouldPreviewTouchClick()) {
      openProjectModal(project)
      return
    }

    clearTouchPreviewTimer()
    setTouchPreviewProjectTitle(project.title)

    touchPreviewTimerRef.current = window.setTimeout(() => {
      openProjectModal(project)
      setTouchPreviewProjectTitle(null)
      touchPreviewTimerRef.current = null
    }, 170)
  }

  return (
    <div ref={ref} className="projects">
      <Headings title="Projects" subtitle="My Highlighted Work" />
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            className={`projects-card ${
              touchPreviewProjectTitle === project.title ? 'is-touch-preview' : ''
            }`}
            key={project.title}
            role="button"
            tabIndex={0}
            onClick={() => handleProjectClick(project)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                clearTouchPreviewTimer()
                setTouchPreviewProjectTitle(null)
                openProjectModal(project)
              }
            }}
          >
            <div className="project-link" aria-hidden="true">
              <Github />
            </div>

            <p className="project-name">{project.title}</p>
            <div className="project-language">
              {project.languages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeProject &&
        createPortal(
          <div className="project-modal-backdrop" onClick={closeProjectModal} role="presentation">
            <div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <ShineBorder
                borderWidth={2}
                duration={12}
                shineColor={['#9fffd7', '#7bdfff', '#9fffd7']}
              />
              <div className="project-modal-content">
                <h3 className="project-modal-title" id="project-modal-title">
                  {activeProject.title}
                </h3>
                <p className="project-modal-description">
                  {activeProject.modal || `This project uses ${activeProject.languages.join(', ')}.`}
                </p>
                <div className="project-modal-footer">
                  {activeProject.githubUrl ? (
                    <a
                      className="project-modal-github-link"
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="project-modal-github-label">Available Here</span>
                      <span className="project-modal-github-icon" aria-hidden="true">
                        <Github />
                      </span>
                    </a>
                  ) : (
                    <span className="project-modal-no-repo">GitHub repo unavailable</span>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
})


Projects.displayName = 'Projects'

export { Projects }




