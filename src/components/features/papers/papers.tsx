import { forwardRef, useState } from 'react'
import { FileText, Plus } from 'lucide-react'
import { Github } from '../../../library'
import { papers } from '../../../library/papers'
import './style.css'

type YearFilter = number | 'all' | 'undated'
const years = [...new Set(papers.flatMap((paper) => paper.year ? [paper.year] : []))].sort((a, b) => b - a)
const filters: Array<{ value: YearFilter; label: string }> = [
  { value: 'all', label: 'All work' },
  ...years.map((year) => ({ value: year, label: String(year) })),
  ...(papers.some((paper) => !paper.year) ? [{ value: 'undated' as const, label: 'Undated' }] : []),
]
const matchesYear = (year: number | undefined, filter: YearFilter) =>
  filter === 'all' || (filter === 'undated' ? !year : year === filter)

const Papers = forwardRef<HTMLDivElement>((_props, ref) => {
  const [selectedYear, setSelectedYear] = useState<YearFilter>('all')
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null)
  const visiblePapers = papers.filter((paper) => matchesYear(paper.year, selectedYear))

  return (
    <div ref={ref} id="papers" className="papers" role="region" aria-labelledby="papers-heading" tabIndex={-1}>
      <header className="papers-heading">
        <p className="papers-eyebrow">Selected research</p>
        <h2 id="papers-heading">Research & writing.</h2>
        <p className="papers-intro">Questions I’ve explored through experiments, models and writing.</p>
      </header>

      <div className="papers-archive">
        <nav className="papers-years" aria-label="Filter research by year">
          <span className="papers-years-label">Browse by year</span>
          <div className="papers-year-options">
            {filters.map(({ value, label }) => (
              <button
                type="button"
                className="papers-year"
                key={value}
                aria-pressed={selectedYear === value}
                aria-controls="papers-list"
                onClick={() => { setSelectedYear(value); setExpandedPaper(null) }}
              >
                <span>{label}</span>
                <span className="papers-year-count">{papers.filter((paper) => matchesYear(paper.year, value)).length}</span>
              </button>
            ))}
          </div>
        </nav>

        <div id="papers-list" className="papers-list">
          <p className="papers-sr-only" role="status" aria-live="polite" aria-atomic="true">
            {visiblePapers.length} {visiblePapers.length === 1 ? 'study' : 'studies'}
            {selectedYear === 'all' ? ' from all years' : selectedYear === 'undated' ? ' without a listed year' : ` from ${selectedYear}`}
          </p>
          {visiblePapers.map((paper) => {
            const isExpanded = expandedPaper === paper.id
            return (
              <article className="paper" key={paper.id} data-expanded={isExpanded} aria-labelledby={`${paper.id}-heading`}>
                <div className="paper-meta">
                  <span className="paper-category">{paper.category}</span>
                  <span className="paper-meta-end">
                    {paper.status && <span className="paper-status">{paper.status}</span>}
                    {paper.year && <time dateTime={String(paper.year)}>{paper.year}</time>}
                  </span>
                </div>
                <h3 className="paper-heading">
                  <button
                    type="button"
                    className="paper-toggle"
                    id={`${paper.id}-heading`}
                    aria-expanded={isExpanded}
                    aria-controls={`${paper.id}-details`}
                    onClick={() => setExpandedPaper(isExpanded ? null : paper.id)}
                  >
                    <span className="paper-title">{paper.displayTitle ?? paper.title}</span>
                    <span className="paper-toggle-icon" aria-hidden="true"><Plus size={18} strokeWidth={1.5} /></span>
                  </button>
                </h3>
                <p className="paper-summary paper-overview">{paper.summary}</p>
                <button
                  type="button"
                  className="paper-detail-toggle"
                  aria-expanded={isExpanded}
                  aria-controls={`${paper.id}-details`}
                  aria-label={`${isExpanded ? 'Close' : 'Explore'} study: ${paper.displayTitle ?? paper.title}`}
                  onClick={() => setExpandedPaper(isExpanded ? null : paper.id)}
                >
                  {isExpanded ? 'Close study' : 'Explore study'}
                </button>
                <div
                  id={`${paper.id}-details`}
                  className="paper-details"
                  role="region"
                  aria-labelledby={`${paper.id}-heading`}
                  hidden={!isExpanded}
                >
                  <p className="paper-full-title">{paper.title}</p>
                  {paper.authors && <p className="paper-authors">{paper.authors}</p>}
                  {paper.details?.map((detail) => (
                    <div className="paper-finding" key={detail.heading}>
                      <h4>{detail.heading}</h4>
                      <p>{detail.body}</p>
                    </div>
                  ))}
                  {paper.figure && (
                    <figure className="paper-figure">
                      <a
                        href={`${import.meta.env.BASE_URL}${paper.figure.src}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open the original figure for ${paper.title} (opens in a new tab)`}
                      >
                        <img
                          src={`${import.meta.env.BASE_URL}${paper.figure.src}`}
                          alt={paper.figure.alt}
                          width={paper.figure.width}
                          height={paper.figure.height}
                          loading="lazy"
                        />
                      </a>
                      <figcaption>{paper.figure.caption}</figcaption>
                    </figure>
                  )}
                  <ul className="paper-topics" aria-label="Topics">
                    {paper.topics.map((topic) => <li key={topic}>{topic}</li>)}
                  </ul>
                  {(paper.file || paper.repository) && (
                    <div className="paper-footer">
                      {paper.file && (
                        <a
                          className="paper-read"
                          href={`${import.meta.env.BASE_URL}${paper.file}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Read ${paper.title} (PDF, opens in a new tab)`}
                        >
                          <FileText size={17} strokeWidth={1.5} aria-hidden="true" />
                          Read paper
                          <span className="paper-file-info">PDF{paper.pages ? ` · ${paper.pages} pages` : ''}</span>
                        </a>
                      )}
                      {paper.repository && (
                        <a
                          className="paper-source"
                          href={paper.repository}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View the repository for ${paper.title} (opens in a new tab)`}
                        >
                          <Github size={16} aria-hidden="true" />Repository
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
})

Papers.displayName = 'Papers'
export { Papers }
