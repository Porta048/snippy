const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const SNIPPETS_FILE = path.join(__dirname, 'snippets.json');

// Assicura che il file snippets.json esista
async function ensureSnippetsFile() {
    try {
        await fs.ensureFile(SNIPPETS_FILE);
        const content = await fs.readFile(SNIPPETS_FILE, 'utf8');
        if (content.trim() === '') {
            await fs.writeJson(SNIPPETS_FILE, []);
        } else {
            // Tenta di leggere come JSON per verificare che sia valido
            JSON.parse(content);
        }
    } catch (error) {
        console.error(chalk.red('Errore nella gestione del file snippets.json:'), error);
        process.exit(1);
    }
}

// Carica tutti gli snippet
async function loadSnippets() {
    try {
        await ensureSnippetsFile(); // Assicura che il file esista e sia inizializzato
        return await fs.readJson(SNIPPETS_FILE);
    } catch (error) {
        console.error(chalk.red('Errore nel caricamento degli snippet:'), error);
        return [];
    }
}

// Salva tutti gli snippet
async function saveSnippets(snippets) {
    try {
        await fs.writeJson(SNIPPETS_FILE, snippets, { spaces: 2 });
    } catch (error) {
        console.error(chalk.red('Errore nel salvataggio degli snippet:'), error);
    }
}

// Funzione per aggiungere un nuovo snippet
async function addSnippet() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: chalk.cyan('Nome/descrizione dello snippet:'),
            validate: input => input ? true : 'Il nome non può essere vuoto!'
        },
        {
            type: 'input',
            name: 'language',
            message: chalk.cyan('Linguaggio (es. js, html, css, python):'),
            default: 'js'
        },
        {
            type: 'editor',
            name: 'code',
            message: chalk.cyan('Incolla o scrivi il tuo codice (si aprirà un editor):'),
            validate: input => input ? true : 'Il codice non può essere vuoto!'
        }
    ]);

    const snippets = await loadSnippets();
    snippets.push({
        id: Date.now().toString(), // ID unico basato sul timestamp
        name: answers.name,
        language: answers.language.toLowerCase(),
        code: answers.code,
        createdAt: new Date().toISOString()
    });
    await saveSnippets(snippets);
    console.log(chalk.green('Snippet aggiunto con successo!'));
}

// Funzione per visualizzare tutti gli snippet
async function listSnippets() {
    const snippets = await loadSnippets();
    if (snippets.length === 0) {
        console.log(chalk.yellow('Nessuno snippet salvato. Aggiungine uno!'));
        return;
    }

    snippets.forEach((snippet, index) => {
        console.log(chalk.yellow(`--- SNIPPET #${index + 1} (ID: ${snippet.id}) ---`));
        console.log(chalk.blue(`Nome: ${snippet.name}`));
        console.log(chalk.blue(`Linguaggio: ${snippet.language}`));
        console.log(chalk.blue(`Creato il: ${new Date(snippet.createdAt).toLocaleString()}`));
        console.log(chalk.green('```' + snippet.language));
        console.log(snippet.code);
        console.log(chalk.green('```'));
        console.log('\n');
    });
}

// Funzione per cercare snippet
async function searchSnippets() {
    const snippets = await loadSnippets();
    if (snippets.length === 0) {
        console.log(chalk.yellow('Nessuno snippet da cercare.'));
        return;
    }

    const { searchTerm } = await inquirer.prompt({
        type: 'input',
        name: 'searchTerm',
        message: chalk.cyan('Cerca per nome, linguaggio o contenuto del codice:'),
        validate: input => input ? true : 'Il termine di ricerca non può essere vuoto!'
    });

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const results = snippets.filter(snippet =>
        snippet.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        snippet.language.toLowerCase().includes(lowerCaseSearchTerm) ||
        snippet.code.toLowerCase().includes(lowerCaseSearchTerm)
    );

    if (results.length === 0) {
        console.log(chalk.yellow('Nessun risultato trovato per la ricerca.'));
        return;
    }

    console.log(chalk.green(`--- Risultati della ricerca per "${searchTerm}" ---`));
    results.forEach((snippet, index) => {
        console.log(chalk.yellow(`--- SNIPPET #${index + 1} (ID: ${snippet.id}) ---`));
        console.log(chalk.blue(`Nome: ${snippet.name}`));
        console.log(chalk.blue(`Linguaggio: ${snippet.language}`));
        console.log(chalk.blue(`Creato il: ${new Date(snippet.createdAt).toLocaleString()}`));
        console.log(chalk.green('```' + snippet.language));
        console.log(snippet.code);
        console.log(chalk.green('```'));
        console.log('\n');
    });
}

// Funzione per eliminare uno snippet
async function deleteSnippet() {
    const snippets = await loadSnippets();
    if (snippets.length === 0) {
        console.log(chalk.yellow('Nessuno snippet da eliminare.'));
        return;
    }

    const choices = snippets.map(snippet => ({
        name: `${snippet.name} (${snippet.language}) - ID: ${snippet.id.substring(0, 8)}...`,
        value: snippet.id
    }));

    const { snippetId } = await inquirer.prompt({
        type: 'list',
        name: 'snippetId',
        message: chalk.red('Seleziona lo snippet da eliminare:'),
        choices: choices
    });

    const initialLength = snippets.length;
    const updatedSnippets = snippets.filter(snippet => snippet.id !== snippetId);

    if (updatedSnippets.length < initialLength) {
        await saveSnippets(updatedSnippets);
        console.log(chalk.green('Snippet eliminato con successo!'));
    } else {
        console.log(chalk.yellow('Snippet non trovato o non eliminato.'));
    }
}

// Funzione per modificare uno snippet
async function editSnippet() {
    const snippets = await loadSnippets();
    if (snippets.length === 0) {
        console.log(chalk.yellow('Nessuno snippet da modificare.'));
        return;
    }

    const choices = snippets.map(snippet => ({
        name: `${snippet.name} (${snippet.language}) - ID: ${snippet.id.substring(0, 8)}...`,
        value: snippet.id
    }));

    const { snippetId } = await inquirer.prompt({
        type: 'list',
        name: 'snippetId',
        message: chalk.blue('Seleziona lo snippet da modificare:'),
        choices: choices
    });

    const snippetToEdit = snippets.find(snippet => snippet.id === snippetId);

    if (!snippetToEdit) {
        console.log(chalk.yellow('Snippet non trovato.'));
        return;
    }

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: chalk.cyan('Nuovo nome/descrizione (lascia vuoto per non modificare):'),
            default: snippetToEdit.name
        },
        {
            type: 'input',
            name: 'language',
            message: chalk.cyan('Nuovo linguaggio (lascia vuoto per non modificare):'),
            default: snippetToEdit.language
        },
        {
            type: 'editor',
            name: 'code',
            message: chalk.cyan('Modifica il codice (si aprirà un editor, premi Ctrl+D per salvare/chiudere):'),
            default: snippetToEdit.code
        }
    ]);

    snippetToEdit.name = answers.name || snippetToEdit.name;
    snippetToEdit.language = (answers.language || snippetToEdit.language).toLowerCase();
    snippetToEdit.code = answers.code || snippetToEdit.code;

    await saveSnippets(snippets);
    console.log(chalk.green('Snippet modificato con successo!'));
}


// Menu principale
async function mainMenu() {
    await ensureSnippetsFile(); // Assicura che il file esista all'avvio

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: chalk.magenta('Cosa vuoi fare con SNIPPY?'),
            choices: [
                { name: 'Aggiungi un nuovo snippet', value: 'add' },
                { name: 'Visualizza tutti gli snippet', value: 'list' },
                { name: 'Cerca snippet', value: 'search' },
                { name: 'Modifica uno snippet', value: 'edit' },
                { name: 'Elimina uno snippet', value: 'delete' },
                { name: 'Esci', value: 'exit' }
            ]
        });

        switch (action) {
            case 'add':
                await addSnippet();
                break;
            case 'list':
                await listSnippets();
                break;
            case 'search':
                await searchSnippets();
                break;
            case 'edit':
                await editSnippet();
                break;
            case 'delete':
                await deleteSnippet();
                break;
            case 'exit':
                console.log(chalk.yellow('Grazie per aver usato SNIPPY! Arrivederci.'));
                process.exit(0);
        }
        console.log('\n'); // Spazio per una migliore leggibilità tra le operazioni
    }
}

// Avvia il menu principale
mainMenu().catch(error => {
    console.error(chalk.red('Si è verificato un errore inaspettato:'), error);
    process.exit(1);
});