import React from 'react';

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedLanguage, 
  setSelectedLanguage, 
  selectedTag, 
  setSelectedTag, 
  languages, 
  tags 
}) => {
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
    setSelectedTag('all');
  };

  const removeFilter = (type) => {
    switch(type) {
      case 'search':
        setSearchTerm('');
        break;
      case 'language':
        setSelectedLanguage('all');
        break;
      case 'tag':
        setSelectedTag('all');
        break;
      default:
        break;
    }
  };

  const hasActiveFilters = searchTerm || selectedLanguage !== 'all' || selectedTag !== 'all';

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
                Cerca snippet
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="form-input block w-full pl-8 pr-8 py-2 text-sm bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="Cerca per nome, codice o tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <label htmlFor="language-filter" className="block text-sm font-medium text-gray-400 mb-1">
                Linguaggio
              </label>
              <div className="mt-1">
                <select
                  id="language-filter"
                  className="form-select block w-full pl-3 pr-10 py-2.5 text-base bg-gray-800 border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition duration-150 ease-in-out"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="all">Tutti i linguaggi</option>
                  {languages.slice(1).map(lang => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-400 mb-1">
                Tag
              </label>
              <div className="mt-1">
                <select
                  id="tag-filter"
                  className="form-select block w-full pl-3 pr-10 py-2.5 text-base bg-gray-800 border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition duration-150 ease-in-out"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="all">Tutti i tag</option>
                  {tags.slice(1).map(tag => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="w-full flex flex-wrap items-center gap-2 mt-2">
              {hasActiveFilters && (
                <>
                  {searchTerm && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                      Cerca: {searchTerm}
                      <button 
                        type="button" 
                        onClick={() => removeFilter('search')}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-400/30 focus:outline-none"
                      >
                        <span className="sr-only">Rimuovi filtro</span>
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {selectedLanguage !== 'all' && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                      Linguaggio: {selectedLanguage}
                      <button 
                        type="button" 
                        onClick={() => removeFilter('language')}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-400/30 focus:outline-none"
                      >
                        <span className="sr-only">Rimuovi filtro</span>
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {selectedTag !== 'all' && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                      Tag: {selectedTag}
                      <button 
                        type="button" 
                        onClick={() => removeFilter('tag')}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-400/30 focus:outline-none"
                      >
                        <span className="sr-only">Rimuovi filtro</span>
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="ml-2 inline-flex items-center text-xs text-gray-400 hover:text-blue-400 transition-colors duration-150"
                  >
                    <svg className="-ml-0.5 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Azzera tutti i filtri
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;