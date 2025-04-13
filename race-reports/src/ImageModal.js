import * as React from 'react';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';

export default function ImageModal({ open, src, onClose }) {
  return  (
    <Modal
      open={open}
      onClose={() => onClose()}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog layout="center">
        <ModalClose />
        <Box
          component="img"
          src={src}
          sx={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
          }}
        />
      </ModalDialog>
    </Modal>
  );
}