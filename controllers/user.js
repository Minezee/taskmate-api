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
        const { title, description, color } = req.body;
        const newNote = { title, description, color };
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
        const { title, description, color } = req.body;
        const user = await User.findById(req.user.id);
        const note = user.notes.find(note => note.id === req.params.id);

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        note.title = title;
        note.description = description;
        note.color = color;
        await user.save();
        res.json(user.notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.favoriteNote = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const noteIndex = user.notes.findIndex(note => note.id === req.params.id);

        if (noteIndex === -1) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        user.notes[noteIndex].favorite = !user.notes[noteIndex].favorite;
        await user.save();
        res.json(user.notes[noteIndex]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.removeFromFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const noteIndex = user.notes.findIndex(note => note.id === req.params.id);
        if (noteIndex === -1) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        if (!user.notes[noteIndex].favorite) {
            return res.status(404).json({ msg: 'Note is not a favorite' });
        }

        user.notes[noteIndex].favorite = false;
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

exports.getTodo = async (req, res) => {
    try {
        const todo = await User.findById(req.user.id).select('todo');
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.addTodo = async (req, res) => {
    try {
        const { title, targets } = req.body;
        const newTodo = { title, targets };
        const user = await User.findById(req.user.id);
        user.todo.unshift(newTodo);
        await user.save();
        res.json(user.todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.viewTodo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const todoIndex = user.todo.findIndex(todo => todo.id === req.params.id);

        if (todoIndex === -1) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        const todo = user.todo[todoIndex];
        res.json({ todo });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const { title, targets } = req.body;
        const user = await User.findById(req.user.id);
        const todo = user.todo.find(todo => todo.id === req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        todo.title = title;
        todo.targets = targets;

        // Check if all targets are checked
        const allTargetsChecked = todo.targets.every(target => target.checked === true);
        if (allTargetsChecked) {
            todo.completed = true;
        }
        
        await user.save();
        res.json(user.todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const todoIndex = user.todo.findIndex(todo => todo.id === req.params.id);

        if (todoIndex === -1) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        user.todo.splice(todoIndex, 1);
        await user.save();
        res.json(user.todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}