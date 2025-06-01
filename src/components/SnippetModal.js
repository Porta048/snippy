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
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div className="modal-content modal-slide-in" onClick={(e) => e.stopPropagation()}>
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
        
        <div className="p-6 space-y-6 overflow-y-auto max-h-96">
          <div>
            <label className="form-label flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Nome/Descrizione
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Es. Funzione di validazione email"
            />
          </div>
          
          <div>
            <label className="form-label flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Linguaggio
            </label>
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
            <label className="form-label flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Tag (separati da virgola)
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="Es. utility, validazione, form"
            />
          </div>
          
          <div>
            <label className="form-label flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Codice
            </label>
            <div className="relative">
              <textarea
                className="form-input font-mono text-sm resize-none"
                rows="12"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                placeholder="Incolla qui il tuo codice..."
              />
              <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                {formData.code.length} caratteri
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Annulla
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.code}
            className="btn-primary flex items-center gap-2 hover:scale-105 transition-all duration-200 glow-blue"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {snippet ? 'Aggiorna' : 'Salva'} Snippet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;