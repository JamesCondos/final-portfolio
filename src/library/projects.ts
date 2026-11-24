type ProjectImage = {
  src: string
  label: string
  alt: string
  caption: string
  width: number
  height: number
}

type EngineeringProject = {
  id: string
  title: string
  technologies: string
  summary: string
  repository?: string | null
  figure?: ProjectImage
}

// Source material supplied by James:
// Robot trajectories: ASC_Project_Report.zip, Validation.tex (final validation).
// Hardware: Hardware_Accelerated_Computing_Final_Project__Copy_.zip.
// Its unfinished results do not establish the old portfolio's 71x speedup.
export const engineeringProjects: EngineeringProject[] = [
  {
    id: 'autonomous-robot',
    title: 'Autonomous plant-monitoring robot',
    repository: 'https://github.com/JamesCondos/Plant_Monitoring_RObot_ASC',
    technologies: 'ROS 2 · JavaScript · foxglove_bridge · Nav2',
    summary: 'An autonomous ROS 2 robot navigates a mapped room, avoids obstacles and photographs plants at six inspection stops.',
    figure: {
      label: 'View robot paths',
      src: 'projects/robot-final-mission-trajectories.png',
      width: 2796,
      height: 1647,
      alt: 'Floor plan with four robot paths connecting Home and the six photo stops W1–W6. The paths diverge near obstacles and meet again at the stops.',
      caption: 'Each run starts at Home, visits W1–W6 to photograph the plants marked by orange crosses, and returns to Home. The dashed green and cyan lines show slow and fast runs on a clear route. The solid blue line shows the route around fixed obstacles, and the red line shows the route around temporary obstacles.',
    },
  },
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
