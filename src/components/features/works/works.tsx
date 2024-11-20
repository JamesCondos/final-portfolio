import React, { useEffect } from 'react';
import { Link, works } from '../../../library';
import { Headings } from '../../core/headings/headings';
import './style.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'fixed' as 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',  // Optional: adds rounded corners to the modal
  boxShadow: 24,
  p: 4,
  outline: 'none',      // Removes the border when focusing the modal
};

function BasicModal({ open, handleClose }: { open: boolean; handleClose: () => void }) {
  useEffect(() => {
    if (open) {
      // Disable background scroll and add padding to compensate for scrollbar
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Re-enable background scroll and remove padding
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor liguladsaaaaa
          Dashboard dsadsadsadsas d sads ds sa    ads dsa dsadsaads 
           sdadsa saddsa s a dsaa ds.
        </Typography>
      </Box>
    </Modal>
  );
}

export { BasicModal };





const Works = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div ref={ref} className="works">
      <Headings title="Working" subtitle="Places I've Worked" />
      <div className="projects-grid">
        {works.map((work) => (
          <div
            key={work.title}
            className="works-card"
            onClick={handleOpen}
            style={{ cursor: 'pointer' }}
          >
            <div className="project-link">
              <a
                target="_blank"
                href={work.externalUrl}
                rel="noreferrer"
                aria-label="live"
              >
                <Link />
              </a>
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
      <BasicModal open={open} handleClose={handleClose} />
    </div>
  );
});




Works.displayName = 'Works';

export { Works };


