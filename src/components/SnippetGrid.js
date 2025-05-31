import React, { useState } from 'react';

const SnippetGrid = ({ snippets, onEdit, onDelete }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (snippet) => {
    navigator.clipboard.writeText(snippet.code);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (snippets.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="text-center py-10">
          <div className="w-14 h-14 mx-auto mb-3 text-gray-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
          </div>
          <p className="text-gray-300 text-sm font-medium mb-1">Nessuno snippet trovato</p>
          <p className="text-gray-500 text-xs">Inizia aggiungendo il tuo primo snippet!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map(snippet => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onCopy={handleCopy}
            onEdit={onEdit}
            onDelete={onDelete}
            isCopied={copiedId === snippet.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SnippetGrid;