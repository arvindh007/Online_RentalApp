import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema({
  project_Name: {
    type: String,
    required: true,
  },
  project_Manager: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  project_status: {
    type: String,
    required: true,
  },
  start_Date: {
    type: Date,
  },
  end_Date: {
    type: Date,
    required: true,
  },
 
}, {
  timestamps: true,
});

const Projects = mongoose.model("projects", ProjectSchema);
export default Projects;
