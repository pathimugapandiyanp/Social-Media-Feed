import React from 'react';
import './index.css'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>Close</button>
        <h3>Upload or Take a Photo</h3>
        <div className="modal-actions">
          <input type="file" accept="image/*" className="upload-button" />
          <button className="use-camera-button" onClick={() => alert("Camera functionality")}>Use Camera</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
