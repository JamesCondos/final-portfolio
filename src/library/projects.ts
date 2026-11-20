export type ProjectImage = {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
  fit?: 'cover' | 'contain'
  aspectRatio?: '16 / 9' | '4 / 3' | 'auto'
}

export type FeaturedProject = {
  id: string
  title: string
  category: string
  summary: string
  technologies: string[]
  contributionLabel?: string
  contribution: string
  outcomeLabel: string
  outcome: string
  repository?: string
  year?: number
  media?: { type: 'image' } & ProjectImage
  gallery?: ProjectImage[]
  report?: { href: string; label: string }
}

// Source material supplied by James:
// Robot: ASC_Project_Report.zip, Contribution_Statement/Contribution.tex,
// Subsystems/GUI.tex and Validation.tex (post-repair final validation).
// This final report supersedes the earlier ASC preliminary report.
// Report figures are unchanged originals. The robot hero is an extracted video frame.
// Video: youtube.com/watch?v=yv3sCIsQnJQ at 7:43.383; bottom subtitle cropped.
// Hardware: Hardware_Accelerated_Computing_Final_Project__Copy_.zip.
// Its unfinished results do not establish the old portfolio's 71x speedup.
export const featuredProjects: FeaturedProject[] = [
  {
    id: 'autonomous-robot',
    title: 'Autonomous plant-monitoring robot',
    category: 'Robotics · Team project',
    year: 2026,
    summary: 'I developed the monitoring dashboard and helped integrate our team’s autonomous plant-inspection system. The robot navigates a mapped room, visits six inspection stops and saves images of the plants.',
    technologies: ['ROS 2', 'JavaScript', 'foxglove_bridge', 'Nav2'],
    contributionLabel: 'My part',
    contribution: 'I built the browser-based interface that brings robot pose, planned paths, annotated camera images and saved inspection records into one view. It uses HTML, JavaScript and foxglove_bridge to connect to ROS 2. I also supported system integration, architecture documentation, odometry, debugging and report coordination.',
    outcomeLabel: 'From integration to a complete mission',
    outcome: 'After a localisation failure was diagnosed and repaired, all 10 final validation runs reached the six inspection stops and saved every required image without collisions or manual intervention. The tests covered clear paths, static obstacles and temporary obstacles in the known, mapped room.',
    media: {
      type: 'image',
      src: 'projects/robot-demo-still.jpg',
      width: 1920,
      height: 960,
      alt: 'Front view of our wheeled ASClinic robot on a courtyard path, showing its camera, lidar and transparent chassis.',
      caption: 'Our ASClinic robot, 2026. A still from the team’s demonstration video.',
      aspectRatio: 'auto',
    },
    gallery: [
      {
        src: 'projects/robot-monitoring-dashboard.jpg',
        alt: 'The BANANA INC browser dashboard showing robot pose, connection status and a plant camera image with detection labels.',
        caption: 'The monitoring interface I developed: robot pose, connection status and annotated camera output in one browser view.',
      },
      {
        src: 'projects/robot-final-mission-trajectories.png',
        alt: 'Four representative final mission trajectories through the room, showing the six photo stops and routes around obstacles.',
        caption: 'One representative trajectory per final validation condition, showing the six inspection stops and obstacle responses.',
      },
    ],
  },
]

export const additionalProjects: Array<{
  id: string
  title: string
  technologies: string
  summary: string
  repository?: string
}> = [
  {
    id: 'cnn-accelerator',
    title: 'SRCNN hardware acceleration',
    technologies: 'Vitis HLS · C++ · Verilog · Kria KV260',
    summary: 'Exploring tiled convolution, pipelining and HLS streams for image super-resolution on an FPGA. Processing smaller image regions trades loop overhead for lower on-chip memory use.',
    repository: 'https://github.com/JamesCondos/Hardware_Accelerated_Computing_Private_V2/tree/James_Code_V2',
  },
  {
    id: 'quantum-neural-networks',
    title: 'Quantum neural networks',
    technologies: 'Qiskit · Quantum computing',
    summary: 'An exploration of hybrid quantum-classical learning, comparing quantum circuit models with classical baselines.',
  },
  {
    id: 'dcel',
    title: 'Doubly connected edge list',
    technologies: 'C · Computational geometry',
    summary: 'A DCEL data structure for computational geometry, with efficient edge and face adjacency traversal.',
    repository: 'https://github.com/JamesCondos/Doubly-Connected-Edge-Linked-List',
  },
  {
    id: 'fpga-clock',
    title: 'FPGA digital clock',
    technologies: 'Verilog · FPGA',
    summary: 'A digital clock focused on reliable timing logic, display control and hardware validation.',
    repository: 'https://github.com/JamesCondos/FPGA_Clock/tree/main',
  },
]
