import React, { useState } from 'react';
import { LANGUAGES } from '../utils/constants';

const SnippetModal = ({ snippet, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: snippet?.name || '',
    language: snippet?.language || 'javascript',
    tags: snippet?.tags ? snippet.tags.join(', ') : '',
    code: snippet?.code || ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.code) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="text-xl font-bold">
            {snippet ? 'Modifica Snippet' : 'Nuovo Snippet'}
          </h2>
          <button onClick={onClose} className="icon-button">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="form-label">Nome/Descrizione</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Es. Funzione di validazione email"
            />
          </div>
          
          <div>
            <label className="form-label">Linguaggio</label>
            <select
              className="form-input"
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="form-label">Tag (separati da virgola)</label>
            <input
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="Es. utility, validazione, form"
            />
          </div>
          
          <div>
            <label className="form-label">Codice</label>
            <textarea
              className="form-input font-mono text-sm"
              rows="12"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              placeholder="Incolla qui il tuo codice..."
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Annulla
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.code}
            className="btn-primary"
          >
            {snippet ? 'Salva Modifiche' : 'Aggiungi Snippet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;