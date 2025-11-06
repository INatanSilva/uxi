import { useEffect, useRef } from 'react';
import './ServiceDialog.css';

interface ServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ServiceDialog = ({ isOpen, onClose, isDarkMode }: ServiceDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={`dialog-overlay ${isDarkMode ? 'dark' : 'light'}`}
      onClick={onClose}
    >
      <div 
        className={`dialog-content ${isDarkMode ? 'dark' : 'light'}`}
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <button 
          className="dialog-close-button"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="dialog-header">
          <h2 className="dialog-title">O que você precisa?</h2>
        </div>

        <div className="dialog-body">
          {/* Componente de seleção de serviço */}
          <div className="service-selector">
            <div className="service-option skeleton"></div>
            <div className="service-option skeleton"></div>
            <div className="service-option skeleton"></div>
            <div className="service-option skeleton"></div>
          </div>

          {/* Componente de detalhes */}
          <div className="service-details">
            <div className="detail-section skeleton"></div>
            <div className="detail-section skeleton"></div>
          </div>

          {/* Componente de informações adicionais */}
          <div className="additional-info">
            <div className="info-item skeleton"></div>
            <div className="info-item skeleton"></div>
          </div>

          {/* Componente de ações */}
          <div className="dialog-actions">
            <div className="action-button skeleton"></div>
            <div className="action-button skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDialog;

