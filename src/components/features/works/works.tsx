import React, { useEffect } from 'react';
import { Link, works } from '../../../library';
import { Headings } from '../../core/headings/headings';
import './style.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: '#eeeee4',
  borderRadius: '30px',
  boxShadow: 24,
  p: 8,
  outline: 'none',
 
  
  
};


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
  useEffect(() => {
    if (open) {
      
     
      document.body.style.overflow = 'hidden';
    
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

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
        <Typography id="modal-modal-title" variant="h6" component="h2"
        sx={{
          fontWeight: 'bold',
          fontSize: '2.5rem',
          mb: 2,
          backgroundColor: '#313f49',                
          padding: '15px',         // Minimal padding around the text
          borderRadius: '8px',        // Rounded corners around text background
          textAlign: 'center',        // Center-align text
          display: 'inline',           // Make the element occupy full width for centering
          margin: '0 auto',
          color: 'white'           // Center the element itself
        }}>
          {modalTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2,fontSize: '1.5rem', }}>
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

  const handleOpen = (modalTitle: string, modalContent: string) => {
    setSelectedModalTitle(modalTitle);       // Set the unique title
    setSelectedModalContent(modalContent);   // Set the unique content
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedModalContent('');
    setSelectedModalTitle('');
  };

  return (
    <div ref={ref} className="works">
      <Headings title="Working" subtitle="Places I've Worked" />
      <div className="projects-grid">
        {works.map((work) => (
          <div
            key={work.title}
            className="works-card"
            onClick={() => handleOpen(work.title, work.modal)}
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
