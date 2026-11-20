type Experience = {
  id: string
  period: string
  role: string
  organisation: string
  description: string
}

// Dates and role details are from public/James_Condos_Resume_July_2026_Updated.pdf.
// The master's is in progress; 2026 is its expected completion year.
// The resume lists undergraduate study as 2019–2023, while the previous About
// copy said 2022. The introductory copy deliberately omits that disputed year.
export const experience: Experience[] = [
  {
    id: 'electrical-engineering',
    period: '2024–2026',
    role: 'Master of Electrical Engineering',
    organisation: 'University of Melbourne',
    description: 'Autonomous systems and AI. Expected completion in 2026.',
  },
  {
    id: 'stem-cadetship',
    period: '2025–present',
    role: 'STEM Intern Cadetship',
    organisation: 'Australian Defence Force · Science and Technology',
    description: 'Python development, network automation and real-time operating systems.',
  },
  {
    id: 'phm-technology',
    period: 'Jan–Jul 2025',
    role: 'Electrical Engineering & Research Intern',
    organisation: 'PHM Technology',
    description: 'Discrete-event simulations and decision agents for multi-agent maintenance research.',
  },
  {
    id: 'melbourne-space',
    period: '2022–2025',
    role: 'Attitude Determination & Control Systems Lead',
    organisation: 'Melbourne Space Program · ACRUX-2',
    description: 'Satellite control algorithms and C++ interfaces for reaction wheels and sensors.',
  },
  {
    id: 'physics-research',
    period: '2021–2025',
    role: 'Physics Research & Teaching',
    organisation: 'University of Melbourne',
    description: 'Quantum machine learning research, undergraduate laboratory teaching and assessment.',
  },
]

export const earlierExperience: Experience[] = [
  {
    id: 'apa-group',
    period: 'Jan–Mar 2022',
    role: 'Software Developer Intern',
    organisation: 'APA Group',
    description: 'Java and MySQL development, with CI/CD pipelines using TeamCity and Octopus Deploy.',
  },
]
