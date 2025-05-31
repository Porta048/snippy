import React from 'react';

const SnippetCard = ({ snippet, onCopy, onEdit, onDelete, isCopied }) => {
  const languageColors = {
    javascript: 'bg-yellow-500',
    python: 'bg-blue-500',
    html: 'bg-orange-500',
    css: 'bg-pink-500',
    java: 'bg-red-500',
    cpp: 'bg-purple-500',
    php: 'bg-indigo-500',
    ruby: 'bg-red-600',
    go: 'bg-cyan-500',
    rust: 'bg-orange-600',
    sql: 'bg-green-500',
    bash: 'bg-gray-600',
    default: 'bg-gray-500'
  };

  return (
    <div className="snippet-card bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all">
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-100 truncate flex-1">
            {snippet.name}
          </h3>
          <div className="flex items-center space-x-1.5 ml-2">
            <button
              onClick={() => onCopy(snippet)}
              className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
              title="Copia codice"
            >
              {isCopied ? (
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-gray-400 hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => onEdit(snippet)}
              className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
              title="Modifica"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(snippet.id)}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Elimina"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className={`px-1.5 py-0.5 text-[11px] font-medium rounded ${languageColors[snippet.language] || languageColors.default} text-white`}>
            {snippet.language}
          </span>
          <span className="text-[11px] text-gray-500 flex items-center">
            <svg className="w-2.5 h-2.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(snippet.createdAt).toLocaleDateString('it-IT')}
          </span>
        </div>
        
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {snippet.tags.map((tag, index) => (
              <span key={index} className="text-[11px] text-gray-400 bg-gray-800/50 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="code-preview bg-gray-800/30 rounded p-2 overflow-hidden">
          <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
            <code>{snippet.code.substring(0, 200)}{snippet.code.length > 200 ? '...' : ''}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;