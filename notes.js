const fs = require('fs');

var displayNote = (note) => {
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } 
    catch (e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => title === note.title);
 
    if (duplicateNotes.length === 0){   
        notes.push(note);
        saveNotes(notes);
        return note;
    }
 
}

var getAll = () => {
    return fetchNotes();
}

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((cur_note) => title === cur_note.title);
    return filteredNotes[0];
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var notes_to_keep = notes.filter((cur_note) => title !== cur_note.title);
    saveNotes(notes_to_keep);
    return notes.length === notes_to_keep.length;
}

module.exports = {
    displayNote, addNote, getAll, getNote, removeNote
}