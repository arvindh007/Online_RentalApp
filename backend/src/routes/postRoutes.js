import express from "express";
import { createproject, CreateUser, deleteproject, getprojects, getsingleprofile, getsingleproject, LoginUser, updateprofile, updateproject }from "../controllers/postControllers.js";
import { CreateTask, DeleteTask, GetallTask, UpdateTask } from "../controllers/TaskController.js";
import { createproperty, deleteproperty, getproperties, getSingleproperty, updateproperty } from "../controllers/propertyControllers.js";
const router = express.Router();
// PROJECT :
router.get("/projects",getprojects);
router.post("/creteprojects",createproject);
router.get("/projects/:id",getsingleproject);
router.put("/updateprojects/:id",updateproject);
router.delete("/deleteprojects/:id",deleteproject);
// USER :
router.post("/CreateUser",CreateUser);
router.post("/loginUser",LoginUser);
router.put("/updateprofile/:id",updateprofile);
router.get("/getsingleprofile/:id",getsingleprofile);
// TASK :
router.post("/createtask",CreateTask);
router.get("/gettasks",GetallTask);
router.put("/updatetask/:id",UpdateTask);
router.delete("/deletetask/:id",DeleteTask);
// PROPERTIES :
router.get('/getproperties',getproperties);
router.get("/getSingleproperty/:id",getSingleproperty);
router.put("/updateproperty/:id",updateproperty);
router.post("/createproperty",createproperty);
router.delete("/deleteproperty/:id",deleteproperty);



export default router;