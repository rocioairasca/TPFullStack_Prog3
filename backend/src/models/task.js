const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  name: String,
  description:String,
  resume:String,
  completed: {type: Boolean, default:false },
  user:{ type: String, required: true },
  createdAt: { type: Date, default: Date.now}
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
