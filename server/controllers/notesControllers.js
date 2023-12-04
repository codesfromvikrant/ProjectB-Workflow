const Notes = require('../models/notes');
const { query } = require('express');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const { userID } = req.body;
  const result = await Notes.findOne({ userID });
  if (!result) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ notes: result.notes });
});

exports.createNotesApp = catchAsync(async (req, res, next) => {
  const { userID } = req.body;
  const notes = new Notes({
    userID,
    labels: [],
    notes: []
  });

  const newNotes = await notes.save();
  res.status(200).json({ message: "Notes App Built Successfully!", newNotes });
});

exports.addNote = catchAsync(async (req, res, next) => {
  const { userID } = req.body;
  const { note } = req.body;
  const notesDocument = await Notes.findOne({ userID });

  if (!notesDocument) {
    return next(new AppError('User not found', 404));
  }

  note.labels.forEach(label => {
    if (!notesDocument.labels.includes(label)) {
      notesDocument.labels.push(label);
    }
  });

  notesDocument.notes.push(note);
  await notesDocument.save();
  res.status(200).json({ message: 'Note added', notesDocument });
});
