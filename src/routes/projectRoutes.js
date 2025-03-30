
import express from 'express';
import project from '../controllers/projectController.js';

const projectRoutes = express.Router();

projectRoutes.post("/", project.createProject)
projectRoutes.get("/", project.getProjects)
projectRoutes.get("/:id", project.getProject)
projectRoutes.delete("/:id", project.deleteProject)
projectRoutes.put("/:id", project.updateProject)

export default projectRoutes;