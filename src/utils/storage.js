const STORAGE_KEY = 'snipppi_snippets';

const loadSnippets = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Errore nel caricamento degli snippet:', error);
    return [];
  }
};

const saveSnippets = (snippets) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  } catch (error) {
    console.error('Errore nel salvataggio degli snippet:', error);
  }
};

export { loadSnippets, saveSnippets };