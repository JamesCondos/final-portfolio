import { forwardRef } from 'react'
import { Headings } from '../../core/headings/headings';
import './style.css';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const About = forwardRef<HTMLDivElement>((_props, ref) => {
  // LaTeX for Schrödinger equation
  const schrodingerEquation = `
    i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r}, t) =
    \\left[-\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r}, t)\\right]\\Psi(\\mathbf{r}, t)
  `;

  const mathJaxConfig = {
    loader: { load: ['[tex]/ams'] },
    tex: {
      packages: { '[+]': ['ams'] },
    },
    chtml: {
      displayAlign: 'center',
      scale: 1.0, // Adjust scale if needed
    },
  };

  return (
    <div ref={ref} className="about-section">
      {/* MathJaxContext with configuration */}
      <MathJaxContext config={mathJaxConfig}>
      <h1 className="neonText">
  <MathJax inline>{`\\(${schrodingerEquation}\\)`}</MathJax>
</h1>

      </MathJaxContext>

      {/* 🎯 Display the section title and subtitle */}
      <Headings title="About" subtitle="Hi, I'm James." />
      <p className="about-text">
        Hello! My name is James Condos, I  graduated from my BSc in Mathematical Physics and my Diploma in Computer Science in 2022, and I am currently studying a MSc in Electrical Engineering from the University of Melbourne, graduating at the end of 2026.
        <br />
        My passion in STEM comes from my interests in Signal Theory, Machine Learning, Quantum Computing, Embedded Systems, and Physics specifically. These fundamental ideas are pushing the envelope of human nature, and what is inherently contributing to a better tomorrow.
        <br />
        <br />
        My experience and project work have been spread out across multiple disciplines, and I am actively trying to get more involved in interesting engineering and research projects, whilst also gaining more experience in the industry.
        <br />
        <br />
        <a href="\final-portfolio\Public\James_Condos_Resume_Oct2025" download className="button">
          Download my Resume!
        </a>
      </p>
    </div>
  );
});

About.displayName = 'About';

export { About };
