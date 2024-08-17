import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  Task_Name: {
    type: String,
    required: true,
  },
  Task_Description:{
    type: String,
    required: true,
  },
  Task_Assigned_To: {
    type: String,
    required: true,
  },
  Task_Assigned_By:{
    type: String,
    required: true,
  },
  Task_Status: {
    type: String,
    required: true,
  },
  Task_Deadline:{
    type: Date,
    required: true
  }
}
,{
  timestamps: true
}
);

const Task = mongoose.model("Tasks", TaskSchema);
export default Task;
