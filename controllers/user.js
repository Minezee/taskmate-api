const User = require('../models/user');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await User.findById(req.user.id).select('notes');
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.addNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newNote = { title, description };
        const user = await User.findById(req.user.id);
        user.notes.unshift(newNote);
        await user.save();
        res.json(user.notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.viewNote = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const noteIndex = user.notes.findIndex(note => note.id === req.params.id);

        if (noteIndex === -1) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        const note = user.notes[noteIndex];
        res.json({ note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.updateNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = await User.findById(req.user.id);
        const note = user.notes.find(note => note.id === req.params.id);

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        note.title = title;
        note.description = description;
        await user.save();
        res.json(user.notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const noteIndex = user.notes.findIndex(note => note.id === req.params.id);

        if (noteIndex === -1) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        user.notes.splice(noteIndex, 1);
        await user.save();
        res.json(user.notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}