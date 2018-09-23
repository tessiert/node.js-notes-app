const fs = require('fs');
const notes = require('./notes.js');

const yargs = require('yargs');

titleOptions = {
        describe: 'Title of new note',
        demand: true,
        alias: 't'
}

bodyOptions = {
        describe: 'Body of new note',
        demand: true,
        alias: 'b'
}

// Provide descriptions, required parameters, and aliases for
// various command line inputs parsed with yargs
const argv = yargs
    .command('add', 'Add a new note.', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'Display all notes.')
    .command('read', 'Find and display note by title.', {
        title: titleOptions
    })
    .command('remove', 'Delete note by title.', {
        title: titleOptions
    })
    .help()
    .argv;

if (argv._[0] === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note === undefined) {
        console.log('Attempt to add duplicate note failed');
    }
    else {
        console.log('Note added');
        notes.displayNote(note);
    }
}
else if (argv._[0] === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes:`);
    allNotes.forEach((note) => notes.displayNote(note));
}
else if (argv._[0] === 'read'){
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.displayNote(note);
    }
    else {
        console.log('Note not found');
    }
}
else if (argv._[0] === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    message = noteRemoved ? 'Note to remove not found' : 'Note removed';
    console.log(message);
}
else {
    console.log('Unrecognized Command');
}