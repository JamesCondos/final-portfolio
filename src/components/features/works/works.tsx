import React from 'react';
import { Link, works } from '../../../library';
import './style.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function BasicModal({
  open,
  handleClose,
  modalContent,
  modalTitle,
}: {
  open: boolean;
  handleClose: () => void;
  modalContent: string;
  modalTitle: string;
}) {
  // Toggle a class that neutralizes transforms on html/body while open
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (open) {
      html.classList.add('modal-open');
      body.classList.add('modal-open');
    } else {
      html.classList.remove('modal-open');
      body.classList.remove('modal-open');
    }
    return () => {
      html.classList.remove('modal-open');
      body.classList.remove('modal-open');
    };
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      keepMounted
      disableScrollLock        // we already fixed scroll jump in Works; leave body alone
      disableAutoFocus         // avoid focus-induced scrolling
      disableEnforceFocus
      disableRestoreFocus
      sx={{
        display: 'flex',           // ⬅️ center the child
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,                      // viewport padding so it never hugs edges
      }}
    >
      <Box
        role="dialog"
        aria-modal="true"
        sx={{
          width: { xs: '92vw', sm: 600, md: 900 },
          maxWidth: '92vw',
          maxHeight: '85vh',
          overflow: 'auto',
          bgcolor: '#eeeee4',
          borderRadius: '30px',
          boxShadow: 24,
          outline: 'none',
          p: { xs: 3, sm: 6 },
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            mb: 2,
            backgroundColor: '#313f49',
            borderRadius: '8px',
            color: 'white',
            px: 2,
            py: 1,
          }}
        >
          {modalTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '1.25rem' }}>
          {modalContent}
        </Typography>
      </Box>
    </Modal>
  );
}

export { BasicModal };



const Works = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [selectedModalContent, setSelectedModalContent] = React.useState('');
  const [selectedModalTitle, setSelectedModalTitle] = React.useState('');
  const scrollYRef = React.useRef(0);  // ⬅️ remember scroll here

  const handleOpen = (modalTitle: string, modalContent: string) => {
    scrollYRef.current = window.scrollY || 0;        // ⬅️ capture scroll
    setSelectedModalTitle(modalTitle);
    setSelectedModalContent(modalContent);
    setOpen(true);
  };

  // When the modal opens, snap back to where we were
  React.useEffect(() => {
    if (open) {
      // do it twice to beat layout/portal timing
      const y = scrollYRef.current;
      requestAnimationFrame(() => window.scrollTo(0, y));
      setTimeout(() => window.scrollTo(0, y), 0);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    // restore again after closing
    const y = scrollYRef.current;
    requestAnimationFrame(() => window.scrollTo(0, y));
    setTimeout(() => window.scrollTo(0, y), 0);
  };

  return (
    <div ref={ref} className="works">
      {/* ... unchanged ... */}
      <div className="projects-grid">
        {works.map((work) => (
          <div
            key={work.title}
            className="works-card"
            onClick={() => handleOpen(work.title, work.modal)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen(work.title, work.modal)}
          >
            <div className="project-link">
              {/* avoid <a href=""> jumps: use a button */}
              <button
                type="button"
                aria-label="open external"
                onClick={(e) => {
                  e.stopPropagation();
                  if (work.externalUrl) window.open(work.externalUrl, '_blank', 'noopener,noreferrer');
                }}
                 style={{   // anchor to the card (works-card is already position:relative)
              // move closer to the right
    width: 44,               // square size
    height: 44,
    display: 'inline-flex',  // center the icon inside
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    borderRadius: 12,        // or 0 for sharp corners
    padding: 0,              // prevent oval from padding mismatch
    lineHeight: 0,           // prevent extra vertical space from fonts
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: 24,
    border: '1px solid transparent',
    position: 'absolute', top: -11, right: -11,
    
  }}
              >
                <Link />
              </button>
            </div>

            <p className="project-name">{work.title}</p>
            <div className="project-language">
              {work.languages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BasicModal
        open={open}
        handleClose={handleClose}
        modalContent={selectedModalContent}
        modalTitle={selectedModalTitle}
      />
    </div>
  );
});

Works.displayName = 'Works';

export { Works };
