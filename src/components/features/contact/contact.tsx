import React from 'react'
import { Headings } from '../../core/headings/headings'
import './style.css'

const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="contact">
      {/* 🎯 Headings component for consistent styling across the application */}
      <Headings title="Contact" subtitle="Look Who's Here" />
      {/* 📝 Information text about how to contact */}
      <div className="contact-text">
        The fastest way to get in touch with me is to send me a message on{' '}
        <a
          href="https://www.linkedin.com/in/james-condos-608672179/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>{' '}
        or a email on{' '}
        <a

        >
          James.Condos@outlook.com
        </a>
        . Always welcome new people! 
        
      </div>
    </div>
  )
})

Contact.displayName = 'Contact'

export { Contact }
