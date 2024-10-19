const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  resume: String,
  // Guardamos el sub (ID) del usuario de Auth0 que creó o modificó la tarea
  user: {
    type: String, // ID del usuario de Auth0
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
