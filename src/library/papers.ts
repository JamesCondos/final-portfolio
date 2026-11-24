export type Paper = {
  id: string
  title: string
  displayTitle?: string
  year?: number
  category: string
  authors?: string
  status?: string
  summary: string
  details?: Array<{ heading: string; body: string }>
  topics: string[]
  pages?: number
  file?: string
  repository?: string
  figure?: { src: string; alt: string; caption: string; width: number; height: number }
}

// Editorial order puts the selected research first; dates remain filterable.
// AegisMAE and Communications use dynamic dates in their source, so their years
// remain unset until confirmed. Do not infer a writing year from experiment seeds.
export const papers: Paper[] = [
  {
    id: 'network-performance-capstone',
    title: 'Network performance prediction for Telstra’s radio access network',
    displayTitle: 'Capstone · Forecasting mobile network performance',
    year: 2026,
    category: 'Capstone · Time-series forecasting',
    authors: 'James Condos & Sithira Jayasinghe',
    status: 'Publication planned',
    pages: 52,
    file: 'papers/Engineering_Capstone_Report_Paper.pdf',
    repository: 'https://github.com/JamesCondos/Capstone_Telstra',
    summary: 'A capstone with Telstra and the University of Melbourne exploring how neural forecasting could support radio access network decisions, and when smaller models outperform an adapted language model.',
    details: [
      {
        heading: 'The research',
        body: 'I co-authored this study of network forecasting, changing operating conditions and model predictions. A residual MLP improved mean absolute error over persistence by an average of 14.1% across sector KPIs and 9.7% across cell inputs. These are separate forecasting tasks.',
      },
      {
        heading: 'What we learned',
        body: 'In a separate site-throughput comparison, an LSTM achieved 4.281 Mbit/s mean absolute error, compared with 4.422 for adapted Qwen and 4.881 for persistence. That comparison used 2,384 test windows from 149 sites. The main evaluation covered 69 days with held-out sectors; the work does not establish deployed performance, and a complete forecasting-to-decision system was not evaluated.',
      },
    ],
    topics: ['Time-series forecasting', 'Neural networks', 'Radio access networks'],
    // Engineering_Capstone_Report___Personal_Copy (4).zip: main.tex,
    // fixed date 26 October 2026; results and limitations at lines 3217–3307.
    // Publication planned is user-supplied status, not a claim of acceptance.
    figure: {
      src: 'papers/capstone-forecast-comparison.png',
      width: 1658,
      height: 962,
      alt: 'Forecast error at 15, 30, 45 and 60 minute horizons, comparing persistence, recent-hour mean, adapted Qwen, MLP, LSTM and CNN–LSTM–MLP models for site-average downlink throughput.',
      caption: 'Site-average downlink throughput forecast error over 15–60-minute horizons, using six hours of history. Results cover 2,384 test windows from 149 sites; smaller neural models outperform adapted Qwen overall.',
    },
  },
  {
    id: 'aegismae',
    title: 'AegisMAE: Adversarially Self-Supervised Malware Anomaly Detection Under Constrained Attacks',
    displayTitle: 'AegisMAE · Detecting unseen malware',
    year: 2026,
    status: 'Publication Planned',
    category: 'Machine learning · Security',
    authors: 'James Condos',
    summary: 'Can a detector recognise malware families it has never seen? We explored masked representation learning, anomaly detection and the limits of adversarial robustness.',
    details: [
      {
        heading: 'What the experiments showed',
        body: 'Across a comparison of seven models on eight held-out malware families with three training seeds, AegisMAE reached mean average precision of 0.8842 ± 0.0343. Detection varied sharply by family. Testing constrained feature changes exposed further weaknesses; adversarial training improved robustness without resolving them.',
      },
    ],
    topics: ['PyTorch', 'Masked autoencoders', 'Anomaly detection'],
    // Original figure and findings from the supplied AegisMAE source archive;
    // authorship verified in appendices/D_author_contributions.tex.
    figure: {
      src: 'projects/aegismae-family-precision.png',
      width: 2220,
      height: 1138,
      alt: 'Average precision heatmap comparing seven detection models across eight held-out malware families, showing strong but uneven AegisMAE results.',
      caption: 'Our results across eight held-out malware families. Cells show mean average precision ± sample standard deviation across three training seeds.',
    },
  },
  {
    id: 'awq-llm-inference',
    title: 'Reproducing AWQ for Efficient 4-bit LLM Inference on Qwen2.5-3B-Instruct',
    displayTitle: 'AWQ · Making language models smaller',
    // The paper's footer is dated June 12, 2026.
    year: 2026,
    category: 'Large language models',
    authors: 'James Condos & Sithira Jayasinghe',
    summary:
      'A study of 4-bit language model quantisation on a laptop GPU: how much memory can we save, and what happens to model quality and decoding speed?',
    details: [
      {
        heading: 'Inside the study',
        body: 'I co-authored this reproduction of AWQ experiments on Qwen2.5-3B-Instruct. We explored calibration samples that cover more varied activation channels. The laptop tests reduced memory use, but also exposed slower decoding in that environment.',
      },
    ],
    topics: ['Quantisation', 'LLMs', 'Python'],
    pages: 18,
    file: 'papers/awq-llm-inference.pdf',
    repository: 'https://github.com/JamesCondos/SOML_Final_Project_Paper',
    // Unchanged output3.png from the supplied System Optimisation and Machine Learning source archive.
    figure: {
      src: 'papers/awq-calibration-comparison.png',
      width: 689,
      height: 440,
      alt: 'AWQ and GPTQ perplexity at calibration budgets of 4 and 32 sequences, with lower perplexity for AWQ in this experiment.',
      caption: 'Our AWQ and GPTQ calibration comparison on Qwen2.5-3B-Instruct. Evaluated on 20 WikiText-2 blocks of 512 tokens; lower perplexity is better.',
    },
  },
  {
    id: 'ros2-network-constraints',
    title: 'Performance and Reliability of a ROS2–REST Gateway under Network Constraints',
    displayTitle: 'Robot communication under network constraints',
    category: 'Communication networks',
    year: 2026,
    authors: 'James Condos & Luke Kristitz',
    summary: 'How do robots share a limited connection? I investigated queueing, HTTP versions and gateway scheduling for communication between simulated ROS 2 robots and a central service.',
    details: [
      {
        heading: 'A useful trade-off',
        body: 'Using four simulated robots, two sites and two server workers on one WSL2 host, uploads were capped at 2 Mbit/s per site. Priority scheduling reduced command successful-message p95 latency from 26.17 s to 1.77 s, averaged over five trials. Most commands still missed the 100 ms target, and sensor and video delivery fell. Latency measures only completed messages, so the results need to be read alongside delivery rates.',
      },
    ],
    topics: ['ROS 2', 'Queueing', 'HTTP', 'Networking'],
    // Communication_Networks___Final_Project (4).zip: main.tex sections
    // attributed to James; priority_findings.tex and priority_capped_table.tex.
    figure: {
      src: 'papers/communications-priority-latency.png',
      width: 830,
      height: 588,
      alt: 'Log-scale comparison of successful-message p95 latency under FIFO and priority scheduling. Priority reduces command, status and odometry delay, while sensor and video delay stays high.',
      caption: 'FIFO versus priority scheduling with 2 Mbit/s uploads per site. Successful-message p95 latency; markers show five-run means and bars show minimum–maximum. Priority improved critical-message delay but did not guarantee deadlines.',
    },
  },
  {
    id: 'tweet-sentiment-analysis',
    title: 'Predicting Sentiments of Twitter Tweets by Training and Testing Machine Learning Models',
    displayTitle: 'Predicting the sentiment of Twitter tweets',
    // Year inferred from the PDF metadata title:
    // "COMP30027 Assingment 2 Sem 1 2022.docx". No date is printed in the paper.
    year: 2022,
    category: 'Machine learning',
    // The submitted PDF is anonymised; do not invent a byline.
    summary:
      'Comparing machine learning classifiers for tweet sentiment, with feature engineering, text preprocessing and model evaluation.',
    topics: ['Sentiment analysis', 'NLP', 'Python'],
    pages: 6,
    file: 'papers/tweet-sentiment-analysis.pdf',
    repository: 'https://github.com/JamesCondos/ML_TweetSentiment_Research',
  },
]
