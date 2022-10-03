import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from 'components/Modal/Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleClose = () => {
    window.removeEventListener('keydown', handleKeyDown);
    onClose();
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      handleClose();
    }
  };

  const handleBackDrop = event => {
    if (event.currentTarget === event.target) {
      handleClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDrop}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
