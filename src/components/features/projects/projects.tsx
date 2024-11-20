import React from 'react'
import { Github, Link, projects } from '../../../library'
import { Headings } from '../../core/headings/headings'
import './style.css'
import { BiColorFill } from 'react-icons/bi'



const Projects = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    
    <div ref={ref} className="projects">

      
      {/* 🎯 Display the section title and subtitle */}
      <Headings title="Projects" subtitle="Stuff I’ve Worked On" />

      
      <div className="projects-grid">
        
        {projects.map((project) => (
          <a
            className="projects-card"
            href={project.githubUrl} // 🔄 Placeholder link, replace with the project detail page URL
            target="_blank"
            key={project.title}
            rel="noreferrer"
          >
            <div className="project-link">
              <a
                target={'_blank'}
                href={project.githubUrl}
                rel="noreferrer"
                aria-label="github"
              >
                <Github />
              </a>
              
            </div>

            <p className="project-name">{project.title}</p>
            <div className="project-language">
              {project.languages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
})


Projects.displayName = 'Projects'

export { Projects }




export default function Dashboard(): ReturnType<React.FC> {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <h1>Dashboard</h1>
      <div className="projects-card">
      <span>Toggle Card</span>
      <button type="button" className="projects-card" onClick={toggleModal}>Open</button>
      </div>
    </>
  );
}

export { Dashboard }

