// App.js - File principale
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import SearchFilters from './components/SearchFilters';
import SnippetGrid from './components/SnippetGrid';
import SnippetModal from './components/SnippetModal';
import { loadSnippets, saveSnippets } from './utils/storage';
import './styles.css';

const App = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // Carica snippets al mount
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSnippets(loadSnippets());
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Salva snippets quando cambiano
  useEffect(() => {
    saveSnippets(snippets);
  }, [snippets]);

  // Ottieni linguaggi e tag unici
  const languages = ['all', ...new Set(snippets.map(s => s.language))];
  const allTags = ['all', ...new Set(snippets.flatMap(s => s.tags || []))];

  // Filtra snippets
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = searchTerm === '' || 
      snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (snippet.tags && snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    const matchesTag = selectedTag === 'all' || (snippet.tags && snippet.tags.includes(selectedTag));
    
    return matchesSearch && matchesLanguage && matchesTag;
  });

  const handleSaveSnippet = (formData) => {
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    if (editingSnippet) {
      setSnippets(snippets.map(s => 
        s.id === editingSnippet.id 
          ? { ...s, ...formData, tags: tagsArray }
          : s
      ));
    } else {
      const newSnippet = {
        id: Date.now().toString(),
        ...formData,
        tags: tagsArray,
        createdAt: new Date().toISOString()
      };
      setSnippets([...snippets, newSnippet]);
    }
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo snippet?')) {
      setSnippets(snippets.filter(s => s.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingSnippet(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header onAddClick={() => setShowAddModal(true)} />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          languages={languages}
          tags={allTags}
        />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-200">
              I tuoi Snippet
              {filteredSnippets.length > 0 && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                  {filteredSnippets.length} {filteredSnippets.length === 1 ? 'snippet' : 'snippets'}
                </span>
              )}
            </h2>
            
            {filteredSnippets.length > 0 && (
              <div className="text-sm text-gray-400">
                {filteredSnippets.length} {filteredSnippets.length === 1 ? 'risultato' : 'risultati'} 
                {searchTerm || selectedLanguage !== 'all' || selectedTag !== 'all' ? ' trovati' : ' totali'}
              </div>
            )}
          </div>
          
          <SnippetGrid
            snippets={filteredSnippets}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Caricamento in corso...</p>
            </div>
          ) : filteredSnippets.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {searchTerm || selectedLanguage !== 'all' || selectedTag !== 'all' 
                  ? 'Nessun risultato trovato'
                  : 'Nessuno snippet ancora'}
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                {searchTerm || selectedLanguage !== 'all' || selectedTag !== 'all'
                  ? 'Prova a modificare i filtri di ricerca o aggiungi un nuovo snippet.'
                  : 'Inizia aggiungendo il tuo primo snippet di codice.'}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                {searchTerm || selectedLanguage !== 'all' || selectedTag !== 'all' ? 'Crea nuovo snippet' : 'Aggiungi il primo snippet'}
              </button>
            </div>
          ) : null}
        </div>
      </main>
      
      {showAddModal && (
        <SnippetModal
          snippet={editingSnippet}
          onSave={handleSaveSnippet}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;