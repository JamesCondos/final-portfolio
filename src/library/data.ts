// 📦 Projects list: Customize with your own project details.
export const projects = [
  {
    title: 'AI and LLM Research Paper',
    githubUrl: 'https://github.com/JamesCondos/SOML_Final_Project_Paper',
    externalUrl: '',
    languages: ['Python', 'Quantisation', 'Research'],
    modal:
      "Reproduced the results and conducted research extensions on 'Activation-Aware-Quantisation' by Lin et al. Explored the use of Large Language Models, how they're deployed, and how different models perform. More concretely, we also compared the major differences between GPTQ and AWQ quanitsation, and how different calibration methods can affect the performance of the model and mathematical justification. ",
  },
  {
    title: 'Tweet Sentiment Reseach Paper', // Enter project title.
    githubUrl: 'https://github.com/JamesCondos/ML_TweetSentiment_Research', // Enter GitHub URL.
    externalUrl: '', // Enter live site URL.
    languages: ['Machine Learning', 'Research', 'Python'], // Specify technologies used.
    modal:
      'A research-focused sentiment analysis pipeline for tweets, exploring data cleaning, feature engineering, and model evaluation for noisy real-world text.',
  },
  {
    title: 'Quantum Neural Networks',
    //githubUrl: '',
    //externalUrl: '',
    languages: ['Research', 'Qiskit', 'Quantum Computing'],
    modal:
      'An exploration of hybrid quantum-classical learning methods using Qiskit to compare quantum circuit models against classical baselines.',
  },
  {
    title: 'Hardware Accelerator for a Convolutional Neural Network',
    githubUrl: 'https://github.com/JamesCondos/Hardware_Accelerated_Computing_Private_V2/tree/James_Code_V2',
   // externalUrl: '',
    languages: ['HLS Vitis', 'C++'],
    modal:
        `Designed and implemented a hardware accelerator for convolutional neural networks (CNNs) using Vitis HLS
        and Verilog, targeting low-latency inference on FPGA hardware.
        Developed and optimised CNN compute kernels in Vitis HLS, applying loop pipelining, unrolling, and
        memory-interface optimisations to improve throughput and resource efficiency.
        Achieved ×71 speedup per layer over software execution by accelerating CNN convolution layers on the FPGA.
        Reduced software execution bottlenecks by offloading computationally intensive CNN layers to custom FPGA
        hardware.`
  },
  {    
    title: 'ROS 2 Autonomous Robot',
    githubUrl: '',
   // externalUrl: '',
    languages: ['Python', 'ROS 2', 'SLAM', 'NAV2'],
    modal:
      'Designing and implementing an autonomous indoor plant-monitoring robot using ROS2. The robot was built to navigate a mapped indoor environment, visit multiple plant inspection locations, avoid obstacles and capture images without manual intervention using LiDAR-based SLAM, AMCL localisation, Nav2 path planning, YOLO-based plant detection.',
  },
  {
    title: 'Doubly Connected Edged List',
    githubUrl: 'https://github.com/JamesCondos/Doubly-Connected-Edge-Linked-List',
   // externalUrl: '',
    languages: ['C Language'],
    modal:
      'A C implementation of a DCEL data structure for robust computational geometry workflows and efficient edge/face adjacency traversal.',
  },
  {
    title: 'FPGA Clock',
    githubUrl: 'https://github.com/JamesCondos/FPGA_Clock/tree/main',
    //externalUrl: '',
    languages: ['Verilog Language', 'FPGA'],
    modal:
      'A digital clock implemented on FPGA hardware using Verilog, focused on reliable timing logic, display control, and hardware validation.',
  },
]

// 📱 Social media links: Update with your URLs and choose appropriate icons.
export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/JamesCondos',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/james-condos/',
    icon: 'LinkedIn',
  },
]

// 🚀 Navigation data: Customize navigation labels and links as needed.
export const navbarData = {
  navigator: [
    { name: 'Home' },
    { name: 'About' },
    { name: 'Projects' },
    { name: 'Contact' },
  ],
}

